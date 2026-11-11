#!/usr/bin/env python3
"""Index every decoded frame and build timestamped study sheets. No pip packages."""
import argparse
import csv
import hashlib
import html
import json
from pathlib import Path
import shutil
import subprocess
import sys


def run(args):
    return subprocess.run(args, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE, text=True).stdout


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("source", type=Path)
    p.add_argument("out", type=Path, help="New directory; existing output is refused")
    p.add_argument("--step", type=int, default=1, help="Keep every Nth frame (default: every frame)")
    p.add_argument("--width", type=int, default=480, help="Thumbnail width")
    p.add_argument("--columns", type=int, default=4)
    p.add_argument("--rows", type=int, default=5)
    p.add_argument("--start-frame", type=int, default=0)
    p.add_argument("--end-frame", type=int, help="Exclusive decoded frame index")
    a = p.parse_args()
    if not a.source.is_file():
        p.error("Source file does not exist")
    if any(v <= 0 for v in (a.step, a.width, a.columns, a.rows)) or a.start_frame < 0:
        p.error("Step, width and sheet dimensions must be positive; start must be nonnegative")
    if a.out.exists():
        p.error("Output already exists; use a new directory to preserve provenance")
    for binary in ("ffprobe", "ffmpeg"):
        if not shutil.which(binary):
            p.error(binary + " is required")
    source = a.source.resolve()
    probe = json.loads(run(["ffprobe", "-v", "error", "-show_format", "-show_streams",
                            "-of", "json", str(source)]))
    frames = json.loads(run(["ffprobe", "-v", "error", "-select_streams", "v:0",
                             "-show_frames", "-show_entries",
                             "frame=best_effort_timestamp_time,pkt_duration_time,duration_time,key_frame,pict_type",
                             "-of", "json", str(source)]))["frames"]
    end = a.end_frame if a.end_frame is not None else len(frames)
    if not a.start_frame < end <= len(frames):
        p.error("Requested frame range is outside decoded source")
    selected = list(range(a.start_frame, end, a.step))
    a.out.mkdir(parents=True)
    thumbs = a.out / "frames"
    sheets = a.out / "sheets"
    thumbs.mkdir()
    sheets.mkdir()
    sha = hashlib.sha256()
    with source.open("rb") as f:
        for block in iter(lambda: f.read(1048576), b""):
            sha.update(block)
    # PTS is retained in the manifest; no fps filter or CFR conversion is used.
    selection = "gte(n,%d)*lt(n,%d)*not(mod(n-%d,%d))" % (a.start_frame, end, a.start_frame, a.step)
    vf = "select='%s',scale=%d:-2" % (selection, a.width)
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(source),
         "-map", "0:v:0", "-vf", vf, "-fps_mode", "vfr", "-q:v", "3",
         "-start_number", "0", str(thumbs / "%08d.jpg")])
    actual = sorted(thumbs.glob("*.jpg"))
    if len(actual) != len(selected):
        raise RuntimeError("Extracted thumbnail count differs from decoded-frame selection")
    cells = a.columns * a.rows
    # Tile emits the final partial sheet padded with black; cells are mapped below.
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-framerate", "1",
         "-start_number", "0", "-i", str(thumbs / "%08d.jpg"), "-vf",
         "tile=%dx%d:nb_frames=%d:padding=4:margin=4:color=black" % (a.columns, a.rows, cells),
         "-fps_mode", "vfr", "-q:v", "3", "-start_number", "0", str(sheets / "%05d.jpg")])
    selected_lookup = {n: j for j, n in enumerate(selected)}
    with (a.out / "frames.csv").open("w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["decoded_frame", "source_pts_seconds", "duration_seconds", "keyframe",
                         "picture_type", "thumbnail", "sheet", "cell_zero_based"])
        for n, frame in enumerate(frames):
            j = selected_lookup.get(n)
            writer.writerow([n, frame.get("best_effort_timestamp_time", ""),
                             frame.get("duration_time", frame.get("pkt_duration_time", "")),
                             frame.get("key_frame", ""), frame.get("pict_type", ""),
                             "frames/%08d.jpg" % j if j is not None else "",
                             "sheets/%05d.jpg" % (j // cells) if j is not None else "",
                             j % cells if j is not None else ""])
    manifest = {
        "source": str(source), "sha256": sha.hexdigest(), "probe": probe,
        "decoded_frames": len(frames), "selected_frames": len(selected),
        "start_frame": a.start_frame, "end_frame_exclusive": end, "step": a.step,
        "thumbnail_width": a.width, "columns": a.columns, "rows": a.rows,
        "ffmpeg_version": run(["ffmpeg", "-version"]).splitlines()[0],
        "review_scope": {"decoded_index": "complete", "visual_review": "not_performed",
                         "native_resolution_review": "not_performed", "playback": "not_performed",
                         "audio": "not_performed"},
        "warning": "Decoding, extraction and sheet creation do not establish visual or audio review."
    }
    (a.out / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    parts = ["<!doctype html><meta charset='utf-8'><title>Frame study</title>",
             "<style>body{background:#181818;color:#eee;font:14px system-ui;margin:24px} "
             "section{display:grid;grid-template-columns:repeat(%d,minmax(0,1fr));gap:8px} "
             "figure{margin:0}img{width:100%%}h2{grid-column:1/-1}code{font-size:12px}</style>" % a.columns,
             "<h1>" + html.escape(source.name) + "</h1>",
             "<p>Source PTS, zero-based decoded frame indices. Review not yet performed.</p><section>"]
    for j, n in enumerate(selected):
        if j % cells == 0:
            parts.append("<h2>Sheet %d</h2>" % (j // cells))
        pts = frames[n].get("best_effort_timestamp_time", "unknown")
        parts.append("<figure><img loading='lazy' src='frames/%08d.jpg'><figcaption>f%d · %s s</figcaption></figure>" %
                     (j, n, html.escape(str(pts))))
    parts.append("</section>")
    (a.out / "index.html").write_text("\n".join(parts))
    print(json.dumps({"out": str(a.out.resolve()), "decoded_frames": len(frames),
                      "selected_frames": len(selected), "review": "not_performed"}))


if __name__ == "__main__":
    try:
        main()
    except (subprocess.CalledProcessError, RuntimeError) as e:
        print(getattr(e, "stderr", str(e)), file=sys.stderr)
        sys.exit(1)
