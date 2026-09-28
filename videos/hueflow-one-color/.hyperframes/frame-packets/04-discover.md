# Frame packet: 04-discover

## Project inputs

- Project: /Users/user/Documents/Aganik_pro/color/videos/hueflow-one-color
- Design tokens: /Users/user/Documents/Aganik_pro/color/videos/hueflow-one-color/frame.md
- RULES_DIR: /Users/user/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 4 — Discover

- scene: A slow horizontal camera glide across a floating wall of exploration cards: mood palettes (Minimal, Warm, Cool, Luxury, Nature, Pastel, Bold, Trending), gradients, and a color picker readout
- voiceover: ""
- on_screen: "Palettes. Gradients. Trends."
- duration: 6s
- poster: 3s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/04-discover.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: awe + abundance
- asset_candidates:

- blueprint: camera-journey (Adapt — sub-shape B)
- focal: the floating wall of exploration cards (built, no asset)
- roles: none — rebuilt HueFlow cards
- sfx: none

Adapt: keep the cursorless cinematic 3D flight across one continuous world (multi-leg camera, depth of field, tilt-to-flatten); the landing is a gentle deceleration into focus, not a violent dive — the brief asks for slow, sophisticated camera.
Scene 1 (0.0–1.6s): an oversized world of floating glass cards at three depths: mood palette cards labelled Minimal, Warm, Cool, Luxury, Nature, Pastel, Bold, Trending (site collections, each a 5-color strip), two gradient cards (a linear sunset and a radial teal), and a Color Picker card showing HEX #E8531F · RGB 232, 83, 31 · HSL 16°, 81%, 52% (site copy). The camera opens angled and close on "Warm", neighbors soft under depth of field (`3d-camera-flight` + `depth-of-field-blur`).
Scene 2 (1.6–4.0s): one slow lateral flight left→right across the wall while the world tilts flat to straight-on; foreground cards pass with a faint horizontal blur that peaks mid-travel and clears at the settle; cards farther back parallax slower.
Scene 3 (4.0–6.0s): the camera decelerates into focus on the gradient card and the Color Picker card side by side (`3d-camera-flight` landing, `depth-of-field-blur` rack); "Palettes. Gradients. Trends." reveals word by word in the top band, one word per soft beat (blur-to-sharp, power3). Hold.

narrativeRole: Breadth beat. The slow lateral camera and the soft depth sell the "infinite" half of the message with the site's own mood collections and tools.
keyMessage: There is always a next color to discover.

## Selected blueprint: camera-journey

# camera-journey — Camera Journey

**intent**: The real viewport camera is the STORYTELLER — a multi-leg journey (dive in → a mid-journey beat fires → travel to the consequence / reposition → landing push, at rest) across ONE continuous world, where the travel itself carries the narrative. Two folded sub-shapes: **(A) action roundtrip** — the camera dives into a UI panel, a cursor/typed action fires, and the camera swoops/pans to another region where the consequence renders as element motion; **(B) cursorless flight** — pure cinematic 3D flight (motion blur, depth-of-field, tilt-to-flatten rotations) over static or self-animating content, no cursor anywhere.

**boundary**: This is NOT `cursor-ui-demo` — there the camera _chases_ the cursor (a servo following the actor); here the camera IS the actor, moving on its own narrative motivation, and in sub-shape A the cursor acts only at the leg hinge (in B it never appears). This is NOT `device-surface-showcase` — there one DEVICE/surface is hero and the camera merely presents it; here no single surface is hero — the journey traverses multiple regions/panels/depth planes and the traversal is the story. This is NOT `spatial-pan-stations` — there pre-placed stations on a flat canvas are visited by repeated pans of the same type; here the legs are heterogeneous (push-in, swoop, pull-back-rotate, whip, dive) and each leg is _motivated_ (by a fired action, or by the reveal it lands on).

**roles served**

- Benefits (from `camera-swoop-panel-action-roundtrip`): when the benefit IS a cause→effect round trip — "do this small thing here, get this big thing there" (comment → chart morphs; agent finding → verified commit; chat message → receipt + ledger). The camera physically connects the action to its payoff, so the viewer _travels_ the value chain instead of being told it.
- Key_Feature (from `cursorless-camera-flight`): when the feature should feel cinematic and inevitable — a payout form or a generated content-plan calendar explored by a flying camera (dives, whip sweeps, tilt-to-flatten, violent final push onto the CTA/hero card), the content acting by itself (a dropdown self-selects; keyword cards simply exist in depth) with no hand on the wheel.

**duration**: 5.6–11.1s (sub-shape A 5.6–9.0s: 001 5.6s · 066 8.6s · 004 9.0s; sub-shape B 6.3–11.1s: Outrank 6.3s · 094 11.1s)

**shot structure** (one oversized `[world]` — a `[UI canvas: design tool / GitHub + agent panels / phone + desktop ledger]` (A) or a `[3D-laid-out space: floating form card / calendar grid with standing keyword cards]` (B) — wrapped by a single virtual camera; content animates as elements _inside_ the world while the camera travels; every leg is a sequential tween on the same camera state)

