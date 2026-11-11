#!/usr/bin/env python3
"""Audit declared video craft evidence. No audience-performance prediction."""

import argparse
import json
import math
import sys
from pathlib import Path


class ValidationError(ValueError):
    pass


def fail(path, message):
    raise ValidationError(f"{path}: {message}")


def obj(value, path, required, optional=()):
    if not isinstance(value, dict):
        fail(path, "must be an object")
    missing = set(required) - value.keys()
    extra = value.keys() - set(required) - set(optional)
    if missing:
        fail(path, f"missing fields: {', '.join(sorted(missing))}")
    if extra:
        fail(path, f"unknown fields: {', '.join(sorted(extra))}")


def text(value, path):
    if not isinstance(value, str) or not value.strip():
        fail(path, "must be a nonempty string")
    return value


def number(value, path, low=None, high=None, integer=False):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        fail(path, "must be a finite number, not a boolean")
    try:
        finite = math.isfinite(value)
    except OverflowError:
        finite = False
    if not finite:
        fail(path, "must be finite")
    if integer and not isinstance(value, int):
        fail(path, "must be an integer")
    if low is not None and value < low or high is not None and value > high:
        fail(path, f"must be between {low} and {high}")
    return value


def choice(value, path, choices):
    if value not in choices:
        fail(path, f"must be one of {', '.join(choices)}")


def sequence(value, path):
    if not isinstance(value, list):
        fail(path, "must be an array")
    return value


def evidence(value, path, required=False):
    sequence(value, path)
    for i, item in enumerate(value):
        text(item, f"{path}[{i}]")
    if required and not value:
        fail(path, "reviewed real evidence requires at least one reference")


def unique_ids(items, path):
    found = set()
    for i, item in enumerate(items):
        if not isinstance(item, dict):
            fail(f"{path}[{i}]", "must be an object")
        key = text(item.get("id"), f"{path}[{i}].id")
        if key in found:
            fail(path, f"duplicate ID {key}")
        found.add(key)
    return found


def validate_dimensions(items, path, synthetic):
    sequence(items, path)
    if not items:
        fail(path, "must contain at least one dimension")
    unique_ids(items, path)
    for i, dim in enumerate(items):
        p = f"{path}[{i}]"
        obj(dim, p, ("id", "weight", "value", "evidence"), ("interval",))
        number(dim["weight"], p + ".weight", 0, 1)
        if dim["value"] is not None:
            number(dim["value"], p + ".value", 0, 1)
        evidence(dim["evidence"], p + ".evidence", not synthetic and dim["value"] is not None)
        bounds = dim.get("interval")
        if bounds is not None:
            sequence(bounds, p + ".interval")
            if len(bounds) != 2:
                fail(p + ".interval", "must contain [low, high]")
            lo, hi = bounds
            number(lo, p + ".interval[0]", 0, 1)
            number(hi, p + ".interval[1]", 0, 1)
            if lo > hi:
                fail(p + ".interval", "reversed bounds")
            if dim["value"] is not None and not lo <= dim["value"] <= hi:
                fail(p + ".interval", "must contain the central value")
    if not math.isclose(sum(d["weight"] for d in items), 1, rel_tol=0, abs_tol=1e-9):
        fail(path, "weights must sum to 1; zero-weight dimensions are ignored explicitly")


def frame_range(value, path, total):
    sequence(value, path)
    if len(value) != 2:
        fail(path, "must contain [start, end)")
    start, end = value
    number(start, path + "[0]", 0, total, integer=True)
    number(end, path + "[1]", 0, total, integer=True)
    if end <= start:
        fail(path, "end must be greater than start")


