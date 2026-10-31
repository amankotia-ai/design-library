# Preview scrolling restored

Only interactive Interfere system previews now load /interfere/page.html directly into the existing fixed-size preview frame. The expanded intermediate wrapper is bypassed, so the actual source document has a native scroll range. No scripted wheel forwarding or custom keyboard scrolling was added.

Project source and the active library server at http://127.0.0.1:5202 are updated. Existing sizing, scale, source appearance, accessible title and noninteractive card behavior remain intact. Other routes and standalone Interfere sections remain unchanged. Concurrent system-detail layout work was preserved.

Independent QA checked pointer scrolling, keyboard End/Home to footer/hero, Product disclosure with Enter, narrow390px scrolling, inert Pages thumbnails, standalone full page and security section. Core fix passed. Chrome CUA showed small outer-document drift, so universal outer stability and scroll chaining at boundaries are not claimed. Parent IAB recorded inner0→1440 with outer157.5 unchanged.

Vite dev compilation succeeded. A production build reached75transformed modules but stalled copying an unrelated Conversion font cloud placeholder: conversion/platform-source/_astro/inter-cyrillic-400-normal.HOLc17fK.woff. The owned build was cancelled; no production build pass is claimed. No reference assets were changed.

Actual result images: after-pointer-scroll.png, after-bottom.png and qa-narrow-pointer.png. Independent evidence: qa.md and qa-revision.json. Functional revision: revision.json.
