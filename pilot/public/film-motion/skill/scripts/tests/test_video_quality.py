"""Behavioral invariants for the uncalibrated video evidence diagnostic."""

import copy
import importlib.util
import json
import math
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "video_quality.py"
spec = importlib.util.spec_from_file_location("video_quality", SCRIPT)
vq = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vq)


def sample():
    return json.loads((ROOT / "assets" / "quality-model" / "example.json").read_text())


class ModelTests(unittest.TestCase):
    def test_known_geometric_result(self):
        dims = [{"id": "a", "weight": 0.5, "value": 0.25}, {"id": "b", "weight": 0.5, "value": 1}]
        self.assertAlmostEqual(vq.geometric(dims), 50)

    def test_zero_is_not_hidden_by_epsilon(self):
        dims = [{"id": "a", "weight": 0.5, "value": 0}, {"id": "b", "weight": 0.5, "value": 1}]
        self.assertEqual(vq.geometric(dims), 0)

    def test_zero_weight_zeros_and_missing_are_ignored(self):
        for value in (0, None):
            dims = [{"id": "a", "weight": 0, "value": value}, {"id": "b", "weight": 1, "value": 0.7}]
            self.assertAlmostEqual(vq.geometric(dims), 70)

    def test_missing_propagates_and_does_not_erase_gate_failure(self):
        data = sample()
        data["dimensions"][0]["value"] = None
        data["gates"][0]["status"] = "fail"
        report = vq.analyze(data)
        self.assertIsNone(report["craft"]["score"])
        self.assertIsNone(report["craft"]["sensitivity_bounds"])
        self.assertEqual(report["decision"], "hold")

    def test_bounds_are_monotonic(self):
        report = vq.analyze(sample())["craft"]
        self.assertLess(report["sensitivity_bounds"][0], report["score"])
        self.assertGreater(report["sensitivity_bounds"][1], report["score"])

    def test_passed_gates_do_not_automatically_accept_art(self):
        data = sample()
        for gate in data["gates"]:
            gate["status"] = "pass"
        data["claims"][1]["truth"] = "verified"
        data["shots"][2]["proof_review"] = "pass"
        data["shots"][1]["read_requirement"]["seconds"] = 2
        data["shots"][2]["read_requirement"] = {"seconds": 2, "basis": "estimated", "evidence": []}
        data["director_decision"] = "unknown"
        report = vq.analyze(data)
        self.assertEqual(report["gate_status"], "gates_passed")
        self.assertEqual(report["decision"], "director_review_pending")
        data["director_decision"] = "ready"
        self.assertEqual(vq.analyze(data)["decision"], "ready_for_declared_next_stage")
        data["gates"][0]["status"] = "unknown"
        self.assertEqual(vq.analyze(data)["decision"], "incomplete")

    def test_contradicted_claim_cannot_be_cancelled_by_gate_or_director(self):
        data = sample()
        for gate in data["gates"]:
            gate["status"] = "pass"
        data["director_decision"] = "ready"
        data["claims"][0]["truth"] = "contradicted"
        result = vq.analyze(data)
        self.assertEqual(result["gate_status"], "gates_passed")
        self.assertEqual(result["decision"], "hold")

    def test_read_margin_uses_sustained_exposure_and_half_open_frames(self):
        shot = sample()["shots"][1]
        result = vq.readability(shot, 30)
        self.assertEqual(result["longest_stable_seconds"], 2.5)
        self.assertEqual(result["margin_seconds"], -0.5)
        shot["stable_intervals"] = [[270, 300], [300, 330], [340, 370]]
        result = vq.readability(shot, 30)
        self.assertEqual(result["longest_stable_seconds"], 2)
        self.assertEqual(result["total_stable_seconds"], 3)

    def test_unknown_read_requirement_is_not_an_invented_estimate(self):
        self.assertIsNone(vq.analyze(sample())["shots"][2]["readability"]["margin_seconds"])

    def test_coverage_distinguishes_verified_from_possible(self):
        data = sample()
        report = vq.analyze(data)["claim_coverage"]
        self.assertEqual(report["verified_fraction"], 0)
        self.assertEqual(report["possible_fraction_after_pending_reviews"], 1)
        data["shots"][1]["read_requirement"]["seconds"] = 2
        self.assertAlmostEqual(vq.analyze(data)["claim_coverage"]["verified_fraction"], 2 / 3)

    def test_read_conflicts_override_ready_without_inventing_score_threshold(self):
        data = sample()
        for gate in data["gates"]:
            gate["status"] = "pass"
        data["claims"][1]["truth"] = "verified"
        data["shots"][2]["proof_review"] = "pass"
        data["shots"][2]["read_requirement"] = {"seconds": 2, "basis": "estimated", "evidence": []}
        data["director_decision"] = "ready"
        self.assertEqual(vq.analyze(data)["decision"], "revise_or_test")
        data["shots"][1]["read_requirement"]["basis"] = "measured"
        result = vq.analyze(data)
        self.assertEqual(result["decision"], "hold")
        self.assertEqual(result["derived_blockers"]["measured_read_failures"], ["s02"])

    def test_absent_requirement_zero_dimension_and_gap_prevent_ready(self):
        baseline = sample()
        for gate in baseline["gates"]:
            gate["status"] = "pass"
        baseline["claims"][1]["truth"] = "verified"
        baseline["shots"][2]["proof_review"] = "pass"
        baseline["shots"][1]["read_requirement"]["seconds"] = 2
        baseline["shots"][2]["read_requirement"] = {"seconds": 2, "basis": "estimated", "evidence": []}
        baseline["director_decision"] = "ready"
        self.assertEqual(vq.analyze(baseline)["decision"], "ready_for_declared_next_stage")
        missing = copy.deepcopy(baseline)
        missing["shots"][1]["read_requirement"] = None
        self.assertEqual(vq.analyze(missing)["decision"], "incomplete")
        zero = copy.deepcopy(baseline)
        zero["shots"][1]["dimensions"][0]["value"] = 0
        self.assertEqual(vq.analyze(zero)["decision"], "revise")
        gap = copy.deepcopy(baseline)
        gap["shots"][0]["range"] = [0, 140]
        result = vq.analyze(gap)
        self.assertEqual(result["timeline_annotation"]["unannotated_ranges"], [[140, 150]])
        self.assertEqual(result["decision"], "incomplete")

    def test_finite_claim_weights_with_overflowing_sum_are_rejected_cleanly(self):
        data = sample()
        for claim in data["claims"]:
            claim["weight"] = 1e308
        with self.assertRaises(vq.ValidationError):
            vq.analyze(data)
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "overflow.json"
            source.write_text(json.dumps(data))
            run = subprocess.run([sys.executable, str(SCRIPT), str(source)], capture_output=True, text=True)
            self.assertEqual(run.returncode, 2)
            self.assertNotIn("Traceback", run.stderr)

    def test_missing_failed_or_unexposed_proof_cannot_be_ready(self):
        mutations = [
            lambda d: d["claims"][0].update(proof_shots=[]),
            lambda d: d["shots"][1].update(proof_review="fail"),
            lambda d: d["shots"][1].update(stable_intervals=[]),
        ]
        for mutation in mutations:
            data = sample()
            mutation(data)
            self.assertEqual(vq.analyze(data)["decision"], "hold")

    def test_weakest_shot_requires_all_consequential_shots(self):
        data = sample()
        report = vq.analyze(data)
        self.assertEqual(report["weakest_consequential_shot"]["shot_ids"], ["s02"])
        del data["shots"][2]["dimensions"]
        report = vq.analyze(data)
        self.assertIsNone(report["weakest_consequential_shot"]["score"])
        self.assertEqual(report["decision"], "incomplete")

    def test_padding_and_duplicate_proof_do_not_raise_score_or_coverage(self):
        data = sample()
        before = vq.analyze(data)
        data["timeline"]["total_frames"] += 30
        duplicate = copy.deepcopy(data["shots"][1])
        duplicate.update(id="s04", range=[600, 630], stable_intervals=[], consequential=False)
        data["shots"].append(duplicate)
        data["claims"][0]["proof_shots"].append("s04")
        after = vq.analyze(data)
        self.assertEqual(before["craft"]["score"], after["craft"]["score"])
        self.assertEqual(before["claim_coverage"]["verified_fraction"], after["claim_coverage"]["verified_fraction"])

    def test_rejects_invalid_numbers_ranges_weights_and_references(self):
        mutations = [
            lambda d: d["dimensions"][0].update(value=True),
            lambda d: d["dimensions"][0].update(value=float("nan")),
            lambda d: d["dimensions"][0].update(value=10 ** 10000),
            lambda d: d["dimensions"][0].update(weight=float("inf")),
            lambda d: d["dimensions"][0].update(weight=0),
            lambda d: d["dimensions"][0].update(interval=[0.9, 0.1]),
            lambda d: d["dimensions"][0].update(interval=[0, 0.2]),
            lambda d: d["shots"][0].update(range=[150, 0]),
            lambda d: d["shots"][0].update(range=[False, 150]),
            lambda d: d["shots"][0].update(stable_intervals=[[0, 151]]),
            lambda d: d["shots"][0].update(stable_intervals=[[0, 60], [59, 70]]),
            lambda d: d["shots"][0].update(range=[0, 151]),
            lambda d: d["claims"][0].update(proof_shots=["missing"]),
            lambda d: d["shots"][0].update(claim_ids=["missing"]),
            lambda d: d["timeline"]["fps"].update(den=0),
            lambda d: d["gates"][0].update(required=1),
        ]
        for mutation in mutations:
            with self.subTest(mutation=mutation):
                data = sample()
                mutation(data)
                with self.assertRaises(vq.ValidationError):
                    vq.analyze(data)

    def test_real_ratings_require_evidence(self):
        data = sample()
        data["synthetic"] = False
        data["dimensions"][0]["evidence"] = []
        with self.assertRaises(vq.ValidationError):
            vq.analyze(data)

    def test_cli_end_to_end_and_safe_errors(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "input.json"
            source.write_text(json.dumps(sample()))
            run = subprocess.run([sys.executable, str(SCRIPT), str(source)], capture_output=True, text=True)
            self.assertEqual(run.returncode, 0, run.stderr)
            result = json.loads(run.stdout)
            self.assertEqual(result["model_status"], "uncalibrated_heuristic")
            self.assertIsNone(result["audience_prediction"])
            before = source.read_text()
            run = subprocess.run([sys.executable, str(SCRIPT), str(source), "--output", str(source)], capture_output=True, text=True)
            self.assertEqual(run.returncode, 2)
            self.assertEqual(source.read_text(), before)


if __name__ == "__main__":
    unittest.main()