def validate(data):
    obj(data, "$", ("schema_version", "synthetic", "context", "timeline", "director_decision", "gates", "dimensions", "claims", "shots"))
    if data["schema_version"] != "0.1":
        fail("schema_version", "supported version is 0.1")
    if type(data["synthetic"]) is not bool:
        fail("synthetic", "must be a boolean")
    synthetic = data["synthetic"]
    context = data["context"]
    obj(context, "context", ("audience", "objective", "placement", "sound", "next_stage"))
    for key, value in context.items():
        text(value, "context." + key)
    choice(context["sound"], "context.sound", ("on", "off", "optional"))
    choice(data["director_decision"], "director_decision", ("hold", "revise", "ready", "unknown"))
    timeline = data["timeline"]
    obj(timeline, "timeline", ("fps", "total_frames"))
    obj(timeline["fps"], "timeline.fps", ("num", "den"))
    for key in ("num", "den"):
        number(timeline["fps"][key], "timeline.fps." + key, 1, integer=True)
    total = number(timeline["total_frames"], "timeline.total_frames", 1, integer=True)
    fps = timeline["fps"]["num"] / timeline["fps"]["den"]
    if not math.isfinite(total / fps):
        fail("timeline", "duration must be finite at the declared frame rate")
    validate_dimensions(data["dimensions"], "dimensions", synthetic)
    gates = sequence(data["gates"], "gates")
    if not gates:
        fail("gates", "declare at least one required review gate")
    unique_ids(gates, "gates")
    for i, gate in enumerate(gates):
        p = f"gates[{i}]"
        obj(gate, p, ("id", "required", "status", "evidence"))
        if type(gate["required"]) is not bool:
            fail(p + ".required", "must be a boolean")
        choice(gate["status"], p + ".status", ("pass", "fail", "unknown"))
        evidence(gate["evidence"], p + ".evidence", not synthetic and gate["status"] != "unknown")
    if not any(g["required"] for g in gates):
        fail("gates", "at least one gate must be required")
    claims = sequence(data["claims"], "claims")
    shots = sequence(data["shots"], "shots")
    claim_ids = unique_ids(claims, "claims")
    shot_ids = unique_ids(shots, "shots")
    for i, claim in enumerate(claims):
        p = f"claims[{i}]"
        obj(claim, p, ("id", "weight", "truth", "proof_shots", "evidence"))
        number(claim["weight"], p + ".weight", 0)
        if claim["weight"] == 0:
            fail(p + ".weight", "claim importance must be positive")
        choice(claim["truth"], p + ".truth", ("verified", "unknown", "contradicted"))
        evidence(claim["evidence"], p + ".evidence", not synthetic and claim["truth"] != "unknown")
        refs = sequence(claim["proof_shots"], p + ".proof_shots")
        for ref in refs:
            text(ref, p + ".proof_shots")
            if ref not in shot_ids:
                fail(p, f"unknown proof shot {ref}")
        if len(set(refs)) != len(refs):
            fail(p, "duplicate proof shot references")
    if not math.isfinite(sum(c["weight"] for c in claims)):
        fail("claims", "total importance must be finite; rescale weights")
    for i, shot in enumerate(shots):
        p = f"shots[{i}]"
        obj(shot, p, ("id", "range", "consequential", "claim_ids", "proof_review", "evidence", "stable_intervals", "read_requirement"), ("dimensions",))
        frame_range(shot["range"], p + ".range", total)
        if type(shot["consequential"]) is not bool:
            fail(p + ".consequential", "must be a boolean")
        refs = sequence(shot["claim_ids"], p + ".claim_ids")
        for ref in refs:
            text(ref, p + ".claim_ids")
            if ref not in claim_ids:
                fail(p, f"unknown claim {ref}")
        if len(set(refs)) != len(refs):
            fail(p, "duplicate claim references")
        choice(shot["proof_review"], p + ".proof_review", ("pass", "fail", "unknown", "not_applicable"))
        evidence(shot["evidence"], p + ".evidence", not synthetic and shot["proof_review"] in ("pass", "fail"))
        if "dimensions" in shot:
            validate_dimensions(shot["dimensions"], p + ".dimensions", synthetic)
            if [(d["id"], d["weight"]) for d in shot["dimensions"]] != [(d["id"], d["weight"]) for d in data["dimensions"]]:
                fail(p + ".dimensions", "use the same ordered IDs and weights as film dimensions")
        intervals = sequence(shot["stable_intervals"], p + ".stable_intervals")
        for j, interval in enumerate(intervals):
            frame_range(interval, f"{p}.stable_intervals[{j}]", total)
            if interval[0] < shot["range"][0] or interval[1] > shot["range"][1]:
                fail(p + ".stable_intervals", "must lie within the shot")
        ordered = sorted(intervals)
        if any(a[1] > b[0] for a, b in zip(ordered, ordered[1:])):
            fail(p + ".stable_intervals", "intervals must not overlap")
        req = shot["read_requirement"]
        if req is not None:
            obj(req, p + ".read_requirement", ("seconds", "basis", "evidence"))
            number(req["seconds"], p + ".read_requirement.seconds", 0)
            choice(req["basis"], p + ".read_requirement.basis", ("measured", "estimated"))
            evidence(req["evidence"], p + ".read_requirement.evidence", not synthetic)
    ordered_shots = sorted(shots, key=lambda s: s["range"])
    if any(a["range"][1] > b["range"][0] for a, b in zip(ordered_shots, ordered_shots[1:])):
        fail("shots", "shot ranges must not overlap; annotate transitions within editorial shots")
    by_shot = {s["id"]: s for s in shots}
    for claim in claims:
        for shot_id in claim["proof_shots"]:
            if claim["id"] not in by_shot[shot_id]["claim_ids"]:
                fail("claims", f"proof shot {shot_id} does not declare claim {claim['id']}")
            if by_shot[shot_id]["proof_review"] == "not_applicable":
                fail("claims", f"proof shot {shot_id} cannot have not_applicable proof review")
    return data


