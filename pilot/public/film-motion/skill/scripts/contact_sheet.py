#!/usr/bin/env python3
"""Build labeled production contact sheets from an explicit still-frame manifest.

Requires Python 3, ffmpeg, and ffprobe. No Python packages or system fonts.
"""
import argparse
import hashlib
import html
import json
import math
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import textwrap
import zlib

STAGES = ("brief", "reference", "storyboard", "styleframes", "animatic", "workprint",
          "transitions", "proof", "final", "variants")
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff", ".ppm"}

# Small original bitmap glyphs make captions portable even when FFmpeg lacks drawtext.
# Lowercase captions render as uppercase; exact original strings remain in the manifest.
FONT = {
    " ": [0, 0, 0, 0, 0, 0, 0],
    "A": [14, 17, 17, 31, 17, 17, 17], "B": [30, 17, 17, 30, 17, 17, 30],
    "C": [14, 17, 16, 16, 16, 17, 14], "D": [30, 17, 17, 17, 17, 17, 30],
    "E": [31, 16, 16, 30, 16, 16, 31], "F": [31, 16, 16, 30, 16, 16, 16],
    "G": [14, 17, 16, 23, 17, 17, 15], "H": [17, 17, 17, 31, 17, 17, 17],
    "I": [14, 4, 4, 4, 4, 4, 14], "J": [7, 2, 2, 2, 18, 18, 12],
    "K": [17, 18, 20, 24, 20, 18, 17], "L": [16, 16, 16, 16, 16, 16, 31],
    "M": [17, 27, 21, 21, 17, 17, 17], "N": [17, 25, 21, 19, 17, 17, 17],
    "O": [14, 17, 17, 17, 17, 17, 14], "P": [30, 17, 17, 30, 16, 16, 16],
    "Q": [14, 17, 17, 17, 21, 18, 13], "R": [30, 17, 17, 30, 20, 18, 17],
    "S": [15, 16, 16, 14, 1, 1, 30], "T": [31, 4, 4, 4, 4, 4, 4],
    "U": [17, 17, 17, 17, 17, 17, 14], "V": [17, 17, 17, 17, 17, 10, 4],
    "W": [17, 17, 17, 21, 21, 21, 10], "X": [17, 17, 10, 4, 10, 17, 17],
    "Y": [17, 17, 10, 4, 4, 4, 4], "Z": [31, 1, 2, 4, 8, 16, 31],
    "0": [14, 17, 19, 21, 25, 17, 14], "1": [4, 12, 4, 4, 4, 4, 14],
    "2": [14, 17, 1, 2, 4, 8, 31], "3": [30, 1, 1, 14, 1, 1, 30],
    "4": [2, 6, 10, 18, 31, 2, 2], "5": [31, 16, 16, 30, 1, 1, 30],
    "6": [14, 16, 16, 30, 17, 17, 14], "7": [31, 1, 2, 4, 8, 8, 8],
    "8": [14, 17, 17, 14, 17, 17, 14], "9": [14, 17, 17, 15, 1, 1, 14],
    ".": [0, 0, 0, 0, 0, 12, 12], ",": [0, 0, 0, 0, 0, 4, 8],
    ":": [0, 12, 12, 0, 12, 12, 0], ";": [0, 12, 12, 0, 4, 4, 8],
    "-": [0, 0, 0, 31, 0, 0, 0], "_": [0, 0, 0, 0, 0, 0, 31],
    "/": [1, 2, 2, 4, 8, 8, 16], "\\": [16, 8, 8, 4, 2, 2, 1],
    "|": [4, 4, 4, 4, 4, 4, 4], "+": [0, 4, 4, 31, 4, 4, 0],
    "=": [0, 0, 31, 0, 31, 0, 0], "*": [0, 21, 14, 31, 14, 21, 0],
    "(": [2, 4, 8, 8, 8, 4, 2], ")": [8, 4, 2, 2, 2, 4, 8],
    "[": [14, 8, 8, 8, 8, 8, 14], "]": [14, 2, 2, 2, 2, 2, 14],
    "{": [3, 4, 4, 8, 4, 4, 3], "}": [24, 4, 4, 2, 4, 4, 24],
    "<": [1, 2, 4, 8, 4, 2, 1], ">": [16, 8, 4, 2, 4, 8, 16],
    "!": [4, 4, 4, 4, 4, 0, 4], "?": [14, 17, 1, 2, 4, 0, 4],
    "'": [4, 4, 8, 0, 0, 0, 0], '"': [10, 10, 20, 0, 0, 0, 0],
    "#": [10, 10, 31, 10, 31, 10, 10], "%": [25, 25, 2, 4, 8, 19, 19],
    "&": [12, 18, 20, 8, 21, 18, 13], "@": [14, 17, 23, 21, 23, 16, 14],
    "$": [4, 15, 20, 14, 5, 30, 4], "^": [4, 10, 17, 0, 0, 0, 0],
    "`": [8, 4, 2, 0, 0, 0, 0], "~": [0, 0, 8, 21, 2, 0, 0],
}