- **Scene 0 (optional, 0.0–~1.8s) — static prologue.** Camera locked on a `[prologue beat: static promo card with a floating 3D product card / typed headline with an accent word / wide establishing shot of the app]`. A typewriter line may finish (`[headline]` types on, accent word in `[accent color]`). The prologue BREAKS by a hard cut or by the headline shrinking and slipping away as the first dive begins — the stillness exists to make the journey's launch land.

- **Scene 1 (~0.5–2.0s) — LEG 1: dive in.** The camera pushes in FAST and TIGHT onto `[the focal element]`:
  - _Sub-shape A_: a flat whole-viewport push onto `[an actionable element: comment box / agent panel / chat bubble]` where `[typed text]` finishes typing or `[response text]` streams in. The header/context leaves the frame — commitment, not a polite zoom.
  - _Sub-shape B_: the push lands at an ANGLE — a tilted 3D close-up of `[the form region / the calendar grid]`, foreground elements motion-blurred during the travel, neighbors soft under depth-of-field. A huge `[foreground prop: date number / field label]` may dominate the frame, blurred by speed.

- **Scene 2 (~1.5–6.0s) — LEG 2: the mid-journey beat (the hinge).** The camera holds, drifts, or pulls slowly while the content ACTS:
  - _Sub-shape A — the action fires_: a `[cursor]` clicks `[Send / Create PR]` (or a `[message]` sends implicitly) and the acted element CLEARS/vanishes. Optional theater before the click: a `[status spinner]` cycles `[status words]`, `[to-do items]` strike through, `[response text]` streams. The click is the hinge that _motivates_ the next leg.
  - _Sub-shape B — the content self-acts_: a `[dropdown]` expands by itself (pushing `[the field below]` down), shows a `[row hover highlight]` with no cursor, and collapses with the new value selected; OR the flight decelerates INTO FOCUS on `[one card]` — its `[metrics]` sharp, neighboring cards blurred.

- **Scene 3 (~4.0–8.0s) — LEG 3: travel to the consequence / reposition.**
  - _Sub-shape A_: the camera pulls back / swoops / pans to `[region B]` while the CONSEQUENCE builds as element motion — `[bars shrink into the baseline while a node-dotted line draws left→right / a verified commit row slides into the timeline + a reaction pill pops / a receipt card expands row-by-row from a skeleton]`. An optional SECOND leg extends the trip: `[pan up-right to a toolbar → a dropdown cascades open / match cut into an extreme close-up → a fast decelerating zoom-out reveals a ledger table]`.
  - _Sub-shape B_: a repositioning move — a slow pull-back that ROTATES the world flat and centered (3D → straight-on 2D), or a heavily motion-blurred WHIP SWEEP that resolves into a flat lateral pan across `[a month calendar / the full card]`. On the flat hold, quiet element beats may play: a thin `[focus outline]` fades in around one `[field]` and sweeps down to the next; the card keeps a near-imperceptible tilt/scale drift so the hold never dies.

- **Scene 4 (final ~1–2s) — LEG 4: landing.** The journey resolves on the payoff:
  - _Sub-shape A_: the camera comes to REST; the `[cursor]` hovers or drifts toward `[the payoff: an open Export menu item / the commit link / the View-transaction button]`; ends still, on the changed state — the world is visibly different from where the trip began.
  - _Sub-shape B_: a sudden VIOLENT push-in/dive (motion-blurred) onto `[the CTA button scaled huge in frame / the hero keyword card]`, ending holding tight — or holding MID-DIVE (the last frames are still traveling; the flat overview is explicitly not the final image).

**motion vocabulary**: whole-viewport camera push-in (fast/tight and slow/subtle); camera pull-back reframe; camera pan up/right/down; dive/swoop between stacked panels; fast decelerating zoom-out to rest; sudden violent push-in onto a button scaled huge; continuous 3D flight through a card grid; dive into an angled 3D close-up; slow pull-back that rotates/flattens the world to straight-on; heavily motion-blurred whip sweep; motion blur on camera travel; depth-of-field with blurred neighbors; decelerate-into-focus; hard cut / match cut into extreme close-up; near-imperceptible tilt/scale drift on holds; typed text finishing in an input; typewriter headline; headline shrinks and slips away as the camera dives; streaming AI response text; status-word spinner cycling labels; to-do strikethrough draw; cursor click; clicked element clears/vanishes; dropdown cascades open / self-expands and collapses with a row hover highlight (displacing the field below); bar-to-line chart morph (bars shrink into the baseline while a node-dotted line draws left→right, labels persist); commit row slide-in on a timeline; reaction pill appears; skeleton→content card build; receipt/label rows expand row-by-row; thin focus outline fades in and sweeps between fields; camera drift toward a button; 3D card subtle float; cursor hover at rest.

**rule mapping**