def geometric(dimensions, key="value"):
    active = [d for d in dimensions if d["weight"] > 0]
    values = [d[key] for d in active]
    if any(v is None for v in values):
        return None
    if any(v == 0 for v in values):
        return 0.0
    return 100 * math.exp(sum(d["weight"] * math.log(d[key]) for d in active))


def craft(dimensions):
    score = geometric(dimensions)
    bounds = None
    if score is not None:
        bounds = []
        for endpoint in (0, 1):
            selected = [{**d, "value": d["interval"][endpoint] if d.get("interval") is not None else d["value"]} for d in dimensions]
            bounds.append(geometric(selected))
    return {
        "score": score,
        "sensitivity_bounds": bounds,
        "missing_dimensions": [d["id"] for d in dimensions if d["weight"] > 0 and d["value"] is None],
        "ignored_zero_weight_dimensions": [d["id"] for d in dimensions if d["weight"] == 0],
        "interval_dimensions": [d["id"] for d in dimensions if d["weight"] > 0 and d.get("interval") is not None],
        "dimensions": dimensions,
    }


def readability(shot, fps):
    merged = []
    for start, end in sorted(shot["stable_intervals"]):
        if merged and merged[-1][1] == start:
            merged[-1][1] = end
        else:
            merged.append([start, end])
    longest = max((b - a for a, b in merged), default=0) / fps
    req = shot["read_requirement"]
    return {
        "longest_stable_seconds": longest,
        "total_stable_seconds": sum(b - a for a, b in merged) / fps,
        "required_seconds": None if req is None else req["seconds"],
        "requirement_basis": None if req is None else req["basis"],
        "margin_seconds": None if req is None else longest - req["seconds"],
    }