def command(args, binary=False):
    result = subprocess.run(args, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=60)
    return result.stdout if binary else result.stdout.decode("utf-8")


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for data in iter(lambda: source.read(1048576), b""):
            digest.update(data)
    return digest.hexdigest()


def number(value, name, minimum=0):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value < minimum:
        raise ValueError(name + " must be a finite number >= " + str(minimum))
    return value


def positive_int(value, name, low, high):
    if isinstance(value, bool) or not isinstance(value, int) or not low <= value <= high:
        raise ValueError("%s must be an integer in [%d, %d]" % (name, low, high))
    return value


def display_text(value, name):
    if not isinstance(value, str):
        raise ValueError(name + " must be a string")
    unsupported = sorted(set(c for c in value.upper() if c not in FONT and c not in "\n\r\t"))
    if unsupported:
        raise ValueError(name + " has unsupported display characters " + repr("".join(unsupported)) +
                         "; supply an ASCII display_label/display_title while retaining original text")
    return value


def wrap(value, width):
    lines = []
    for paragraph in value.replace("\t", " ").splitlines() or [""]:
        lines.extend(textwrap.wrap(paragraph.upper(), width=width, break_long_words=True,
                                   break_on_hyphens=False) or [""])
    return lines


def rectangle(canvas, canvas_width, x, y, width, height, color):
    run = bytes(color) * width
    for line in range(y, y + height):
        start = (line * canvas_width + x) * 3
        canvas[start:start + width * 3] = run


def text(canvas, canvas_width, x, y, value, scale, color):
    for char in value.upper():
        for row, bits in enumerate(FONT[char]):
            for col in range(5):
                if bits & (1 << (4 - col)):
                    rectangle(canvas, canvas_width, x + col * scale, y + row * scale,
                              scale, scale, color)
        x += 6 * scale