- the multi-leg camera itself — sequential push / pull-back / pan / dive phases on one wrapper, plus the micro-drift that keeps holds alive → `multi-phase-camera` (phase sequencing + drift) over `viewport-change` (the base virtual-camera primitive: single `.world` wrapper, one `cam {scale,x,y}` state — one source of truth for every leg)
- diving TIGHT onto an off-center element (comment box, chat bubble, Send button, one keyword card) → `coordinate-target-zoom` (scale + counter-translate; measure the target, don't hand-derive — a journey amplifies centering error on every leg)
- fast decelerating zoom-out from an extreme close-up to rest (066's ledger reveal) → `coordinate-target-zoom` zoom-out variation / `multi-phase-camera` (pull phase, hard `power4.out`)
- motion blur on camera travel (dive, whip sweep, violent final push) → `motion-blur-streak` (Camera-travel carve-out — the blur envelope rides the `.world` wrapper during a leg: the world never leaves frame, the blur peaks at peak velocity and resolves sharp at each landing)
- depth-of-field on neighbors while one card is in focus; decelerate-into-focus → `depth-of-field-blur` (focal pull + blur-the-cluster-while-pushing-in are explicitly in scope; run the DoF tween at the same position as the camera leg)
- the 3D flight itself (sub-shape B's core) — a perspective camera traveling with `rotateX/rotateY/translateZ` through a 3D-laid-out world: the dive into an angled calendar grid, the tilt-to-flatten pull-back (angled 3D → straight-on 2D), the continuous flight between standing cards → `3d-camera-flight` (perspective wrapper + preserve-3d; the 2D camera rules keep owning any flat legs)
- whip sweep → composition: `nudge-curve` (burst-dominant tuning of the slow-fast-slow slide, applied to the world) + `motion-blur-streak` (camera-travel carve-out) on the same window
- typed text finishing in an input; typewriter headline; streaming AI response text; status spinner cycling `[status words]`; skeleton→content state swap → `discrete-text-sequence` (+ `gsap-effects` typewriter; `context-sensitive-cursor` for the input caret)
- which content appears per leg / receipt rows and findings arriving on script windows → `dynamic-content-sequencing`
- cursor click on `[Send / Create PR]` (sub-shape A's hinge) → `cursor-click-ripple` + `press-release-spring` (or `physics-press-reaction` for a weightier press)
- clicked element clears/vanishes; panel state A → B on the return leg → `scale-swap-transition` / `card-morph-anchor`
- to-do strikethrough draw; row hover highlight → `css-marker-patterns` (strike-through) · `asr-keyword-glow` (accent glow on the hovered/selected row)
- bar-to-line chart morph → composite, decomposes cleanly: `stat-bars-and-fills` (bars `scaleY` → baseline) + `svg-path-draw` (node-dotted line draws left→right) at the same timeline position — no single rule names the coordinated chart-type morph, but no new rule needed
- commit row slide-in; reaction pill appears; receipt rows expand row-by-row → `spring-pop-entrance` (single arrivals) / `waterfall-entry` (the row-by-row cascade)
- dropdown self-expands, displacing the field below (094) → `anchored-layout-expand` (the masked edge-anchored expansion of the dropdown body — never tween `height`) + `reactive-displacement` (the expansion tween drives the sibling's displacement)
- focus-ring travel between fields (094: a thin outline fades in on `From`, then sweeps down onto `Amount`) → `ai-tracking-box` restyled as a plain outline (offsets baked at setup; size morphed via scale, never width/height)
- 3D card subtle float; near-imperceptible tilt/scale drift on holds → `sine-wave-loop` (+ `multi-phase-camera`'s drift for the camera-side micro-motion; the _tilt_ component of the drift belongs to `3d-camera-flight`)
- camera drift toward a button; slow subtle zoom-ins riding a hold → `multi-phase-camera` (steady-push mode, tiny spread)

**camera grammar** (the defining layer — this blueprint IS its camera): every leg is a tween on ONE camera state (`viewport-change`'s single `.world` wrapper / `cam` object), sequenced by `multi-phase-camera`, aimed by `coordinate-target-zoom`. Legs must be _motivated_: sub-shape A moves because an action fired (click → swoop to the consequence); sub-shape B moves because the next reveal demands it (dive → focus → reposition → final dive). Vary the leg verbs — a journey of four identical pushes reads as a slideshow. Ease law: hard `out`-family on dives and landings (`power4.out` — violent arrival, sharp settle), `power2.inOut` on repositioning legs; spring/back easing on a camera feels wrong (per `multi-phase-camera`). Sub-shape B layers `3d-camera-flight`'s perspective wrapper under the same single-state discipline.

**Seek-safety (non-negotiable for this much camera):** the entire journey — every leg, every blur envelope, every DoF pull — lives on the ONE paused GSAP timeline, so any frame seek reproduces the exact mid-leg camera pose. One camera state object, transform composed in a single writer (`applyCamera()`), no CSS `transition` anywhere near the wrapper, blur via proxy-tweened attributes / `--dof` vars (both seek-safe), and ending mid-dive is fine — a seek to the last frame just lands mid-tween. Per-leg targets are measured ONCE at setup (after `fonts.ready`) and baked; never `getBoundingClientRect` in `onUpdate`.

**Overflow (required for a clean `check`):** a traveling camera deliberately moves world content past the frame edges on every leg. Keep `overflow: hidden` on the scene root AND mark the moving `.world` wrapper with `data-layout-allow-overflow` — otherwise `check` reports `text_box_overflow` / `container_overflow` for every panel the journey leaves behind (see the same note on `device-surface-showcase`).

## Selected motion rule: 3d-camera-flight

---
name: 3d-camera-flight
description: Perspective camera FLIGHT through a 3D-laid-out world — one static perspective stage + preserve-3d world whose pose (translate3d + rotateX/rotateY) is tweened leg-by-leg from a single camera state object. Dive into an angled grid, tilt-to-flatten pull-back, continuous flight past standing cards, decelerate-into-focus. Hard power4.out landings, power2.inOut repositioning; DoF via depth-of-field-blur on non-focal planes.
metadata:
  tags: camera, 3d, flight, perspective, preserve-3d, rotateX, rotateY, translateZ, dive, tilt, world, cinematic
---

# 3D Camera Flight

Every other camera rule here is a **2D camera**: [viewport-change.md](viewport-change.md), [multi-phase-camera.md](multi-phase-camera.md), and [coordinate-target-zoom.md](coordinate-target-zoom.md) simulate the camera with `scale` + `translate` on a flat wrapper — the lens never tilts, and there is no depth axis to travel along. [3d-page-scroll.md](3d-page-scroll.md) is a **static tilt**: one angle held all scene while content scrolls inside. This rule is the missing camera that _flies_ — dives into an angled grid, pulls back while the world rotates flat, streaks past standing cards, decelerates out of a blur into focus: a **perspective camera traveling with `rotateX` / `rotateY` / `translateZ` through a 3D-laid-out world**, under the same single-camera discipline as `viewport-change`: **one perspective wrapper, one camera state object, one transform writer**, every leg a sequenced tween on that state.

## How It Works

Five layers, strictly separated:

1. **The lens** — `perspective: PERSPECTIVE_PX` on a static `.stage` wrapper. Set once, never tweened, never moved. Changing perspective mid-shot reads as the lens itself warping, not the camera moving.
2. **The world** — a `.world` div with `transform-style: preserve-3d`, laid out at final 1× size: the ground surface (grid, form card, canvas) as flat DOM, optional **props** (a giant date number, a floating label) at static `translateZ(PROP_Z)` offsets so travel produces parallax, and **standing cards** counter-tilted to face the camera at their landing pose.
3. **The camera state** — a single object `cam = { x, y, z, rx, ry }` (the world's pose), written to `world.style.transform` by ONE function, `applyCamera()`, in a **fixed order**: `translate3d(x, y, z) rotateX(rx) rotateY(ry)`. With translate composed _outside_ the rotations, `x`/`y`/`z` always move the world along **screen axes** no matter how it is currently tilted — pan is always sideways, `z` is always toward/away from the lens. Put the rotations first and every leg's numbers change meaning as the tilt changes.
4. **The legs** — sequential tweens on `cam`, each one camera move: dive in (`power4.out` — violent arrival, sharp settle), tilt-to-flatten pull-back (`power2.inOut` — a repositioning, no slam), lateral flight, final dive. Camera intent inverts onto the world pose exactly as in `viewport-change`: camera flies **in** → world `z` **increases** (comes toward the lens); camera pans **right** → world `x` **negative**; camera tilts **down** over the surface → world `rx` **positive** (far edge tips away).
5. **Depth cues** — DoF via [depth-of-field-blur.md](depth-of-field-blur.md) `--dof` tweens on the **non-focal planes** (cards, props — leaf elements, never the world itself), and velocity blur on travel legs via [motion-blur-streak.md](motion-blur-streak.md)'s Camera-Travel Carve-Out — applied to the **stage**, never the world (a `filter` on a `preserve-3d` element flattens it).

Landing poses are **authored, not derived**: set `cam` to candidate values at design time, call `applyCamera()`, screenshot, adjust, bake the numbers as constants. There is no counter-translate formula to get wrong in 3D — the pose IS the design decision. Never measure per-frame (`getBoundingClientRect` in `onUpdate` desyncs under parallel frame sampling), and don't hand-derive 3D projections — your eye at design time beats the math.

## Recipe

```html
<!-- The lens: static perspective, nothing else. -->
<div class="stage">
  <!-- The world: preserve-3d, laid out at final 1× size; the camera flies by
       tweening THIS element's pose. Travel legs push content past the frame
       edges by design — hence data-layout-allow-overflow. -->
  <div class="world" id="world" data-layout-allow-overflow>
    <div class="surface">
      <div class="grid">{gridCells}</div>
      <div class="card layer" id="card-a" data-depth="0">{cardA}</div>
      <div class="card layer" id="card-b" data-depth="0">{cardB}</div>
    </div>
    <!-- Foreground props float at PROP_Z for parallax; they blur and fly past,
         never carry a read. -->
    <div class="prop layer" data-depth="2" style="--px: PROP_X; --py: PROP_Y">{propGlyph}</div>
  </div>
</div>
```

```css
.scene {
  overflow: hidden; /* travel legs push world content past the frame on purpose */
  background: {sceneBg}; /* the void the flight exposes at frame edges — must be a
     designed surface (deep brand color / soft gradient), never default white */
}
.stage {
  position: absolute;
  inset: 0;
  perspective: PERSPECTIVE_PX; /* THE LENS — static, never tweened */
  /* travel blur (motion-blur-streak carve-out) attaches HERE, never on .world */
}
.world {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  will-change: transform;
  /* keep CLEAN: no filter, opacity < 1, overflow, clip-path, or mask — each
     flattens preserve-3d. Background on .scene, blur on .stage or leaf cards. */
}
.surface {
  position: absolute;
  inset: WORLD_INSET; /* world runs larger than the frame so travel has runway */
  transform-style: preserve-3d;
}
.prop {
  position: absolute;
  left: var(--px);
  top: var(--py);
  /* static world-space pose; counter-tilt faces the camera at the dive pose */
  transform: translateZ(PROP_Z) rotateX(PROP_COUNTER_TILT);
}
.layer {
  --dof: 0px; /* DoF channel per depth-of-field-blur — leaf elements only */
  filter: blur(var(--dof));
  will-change: filter;
}
```

```js
const world = document.getElementById("world");

// Camera state — the ONLY source of truth for the world's pose. Every leg
// tweens this object; nothing else touches world.style.transform.
const cam = { x: 0, y: 0, z: WIDE_Z, rx: 0, ry: 0 };

function applyCamera() {
  // Fixed order: translate OUTSIDE the rotations → x/y/z stay screen-aligned
  // at any tilt. Changing this order changes what every baked pose means.
  world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, ${cam.z}px) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg)`;
}
applyCamera(); // seed frame 0 so a seek to t=0 renders the opening pose

// ── LEG 1 — DIVE IN: wide establishing pose → angled close-up on card A.
// fromTo states the opening pose explicitly; power4.out = violent arrival,
// razor-sharp settle. Travel blur: motion-blur-streak carve-out on .stage.
const DIVE_POSE = { x: DIVE_X, y: DIVE_Y, z: DIVE_Z, rx: DIVE_RX, ry: DIVE_RY };
tl.fromTo(
  cam,
  { x: 0, y: 0, z: WIDE_Z, rx: 0, ry: 0 },
  { ...DIVE_POSE, duration: DIVE_DUR, ease: "power4.out", onUpdate: applyCamera },
  DIVE_AT,
);
// Decelerate-INTO-FOCUS: non-focal planes' --dof ramps to BLUR_PER_DEPTH × data-depth
// on the SAME window/ease (depth-of-field-blur focal pull); card A stays at --dof: 0.

// ── LEG 2 — TILT-TO-FLATTEN PULL-BACK: every channel returns to neutral on ONE
// power2.inOut tween — a reposition, not a slam. DoF releases on the same window
// so the flat overview arrives fully crisp.
const FLAT_POSE = { x: 0, y: 0, z: 0, rx: 0, ry: 0 };
tl.to(
  cam,
  { ...FLAT_POSE, duration: FLATTEN_DUR, ease: "power2.inOut", onUpdate: applyCamera },
  FLATTEN_AT,
);
tl.to(".layer", { "--dof": "0px", duration: FLATTEN_DUR, ease: "power2.inOut" }, FLATTEN_AT);

// ── LEG 3 — LATERAL FLIGHT: screen-aligned pan (translate is outside the
// rotations, so x is a pure sideways move even mid-tilt).
tl.to(cam, { x: PAN_X, duration: PAN_DUR, ease: "power2.inOut", onUpdate: applyCamera }, PAN_AT);

// ── LEG 4 — FINAL DIVE onto card B: same grammar as leg 1; card A racks OUT of
// focus as card B racks in (depth-of-field-blur rack, shared window).
const LAND_POSE = { x: LAND_X, y: LAND_Y, z: LAND_Z, rx: LAND_RX, ry: LAND_RY };
tl.to(
  cam,
  { ...LAND_POSE, duration: LAND_DUR, ease: "power4.out", onUpdate: applyCamera },
  LAND_AT,
);
tl.to("#card-a", { "--dof": `${MAX_BLUR}px`, duration: LAND_DUR, ease: "power4.out" }, LAND_AT);
tl.to("#card-b", { "--dof": "0px", duration: LAND_DUR, ease: "power4.out" }, LAND_AT);
// Landing dwell: ≥1 s of stillness on card B — unless ending held mid-dive.
```

## Variations

- **Continuous flight past standing cards** — one long leg instead of dive-land-dive: sustained `z` + `x` travel (2–4 s, `power2.inOut` / `power1.inOut` near-constant cruise) through a corridor of cards and props at staggered `PROP_Z`. Parallax does the work — near props streak past while far ones crawl. Keep ONE plane sharp at a time via staggered `--dof` tweens. Props crossing the camera plane (`cam.z + PROP_Z` approaching `PERSPECTIVE_PX`) blow up to fill the frame and vanish — that IS the fly-past; never let a focal card cross it.
- **End held mid-dive** — give the final leg a window that overruns the composition (`LAND_AT + LAND_DUR > data-duration`); the last frame holds mid-tween — still traveling, blur not fully resolved. Seek-safe by construction (a seek to the last frame lands at a deterministic pose); don't fake it with a shorter leg plus a manual offset. Use when the brief wants momentum at the cut, not rest.
- **Whip sweep** — the heavily motion-blurred lateral whip that resolves into the next region: leg 3 driven by [nudge-curve.md](nudge-curve.md)'s three-phase chain (burst-dominant) on `cam.x`, with [motion-blur-streak.md](motion-blur-streak.md)'s Camera-Travel Carve-Out on the same window — blur ramps through the ramp-in, rides the burst at peak, resolves to 0 through the `power4.out` tail. Full recipe in that carve-out.
- **Hold drift (the hold never dies)** — between legs, fold `multi-phase-camera`-style micro-drift **through the same writer**: a driver tween writes tiny `dx`/`dy`/`drx` into a `drift` object and `applyCamera()` composes `cam.x + drift.dx`, `cam.rx + drift.drx`, etc. Never let drift write `world.style.transform` itself — two writers on one transform is the classic camera bug. Amplitudes per `multi-phase-camera` (2–8 px), rotation drift ≤ 0.5°.

## Values

| token                     | range                                                            | notes                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PERSPECTIVE_PX            | 700–1400 px (moving cam best 800–1200)                           | smaller = wilder foreshortening, more violent dives; larger = near-orthographic, the flight flattens                                                                                      |
| WORLD_INSET               | −50% to −150% per side                                           | world 2–4× the frame so lateral legs have runway                                                                                                                                          |
| PROP_Z                    | 80–300 px                                                        | higher = stronger parallax, earlier fly-past                                                                                                                                              |
| PROP_COUNTER_TILT         | ≈ `-LAND_RX` of the leg that reads it                            | author by eye and bake                                                                                                                                                                    |
| DIVE_RX / LAND_RX         | 30–55°                                                           | "angled grid" starts ~30°; \|rx\| ≤ ~65°, \|ry\| ≤ ~30° — beyond that flat planes go edge-on, text unreadable                                                                             |
| DIVE_Z / LAND_Z           | 300–700 px at PERSPECTIVE_PX ≈ 1000                              | **Z budget**: `cam.z + PROP_Z ≤ ~0.6 × PERSPECTIVE_PX` for readable content — near the perspective distance, scale blows toward infinity and elements invert/vanish past the camera plane |
| WIDE_Z                    | −100 to −400 px                                                  | negative z = world pushed away = camera wide                                                                                                                                              |
| DIVE_X/Y, LAND_X/Y        | read off a screenshot at the baked tilt                          | screen-aligned (translate outside rotations)                                                                                                                                              |
| DIVE_DUR / LAND_DUR       | 0.6–1.0 s                                                        | commitment, not a polite zoom; under 0.5 s reads as a cut                                                                                                                                 |
| FLATTEN_DUR               | 1.2–2.0 s                                                        | the repositioning is the breath between dives                                                                                                                                             |
| PAN_DUR                   | 0.8–1.5 s plain; 0.5–0.8 s whip                                  |                                                                                                                                                                                           |
| Ease law                  | `power4.out` dives/landings; `power2.inOut` repositioning/cruise | spring/back on a camera reads as the world wobbling on a string; four identical pushes read as a slideshow — vary the leg verbs                                                           |
| Holds                     | ≥ 0.8 s between legs; final dwell ≥ 1 s                          | unless ending held mid-dive                                                                                                                                                               |
| BLUR_PER_DEPTH / MAX_BLUR | per [depth-of-field-blur.md](depth-of-field-blur.md)             | 3–6 px per step, terminal 8–24 px, leaf elements only; travel-blur peak per [motion-blur-streak.md](motion-blur-streak.md) (~18–20 px full-frame, on `.stage`)                            |

## Critical Constraints

- **One lens, one state, one writer** — `perspective` on the static `.stage` only (never on `.world`, never tweened, never a second perspective wrapper inside); every leg tweens the single `cam` object; only `applyCamera()` writes the transform — drift folds into the same writer via additive state. Two writers (or a second transform sneaking in via CSS) is the classic broken-camera bug, five channels of it here.
- **Fixed transform order: translate outside the rotations** — `translate3d(x,y,z) rotateX() rotateY()`. Reorder it and every pose you authored silently means something else.
- **Keep the world CLEAN** — `filter`, `opacity < 1`, `overflow` other than `visible`, `clip-path`, or `mask` on `.world` (or any intermediate wrapper) forces used `transform-style: flat` and collapses every `translateZ` in the scene. Travel blur goes on `.stage`; DoF on leaf cards; fades on children; background on `.scene`. `transform-style: preserve-3d` on `.world` and every intermediate wrapper between it and 3D-positioned children.
- **Camera intent inverts onto the world** — fly in = world z up, pan right = world x negative, tilt down = world rx positive. Same sign law as `viewport-change`, two more axes to get right.
- **Poses authored and baked** — never measured per-frame, never hand-derived projections.
- **First leg is a `fromTo`** AND `applyCamera()` runs once at setup — a seek to t=0 must render the exact establishing pose.
- **Z budget** — only sacrificial props may cross the camera plane.
- **Reads happen at landings** — angled, blurred, flying text is texture; anything the viewer must read gets a near-flat pose or a sharp held close-up ≥ 1 s (the tilt-to-flatten leg exists to hand the surface over for reading).
- **`overflow: hidden` on `.scene` + `data-layout-allow-overflow` on `.world`** — travel legs deliberately push panels past the frame; without the pairing, `check` reports `container_overflow` for every region the flight leaves behind.

## See also

[viewport-change.md](viewport-change.md) (2D counterpart, same single-writer law — right when the shot never tilts) · [multi-phase-camera.md](multi-phase-camera.md) (leg-sequencing grammar + hold micro-drift) · [coordinate-target-zoom.md](coordinate-target-zoom.md) (aim math for a flat-hold zoom while `rx`/`ry` are 0) · [depth-of-field-blur.md](depth-of-field-blur.md) (non-focal defocus / racks) · [motion-blur-streak.md](motion-blur-streak.md) (travel blur on the stage) · [nudge-curve.md](nudge-curve.md) (whip-sweep burst tuning) · [3d-page-scroll.md](3d-page-scroll.md) (static-tilt cousin — camera should NOT travel) · [orbit-3d-entry.md](orbit-3d-entry.md) / [depth-scatter-assemble.md](depth-scatter-assemble.md) (elements moving under a still camera — the inverse; don't run both on one beat). Capability background: `../techniques.md` § CSS 3D Transforms.

## Selected motion rule: depth-of-field-blur

---
name: depth-of-field-blur
description: Selective-focus rack-focus — pull the eye to a focal element by GSAP-tweening filter blur (+ a small opacity dim) on the off-focus layers while the focal one stays sharp. Drive blur via a `--dof` CSS var; finite tweens, no CSS transition, deterministic. Covers single focal pull, rack-focus between two depth planes, and blur-the-cluster-while-pushing-in.
metadata:
  tags: blur, focus, depth-of-field, dof, rack-focus, filter, dim, spotlight, cinematic, push-in
---

# Depth-of-Field Blur (Selective Focus / Rack Focus)

Pulls the eye to one focal element by **blurring** (and slightly **dimming**) everything around it while the focal layer stays sharp — the camera's depth-of-field falling off the background, or a rack-focus shifting which plane is in focus. `filter` and `opacity` are paint-only, so both tween seek-safe. This is the backing rule for the focus-falloff beat the blueprints reach for: outer nodes blurring during a push-in (`constellation-hub`), rack-focus across a parallax card stack (`cursor-ui-demo`), non-highlighted cards dimming to spotlight a hero metric (`dataviz-countup`).

## How It Works

Every layer carries a `--dof` custom property (px of blur), read by `filter: blur(var(--dof))`, plus its own `opacity`. A GSAP tween advances each layer's `--dof` from `0` to its target blur and its opacity from `1` to a dim level over the focus-shift window. The focal layer's `--dof` stays `0`. Per-layer targets derive from `data-depth` / index, so the falloff is identical on every seek.

Three mechanics, same primitive:

1. **Focal pull** — one window: off-focus layers go sharp(0) → blurred while the focal layer holds at 0. The eye is pulled to the only thing still crisp.
2. **Rack focus** — two adjacent windows on the same property: plane A's blur ramps 0 → max at the same position plane B's ramps max → 0. State continuity matters exactly as in `press-release-spring`: A's resting blur after the rack must equal what B held before it — author both as tweens on the same `--dof` at the same position so the hand-off is seamless.
3. **Blur-the-cluster-while-pushing-in** — the DoF tween runs at the SAME timeline position as a camera push-in (`multi-phase-camera` / `coordinate-target-zoom`): "the world recedes" and "we push in" read as one move.

## Recipe

```html
<div class="world" id="world">
  <!-- Focal layer — stays sharp -->
  <div class="layer focal" id="focal">{FocalLabel}</div>
  <!-- Off-focus layers — blur + dim; data-depth orders near→far -->
  <div class="layer ctx" data-depth="1">{Context A}</div>
  <div class="layer ctx" data-depth="2">{Context B}</div>
  <div class="layer ctx" data-depth="3">{Context C}</div>
</div>
```

```css
.world {
  /* single wrapper so a concurrent camera push-in transforms everything
     together; DoF is independent of the camera */
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
}
.layer {
  --dof: 0px; /* px of blur; filter reads it — starts sharp */
  filter: blur(var(--dof));
  will-change: filter; /* promotes the layer so per-frame re-rasterization is cheap */
}
.focal {
  z-index: 2; /* sharp layer must sit ABOVE the blurred ones, or its crisp
     edges read as bleeding into the haze */
}
.ctx {
  z-index: 1;
}
```

```js
// Mechanic 1 — FOCAL PULL. Blur scales with data-depth so far planes blur
// more than near ones; the focal layer (--dof: 0, opacity: 1) is untouched.
gsap.utils.toArray(".ctx").forEach((el) => {
  const depth = Number(el.dataset.depth) || 1;
  tl.to(
    el,
    {
      "--dof": `${BLUR_PER_DEPTH * depth}px`,
      opacity: DIM_LEVEL, // dim, not gone
      duration: FOCUS_DUR,
      ease: "power2.inOut",
    },
    FOCUS_START,
  );
});
```

## Variations

- **Rack focus between two depth planes** — `gsap.set` plane B pre-blurred BEFORE the rack (no pop), then two tweens sharing `RACK_START` + `RACK_DUR`: A → `MAX_BLUR` + `DIM_LEVEL`, B → `0px` + `1`. Shared window makes them cross at the midpoint.
- **Blur the cluster while pushing in** — run the focal-pull tweens at the same position + duration as a camera tween on `#world` (`scale/x/y`, `power2.inOut`). Camera transforms the world; DoF tweens the layers — independent property channels, no conflict.
- **Spotlight a hero metric in a card grid** — `gsap.utils.toArray(".card:not(.hero)")` all defocus (`GRID_BLUR` + `DIM_LEVEL`) on one shared window; heroes are skipped.
- **Refocus / settle** — if the beat resolves back to "everything visible" (or hands off to a crossfade needing a clean outgoing frame), ramp all `--dof` back to `0px` / opacity 1 over the tail (`REFOCUS_START + REFOCUS_DUR ≤ DURATION`).
- **Bounded focus-breathing on the focal layer (optional)** — a finite `ease:"none"` driver writes `Math.max(0, Math.sin(p)) * FOCAL_BREATH_PX` into the focal `--dof` during a hold. Keep it ≤ ~0.6px or it reads as "still focusing"; default to omitting it.

## Values

| token                 | range                                  | notes                                                                                                    |
| --------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| BLUR_PER_DEPTH        | 3–6 px per depth step                  | a 3-plane stack tops out ~9–18 px; low = gentle DoF, high = tilt-shift falloff                           |
| MAX_BLUR              | 8 soft → 16 default → 24 heavy px      | terminal blur for a fully-defocused plane; above ~24 px on a big surface, shrink/group the layer instead |
| GRID_BLUR             | 6–12 px                                | pushes cards back without losing the grid's shape                                                        |
| DIM_LEVEL             | 0.4 strong → 0.55 default → 0.7 subtle | rarely below 0.35 — fully dark reads as "removed," not "defocused"                                       |
| FOCUS_DUR             | 0.5–1.2 s                              | a rack/pull is a deliberate move, not a snap; shorter = snap focus, longer = languid                     |
| RACK_START / RACK_DUR | shared by both planes                  | `gsap.set` the pre-blurred plane BEFORE `RACK_START`                                                     |
| FOCAL_BREATH_PX       | ≤ 0.6 px, period 2–3 s                 | barely-there nicety                                                                                      |
| FOCAL vs CTX sizing   | context smaller / grouped              | small context layers let a modest radius still read as "out of focus" — and blur cheaply                 |

Tokens: dark `{bgGradient}` so the sharp focal layer reads as lit and forward; heavy display `{font}` weight — blurred copy needs it to stay shape-legible.

## Critical Constraints

- **Tween the `--dof` variable on the timeline** — reading `filter: blur(var(--dof))` keeps the blur on the HF seek clock.
- **Blur the SMALL / GROUPED layers, not the giant one.** Filter cost scales with radius × pixel area; a 20 px blur on a full-frame background is the worst case. Keep per-layer radius ≤ ~24 px on large surfaces and lean on the `opacity` **dim** to do the push-back work — dim + modest blur reads more like real DoF than blur cranked to the max.
- **`will-change: filter`** on every layer whose blur animates (drop it after settle if the layer also does heavy transform work).
- **Focal layer stays genuinely sharp** — `--dof: 0`, untouched (or breathing ≤ 0.6 px). Any visible blur on the focal element kills the "this is the thing" read.
- **State continuity on a rack** — the outgoing plane starts at the blur the incoming plane was holding, and vice-versa; adjacent tweens on the same `--dof` at the same position.
- **DoF is independent of the camera** — blur the layers, transform `.world` for the push-in; don't fake DoF with the camera transform or vice-versa.
- **Settle sharp before a hand-off** — refocus to `--dof: 0` in the tail if the next beat is a crossfade/push; handing off mid-defocus reads as "the render glitched."
- **Sharp focal layer above blurred layers** (`z-index`).

## See also

[multi-phase-camera.md](multi-phase-camera.md) (the push-in this rule's falloff accompanies) · [coordinate-target-zoom.md](coordinate-target-zoom.md) (zoom onto the focal core — the `constellation-hub` hook) · [viewport-change.md](viewport-change.md) (pan + rack across a tilted card plane) · [counting-dynamic-scale.md](counting-dynamic-scale.md) (hero metric counts up sharp — the `dataviz-countup` spotlight) · [3d-page-scroll.md](3d-page-scroll.md) (the parallax stack to rack between) · [sine-wave-loop.md](sine-wave-loop.md) (post-rack idle; keep both amplitudes tiny).