def analyze(data):
    validate(data)
    dimensions = craft(data["dimensions"])
    failed = [g["id"] for g in data["gates"] if g["required"] and g["status"] == "fail"]
    unknown = [g["id"] for g in data["gates"] if g["required"] and g["status"] == "unknown"]
    gate_status = "hold" if failed else "incomplete" if unknown else "gates_passed"
    fps = data["timeline"]["fps"]["num"] / data["timeline"]["fps"]["den"]
    shot_results = [{"id": s["id"], "consequential": s["consequential"], "craft": craft(s["dimensions"]) if "dimensions" in s else None, "readability": readability(s, fps)} for s in data["shots"]]
    consequential = [s for s in shot_results if s["consequential"]]
    missing_shots = [s["id"] for s in consequential if s["craft"] is None or s["craft"]["score"] is None]
    rated = [s for s in consequential if s["craft"] is not None and s["craft"]["score"] is not None]
    minimum = min((s["craft"]["score"] for s in rated), default=None)
    weakest = {"score": minimum if not missing_shots else None, "shot_ids": [s["id"] for s in rated if s["craft"]["score"] == minimum] if not missing_shots else [], "unrated_consequential_shots": missing_shots}
    shot_map = {s["id"]: s for s in data["shots"]}
    read_map = {s["id"]: s["readability"] for s in shot_results}
    cursor, gaps = 0, []
    for shot in sorted(data["shots"], key=lambda s: s["range"]):
        start, end = shot["range"]
        if start > cursor:
            gaps.append([cursor, start])
        cursor = end
    if cursor < data["timeline"]["total_frames"]:
        gaps.append([cursor, data["timeline"]["total_frames"]])
    timeline_annotation = {
        "unannotated_ranges": gaps,
        "covered_fraction": 1 - sum(b - a for a, b in gaps) / data["timeline"]["total_frames"],
    }
    proof_ids = {s for c in data["claims"] for s in c["proof_shots"]}
    essential_ids = proof_ids | {s["id"] for s in data["shots"] if s["consequential"]}
    measured_read_failures = [s for s in essential_ids if read_map[s]["requirement_basis"] == "measured" and read_map[s]["margin_seconds"] < 0]
    estimated_read_risks = [s for s in essential_ids if read_map[s]["requirement_basis"] == "estimated" and read_map[s]["margin_seconds"] < 0]
    failed_proof_shots = [s for s in essential_ids if shot_map[s]["proof_review"] == "fail"]
    no_stable_proof_shots = [s for s in proof_ids if read_map[s]["longest_stable_seconds"] <= 0]
    unknown_proof_shots = [s for s in essential_ids if shot_map[s]["proof_review"] == "unknown"]
    unknown_read_requirements = [s for s in essential_ids if read_map[s]["required_seconds"] is None]
    zero_dimensions = [{"scope": "film", "dimension": d["id"]} for d in data["dimensions"] if d["weight"] > 0 and d["value"] == 0]
    for shot in data["shots"]:
        if shot["consequential"]:
            zero_dimensions.extend({"scope": shot["id"], "dimension": d["id"]} for d in shot.get("dimensions", []) if d["weight"] > 0 and d["value"] == 0)
    claim_results = []
    for claim in data["claims"]:
        eligible = [s for s in claim["proof_shots"] if read_map[s]["longest_stable_seconds"] > 0]
        usable = [s for s in eligible if read_map[s]["margin_seconds"] is None or read_map[s]["margin_seconds"] >= 0]
        pending = [s for s in eligible if s not in measured_read_failures and shot_map[s]["proof_review"] in ("pass", "unknown")]
        verified = claim["truth"] == "verified" and any(shot_map[s]["proof_review"] == "pass" for s in usable)
        possible = claim["truth"] != "contradicted" and bool(pending)
        claim_results.append({"id": claim["id"], "weight": claim["weight"], "reviewed_proof": verified, "could_pass_pending_review": possible})
    total_weight = sum(c["weight"] for c in claim_results)
    coverage = {
        "verified_fraction": sum(c["weight"] for c in claim_results if c["reviewed_proof"]) / total_weight if total_weight else None,
        "possible_fraction_after_pending_reviews": sum(c["weight"] for c in claim_results if c["could_pass_pending_review"]) / total_weight if total_weight else None,
        "claims": claim_results,
    }
    director = data["director_decision"]
    contradicted_claims = [c["id"] for c in data["claims"] if c["truth"] == "contradicted"]
    pending_claims = [c["id"] for c in claim_results if not c["reviewed_proof"]]
    missing_proof_claims = [c["id"] for c in data["claims"] if not c["proof_shots"]]
    unknown_truth = [c["id"] for c in data["claims"] if c["truth"] == "unknown"]
    derived_blockers = {
        "contradicted_claims": contradicted_claims,
        "missing_proof_claims": missing_proof_claims,
        "failed_proof_shots": sorted(failed_proof_shots),
        "no_stable_proof_shots": sorted(no_stable_proof_shots),
        "measured_read_failures": sorted(measured_read_failures),
    }
    incomplete = unknown or dimensions["missing_dimensions"] or missing_shots or unknown_truth or unknown_proof_shots or unknown_read_requirements or gaps
    blocked = failed or any(derived_blockers.values()) or director == "hold"
    decision = "hold" if blocked else "incomplete" if incomplete else "revise_or_test" if estimated_read_risks else "revise" if director == "revise" or zero_dimensions else "ready_for_declared_next_stage" if director == "ready" else "director_review_pending"
    return {
        "schema_version": "0.1",
        "model_status": "uncalibrated_heuristic",
        "synthetic": data["synthetic"],
        "context": data["context"],
        "decision": decision,
        "director_decision": director,
        "gate_status": gate_status,
        "failed_required_gates": failed,
        "unknown_required_gates": unknown,
        "contradicted_claims": contradicted_claims,
        "claims_without_reviewed_proof": pending_claims,
        "derived_blockers": derived_blockers,
        "estimated_read_risks": sorted(estimated_read_risks),
        "unknown_truth_claims": unknown_truth,
        "unknown_proof_shots": sorted(unknown_proof_shots),
        "unknown_read_requirements": sorted(unknown_read_requirements),
        "zero_dimension_warnings": zero_dimensions,
        "timeline_annotation": timeline_annotation,
        "craft": dimensions,
        "weakest_consequential_shot": weakest,
        "claim_coverage": coverage,
        "shots": shot_results,
        "audience_prediction": None,
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="JSON evidence packet")
    parser.add_argument("--output", type=Path, help="write JSON report; default stdout")
    args = parser.parse_args(argv)
    try:
        data = json.loads(args.input.read_text(encoding="utf-8"))
        result = analyze(data)
        rendered = json.dumps(result, indent=2, allow_nan=False) + "\n"
        if args.output:
            if args.output.resolve() == args.input.resolve():
                fail("output", "must not overwrite the input evidence packet")
            args.output.write_text(rendered, encoding="utf-8")
        else:
            sys.stdout.write(rendered)
    except (ValidationError, OSError, json.JSONDecodeError) as error:
        print(f"video_quality: {error}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