def png(path, width, height, rgb):
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xffffffff)
    compressor = zlib.compressobj(6)
    compressed = []
    for y in range(height):
        compressed.append(compressor.compress(b"\x00" + rgb[y * width * 3:(y + 1) * width * 3]))
    compressed.append(compressor.flush())
    path.write_bytes(b"\x89PNG\r\n\x1a\n" +
                     chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)) +
                     chunk(b"IDAT", b"".join(compressed)) + chunk(b"IEND", b""))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="JSON selection manifest")
    parser.add_argument("out", type=Path, help="New output directory; existing output is refused")
    parser.add_argument("--stage", required=True, choices=STAGES)
    args = parser.parse_args()
    if args.out.exists():
        parser.error("Output already exists; use a new directory for each revision")
    for name in ("ffmpeg", "ffprobe"):
        if not shutil.which(name):
            parser.error(name + " is required")
    if not args.input.is_file():
        parser.error("Input JSON does not exist")
    selection_bytes = args.input.read_bytes()
    selection_digest = hashlib.sha256(selection_bytes).hexdigest()
    selection = json.loads(selection_bytes.decode("utf-8"))
    if not isinstance(selection, dict):
        raise ValueError("Input must be a JSON object")
    title = selection.get("title", "Film contact sheet")
    if not isinstance(title, str):
        raise ValueError("title must be a string")
    displayed_title = display_text(selection.get("display_title", title), "display_title")
    revision = display_text(selection.get("revision", ""), "revision")
    if not revision.strip():
        raise ValueError("revision must be nonempty so each sheet can be traced to the edit")
    columns = positive_int(selection.get("columns", 4), "columns", 1, 12)
    rows = positive_int(selection.get("rows", 3), "rows", 1, 12)
    cell_width = positive_int(selection.get("cell_width", 480), "cell_width", 160, 1920)
    image_height = positive_int(selection.get("image_height", 270), "image_height", 90, 1920)
    font_scale = positive_int(selection.get("font_scale", 2), "font_scale", 1, 4)
    gap, margin, inset = 8, 12, 10
    line_height = 9 * font_scale
    chars = (cell_width - 2 * inset) // (6 * font_scale)
    raw_frames = selection.get("frames")
    if not isinstance(raw_frames, list) or not raw_frames:
        raise ValueError("frames must be a nonempty array of explicit still-image selections")
    prepared = []
    # Validate and probe everything before creating output. No remote resources or shell.
    for index, item in enumerate(raw_frames):
        if not isinstance(item, dict):
            raise ValueError("Each frame must be an object")
        source_string = item.get("path")
        if not isinstance(source_string, str) or "://" in source_string:
            raise ValueError("Each path must identify a local still image")
        source = Path(source_string).expanduser()
        if not source.is_absolute():
            source = args.input.resolve().parent / source
        source = source.resolve()
        if not source.is_file() or source.suffix.lower() not in IMAGE_EXTENSIONS:
            raise ValueError("Source must be an existing supported still image: " + str(source))
        shot_id = display_text(item.get("shot_id", ""), "shot_id")
        if not shot_id.strip():
            raise ValueError("Each frame needs a nonempty shot_id")
        label = item.get("label", "")
        if not isinstance(label, str):
            raise ValueError("label must be a string")
        displayed_label = display_text(item.get("display_label", label), "display_label")
        frame = item.get("frame")
        if frame is not None:
            number(frame, "frame")
        pts = item.get("pts_seconds")
        if pts is not None:
            # PTS can legitimately precede zero in source media.
            if isinstance(pts, str):
                try:
                    numeric_pts = float(pts)
                except ValueError:
                    raise ValueError("pts_seconds must be numeric or a numeric string")
                if not math.isfinite(numeric_pts):
                    raise ValueError("pts_seconds must be finite")
            else:
                number(pts, "pts_seconds", -1e12)
        frame_space = item.get("frame_space", "output" if frame is not None else "layout")
        if frame_space not in ("source", "output", "layout"):
            raise ValueError("frame_space must be source, output, or layout")
        probe = json.loads(command(["ffprobe", "-v", "error", "-protocol_whitelist", "file,pipe",
                                    "-select_streams", "v:0", "-count_frames", "-show_entries",
                                    "stream=width,height,sample_aspect_ratio,nb_read_frames",
                                    "-of", "json", str(source)]))
        streams = probe.get("streams", [])
        if not streams or int(streams[0].get("nb_read_frames", "0")) != 1:
            raise ValueError("Select a still frame first; animated/multiframe input is refused: " + str(source))
        stream = streams[0]
        width, height = int(stream["width"]), int(stream["height"])
        sar = stream.get("sample_aspect_ratio", "1:1")
        try:
            numerator, denominator = [int(v) for v in sar.split(":")]
            sample_ratio = numerator / denominator if numerator and denominator else 1
        except (ValueError, ZeroDivisionError):
            sample_ratio = 1
        display_ratio = width * sample_ratio / height
        if display_ratio >= cell_width / image_height:
            fitted_width = cell_width
            fitted_height = max(1, min(image_height, round(cell_width / display_ratio)))
        else:
            fitted_height = image_height
            fitted_width = max(1, min(cell_width, round(image_height * display_ratio)))
        timing = frame_space.upper() + (" F " + str(frame) if frame is not None else " POSE")
        if pts is not None:
            timing += " | PTS " + str(pts) + " S"
        label_lines = (wrap("%04d | SHOT %s" % (index, shot_id), chars) +
                       wrap(timing, chars) + wrap(displayed_label, chars))
        prepared.append({"selection_index": index, "source_path": str(source),
                         "source_sha256": sha256(source), "source_width": width,
                         "source_height": height, "source_sample_aspect_ratio": sar,
                         "shot_id": shot_id, "label": label, "display_label": displayed_label,
                         "frame": frame, "frame_space": frame_space, "pts_seconds": pts,
                         "label_lines": label_lines, "fitted_width": fitted_width,
                         "fitted_height": fitted_height})
    caption_height = max(len(f["label_lines"]) for f in prepared) * line_height + 2 * inset
    cell_height = image_height + caption_height
    sheet_width = 2 * margin + columns * cell_width + (columns - 1) * gap
    header_lines = wrap(displayed_title, (sheet_width - 2 * margin) // (6 * font_scale))
    header_height = (len(header_lines) + 2) * line_height + 2 * margin
    sheet_height = header_height + rows * cell_height + (rows - 1) * gap + margin
    if sheet_width * sheet_height > 40000000:
        raise ValueError("Sheet exceeds 40 million pixels; reduce cells, dimensions, or label length")
    pages = math.ceil(len(prepared) / (columns * rows))
    subheadings = []
    for page in range(pages):
        subheading = "STAGE %s | REV %s | SHEET %d/%d" % (args.stage, revision, page + 1, pages)
        lines = wrap(subheading, (sheet_width - 2 * margin) // (6 * font_scale))
        if len(lines) > 2:
            raise ValueError("Header revision is too long for this sheet width")
        subheadings.append(lines)
    args.out.mkdir(parents=True)
    manifest = {"schema_version": 1, "title": title, "display_title": displayed_title,
                "stage": args.stage, "revision": revision, "selection_manifest": str(args.input.resolve()),
                "selection_manifest_sha256": selection_digest, "columns": columns, "rows": rows,
                "sheet_width": sheet_width, "sheet_height": sheet_height,
                "image_width": cell_width, "image_height": image_height,
                "caption_height": caption_height, "font": "bundled 5x7 bitmap, uppercase display",
                "ordering": "input order; cells left-to-right then top-to-bottom; all indices zero-based",
                "fit": "contain, source display aspect preserved, no crop, opaque RGB review background",
                "color_note": "8-bit RGB review sheets; not a color-managed or alpha-preserving delivery master",
                "ffmpeg_version": command(["ffmpeg", "-version"]).splitlines()[0],
                "review_scope": {"sheets_generated": True, "visually_reviewed": False,
                                 "native_resolution_review": False, "playback_review": False,
                                 "audio_review": False}, "sheets": [], "frames": []}
    sheet_bg, image_bg, caption_bg, ink, accent = (12, 14, 17), (23, 26, 31), (30, 34, 40), (239, 242, 246), (144, 198, 182)
    for page in range(pages):
        canvas = bytearray(bytes(sheet_bg) * (sheet_width * sheet_height))
        y = margin
        for line in header_lines:
            text(canvas, sheet_width, margin, y, line, font_scale, ink)
            y += line_height
        for line in subheadings[page]:
            text(canvas, sheet_width, margin, y, line, font_scale, accent)
            y += line_height
        selected = prepared[page * columns * rows:(page + 1) * columns * rows]
        for cell, frame_record in enumerate(selected):
            x = margin + (cell % columns) * (cell_width + gap)
            y = header_height + (cell // columns) * (cell_height + gap)
            rectangle(canvas, sheet_width, x, y, cell_width, image_height, image_bg)
            rectangle(canvas, sheet_width, x, y + image_height, cell_width, caption_height, caption_bg)
            fw, fh = frame_record["fitted_width"], frame_record["fitted_height"]
            # Scale to square-pixel review bounds, then flatten any alpha over the declared background.
            vf = "scale=%d:%d:flags=lanczos,setsar=1,format=rgba" % (fw, fh)
            rgba = command(["ffmpeg", "-hide_banner", "-loglevel", "error", "-protocol_whitelist", "file,pipe", "-noautorotate",
                            "-i", frame_record["source_path"], "-map", "0:v:0", "-frames:v", "1",
                            "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgba", "pipe:1"], binary=True)
            if len(rgba) != fw * fh * 4:
                raise ValueError("Decoded frame dimensions did not match expected review bounds")
            left, top = x + (cell_width - fw) // 2, y + (image_height - fh) // 2
            for py in range(fh):
                for px in range(fw):
                    src_index = (py * fw + px) * 4
                    target_index = ((top + py) * sheet_width + left + px) * 3
                    alpha = rgba[src_index + 3]
                    for c in range(3):
                        canvas[target_index + c] = (rgba[src_index + c] * alpha + image_bg[c] * (255 - alpha) + 127) // 255
            label_y = y + image_height + inset
            for line in frame_record["label_lines"]:
                text(canvas, sheet_width, x + inset, label_y, line, font_scale, ink)
                label_y += line_height
            if sha256(Path(frame_record["source_path"])) != frame_record["source_sha256"]:
                raise ValueError("Source changed during sheet creation: " + frame_record["source_path"])
            record = dict(frame_record)
            record.update({"sheet": "sheet-%03d.png" % page, "sheet_index": page, "cell_index": cell,
                           "cell_bounds_xywh": [x, y, cell_width, cell_height],
                           "image_bounds_xywh": [left, top, fw, fh]})
            manifest["frames"].append(record)
        filename = "sheet-%03d.png" % page
        png(args.out / filename, sheet_width, sheet_height, canvas)
        manifest["sheets"].append({"path": filename, "sha256": sha256(args.out / filename),
                                   "sheet_index": page, "populated_cells": len(selected),
                                   "padding_cells": columns * rows - len(selected)})
    if sha256(args.input) != selection_digest:
        raise ValueError("Selection JSON changed during sheet creation")
    for frame_record in prepared:
        if sha256(Path(frame_record["source_path"])) != frame_record["source_sha256"]:
            raise ValueError("Source changed during sheet creation: " + frame_record["source_path"])
    (args.out / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    parts = ["<!doctype html><meta charset='utf-8'><title>" + html.escape(title) + "</title>",
             "<style>body{background:#0c0e11;color:#eff2f6;font:16px system-ui;margin:24px}img{max-width:100%;height:auto} "
             "table{border-collapse:collapse}td,th{border:1px solid #59616c;padding:8px;text-align:left}code{white-space:pre-wrap}</style>",
             "<h1>" + html.escape(title) + "</h1><p>Stage " + html.escape(args.stage) + " · revision " + html.escape(revision) + "</p>",
             "<p>Generated, not yet visually reviewed. Labels on PNGs use uppercase bitmap type; original strings and exact mapping follow.</p>"]
    for sheet in manifest["sheets"]:
        parts.append("<h2>Sheet %d</h2><a href='%s'><img src='%s' alt='Labeled contact sheet'></a>" %
                     (sheet["sheet_index"], sheet["path"], sheet["path"]))
    parts.append("<h2>Exact selection map</h2><table><tr><th>Index / sheet / cell</th><th>Shot</th><th>Clock</th><th>Label</th><th>Source</th></tr>")
    for f in manifest["frames"]:
        parts.append("<tr><td>%d / %d / %d</td><td>%s</td><td>%s frame %s; PTS %s s</td><td>%s</td><td><code>%s</code></td></tr>" %
                     (f["selection_index"], f["sheet_index"], f["cell_index"], html.escape(f["shot_id"]),
                      html.escape(f["frame_space"]), html.escape(str(f["frame"])), html.escape(str(f["pts_seconds"])),
                      html.escape(f["label"]), html.escape(f["source_path"])))
    parts.append("</table>")
    (args.out / "index.html").write_text("\n".join(parts), encoding="utf-8")
    print(json.dumps({"out": str(args.out.resolve()), "stage": args.stage,
                      "selected_stills": len(prepared), "sheets": pages, "review": "not_performed"}))


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, json.JSONDecodeError, subprocess.SubprocessError) as error:
        stderr = getattr(error, "stderr", None)
        print(stderr.decode("utf-8", errors="replace") if isinstance(stderr, bytes) else str(error), file=sys.stderr)
        sys.exit(1)
