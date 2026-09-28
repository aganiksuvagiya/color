# Frame packet: 03-combination

## Project inputs

- Project: /Users/user/Documents/Aganik_pro/color/videos/hueflow-one-color
- Design tokens: /Users/user/Documents/Aganik_pro/color/videos/hueflow-one-color/frame.md
- RULES_DIR: /Users/user/.claude/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 3 — Combination

- scene: A color-harmony panel; the cursor drags along a hue wheel and complementary, analogous and triadic pairings re-form live beside it
- voiceover: ""
- on_screen: "Explore every combination."
- duration: 7s
- poster: 5s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/03-combination.html
- type: feature_showcase
- persuasion: Feature-to-benefit translation
- beat: exploration + control
- asset_candidates:

- blueprint: panel-edit-live-sync (Adapt)
- focal: the Color Harmony hue wheel coupled to the live palette cards (built, no asset)
- roles: none — rebuilt HueFlow UI
- sfx: none

Adapt: keep the live-sync couple signature (dragging the wheel handle recolors the palette in the same beat); the control is a hue wheel with harmony markers, the target is a set of palette cards.
Scene 1 (0.0–1.4s): split 45/55. Left: a glass "Color Harmony" panel with a large conic hue wheel (soft pastel-to-vivid ring), a white handle sitting on the orange hue, and three mode chips below — Complementary (selected, #E8531F outline), Analogous, Triadic. Right: two tall rounded swatch cards — #E8531F and its complement #1D4E89 — with hex labels. Cards enter with a short rise (power3); nothing else on screen yet.
Scene 2 (1.4–3.4s): the cursor grabs the handle and drags it a quarter-turn around the wheel (`cursor-drag`); a thin line and a second marker opposite rotate with it, and the right cards recolor live in the same beat, hex labels updating (`control-target-sync`). The handle returns to orange.
Scene 3 (3.4–5.2s): the cursor clicks "Analogous" — markers regroup to three neighbors and the right side re-forms into five warm analogous swatches (#E8531F #F28C28 #F2B134 #D8342A #B8321F); on the next pulse it clicks "Triadic" — three markers at 120° and three cards (#E8531F #2E9E5B #5B4BDB). Each change is one clean live beat (`control-target-sync`), chips highlight in #E8531F.
Scene 4 (5.2–7.0s): "Explore every combination." reveals across the top band, left-aligned over the panel (`dynamic-content-sequencing`); everything holds still.

narrativeRole: Palette → Combination. Shows HueFlow's Color Harmony ("complementary, analogous, and triadic relationships", from the site) as live exploration, not a static list.
keyMessage: Every color has partners, and HueFlow finds them.

## Selected blueprint: panel-edit-live-sync

# panel-edit-live-sync — Panel Edit, Live Sync

**intent**: A bipartite stage — an inspector/editor **panel bound to a target surface** — where a cursor (or text caret) continuously manipulates a control (value scrub, unit/codegen dropdown pick, knob or easing-handle drag, inline retype) and the coupled surface updates **live, in the same beat**: the page button rotates as the value scrubs, preview icons resize per keystroke, the hex readout mirrors every hover, the code block converts on the pick. The motion IS the causality — one gesture, two surfaces changing in the same frame. The camera's job is co-visibility of the couple, not a chase.

**provenance** (7 mined Key_Feature goldens across 4 products, both dialects — three sync modes):

- _Write-sync (control → target)_ — the anchor mode: a visual-editor panel scrubs rotation/margin/padding while the live page button rotates and shifts in the same beat (plus unit + font-weight dropdown picks); an inline `className` retype in a glowing code callout resizes the preview icons per keystroke (caret-as-actor, push-in/pull-back roundtrip that must keep BOTH surfaces in frame); a motion editor drags a knob along a dotted motion path and bends easing handles into an S-curve, paying off with a big zoom-out where the finished toggle PERFORMS the edited ease (deferred payoff).
- _Read-sync (target → panel mirror)_: clicking a page button pops a toolbar → "Copy code" → the code editor fills with the element's CSS under one continuous slow zoom-out; hovering palette swatches live-updates a footer hex readout while the grid scrolls.
- _Self-conversion (panel is both control and target)_: unit dropdown conversions inside a 3D-tilted spacing panel snap-convert values in place (rem→px→%, `0,375 rem` → `6 px` → `4,871 %`); a codegen dropdown picks SwiftUI and the CSS block crossfades into SwiftUI under a rapid punch-in.

> **Concentration caveat**: 4 of 7 members are one video (CSS Scan Pro 2.0). The COUPLING engine is independently attested by 3 more products across 3 more videos and both dialects (Figma Dev Mode, Figma motion editor, bolt.new), each on a different surface pair — page+inspector, canvas+timeline+easing panel, IDE code+app preview — so the shape is real, not one film's house style. What IS CSS-Scan-Pro house style (marked optional below): the dark-slate capability title-card prelude, the oversized black cursor with white outline, the green success-checkmark flip, flash tooltips. Trigger is product-conditional: reach for this shape when the feature itself is live editing/inspection.

**roles served**

- Key_Feature (from `panel-edit-live-sync`, all 7 cases): one capability demonstrated as 2–4 edit beats on a single bound element — each beat a continuous manipulation the coupled surface answers in real time, resolving on the last edit held, a zoom-out to the finished product performing the edit, or a callout landing on the result. Three sub-shapes fold in:
  - **(A) write-sync** — cursor/caret edits a control; the TARGET transforms live (rotate/shift/stretch/resize/re-animate).
  - **(B) read-sync** — cursor selects/hovers the target; the PANEL readout mirrors live (CSS streams in, hex footer updates).
  - **(C) self-conversion** — the edit transforms the panel's own readout (units snap-convert, CSS crossfades to SwiftUI).

**duration**: 5.3–11.9s (read-sync hover demos shortest ~5.3s; multi-beat scrub/edit runs 8.7–11.9s)

**shot structure** (a `[target surface — webpage / design canvas / IDE + live preview]` sharing the frame with a `[bound panel — floating inspector / docked code panel / timeline + easing editor]`; a `[cursor or caret]` is the actor; every beat pairs ONE manipulation gesture with a SIMULTANEOUS response on the coupled surface; selection chrome declares which element is bound; camera ranges locked → active but always preserves the couple)

- **Scene 0 (optional, 0.0–2.0s) — capability title card.** Solid dark `[slate/charcoal]` card; a single white line names the capability (`"Edit CSS visually"`, `"Auto measurement units conversion"`, `"Check color palettes"`) — fades/drifts in, holds, then a HARD CUT or a fast motion-blurred zoom-out that settles the stage. (CSS-Scan-Pro-house-leaning; 071/017/080 open cold on the stage, 071 instead springs a giant lowercase `[verb word]` over the preview.)

- **Scene 1 (~1–3s) — the couple establishes.** The `[target surface]` arrives with the `[bound panel]` docked, floating in subtle 3D tilt, or SLIDING IN from an edge. Selection chrome pops on to declare the binding: `[bounding box + corner handles / red dashed inspection guides / redline measurement chips popping sequentially / green class-name header]`. The cursor enters and glides to the first control.

- **Scene 2..N (~2s each) — edit beats, gesture + mirror in the same frame (the engine).** Each beat is ONE continuous manipulation and its live answer:
  - _Variant — write-sync (A)_: the cursor CLICK-AND-DRAGS a numeric field (value counts up/down: `0°→-10°`, `0→38 px`) while the target `[button/element]` rotates/shifts/stretches in real time; OR drags a `[knob along a dotted motion path / easing handle bending the curve, coords readout updating]`; OR a caret INLINE-RETYPES a value (`1xl→4xl→2xl`) inside a `[glowing magnifier callout]` while `[preview elements]` resize per keystroke. A flash `[tooltip]` may name the gesture.
  - _Variant — read-sync (B)_: the cursor CLICKS/HOVERS the target element — a `[floating toolbar]` springs up above it, a menu pick fires (`Copy code` → icon flips to a green checkmark) and the `[code editor]` fills with streaming CSS; or hovered `[swatches]` outline and the `[footer hex]` updates instantly per hover as the grid scrolls.
  - _Variant — self-conversion (C)_: the cursor clicks a unit/codegen `[dropdown]` — it opens with hover-highlighted rows + checkmark — and on the pick the readout SNAP-CONVERTS in place (`rem→px`, value recalculates) or the whole `[code block]` crossfades to the new language, heading flipping (`Layout`→`HStack`).
  - Camera per beat: LOCKED wide holding both surfaces; or a PUNCH-IN to the acting surface (panel scroll reveals the next section) — but during a write-sync edit both gesture and mirror stay co-visible (071's law: the push-in never crops the preview out).

- **Scene N (final beat → end) — the edit proves out, HOLD.** Resolution diverges:
  - _Variant — last edit held_: the final pick lands (`100 - Thin` selected, `4,871 %` applied) and the state simply HOLDS — never end on the tooltip with the dropdown unopened.
  - _Variant — payoff zoom-out_: a big zoom-out reveals the finished product PERFORMING the edited parameter — the toggle slides with the new ease inside the full phone mockup, confetti drifting; or the pull-back returns to the identical full framing while a `[terminal]` appends an hmr line.
  - _Variant — callout lands_: a large `[arrow callout]` slides in pointing at the result / the export menu rests open under the cursor; frame drifts subtly outward.

**signature move**: the **live-sync couple** — a scrubbed/typed/dragged control and its bound surface changing simultaneously, in-frame together, every edit beat.

**motion vocabulary**: click-and-drag value scrubbing with live target sync (rotate / shift / stretch); per-keystroke live preview resize; inline retype with backspace + blinking caret; instant value snap-conversion; live hex/readout mirror on hover; unit/codegen dropdown with hover-highlight rows + checkmark, instant open/close; font-weight/dropdown row pick; knob drag along a dotted motion path with waypoints; easing-handle drag bending the curve (coords readout updating); playhead scrub; redline measurement chips popping sequentially; bounding box + corner handles; red dashed inspection guides; floating toolbar springs up above the selected element; code panel slides in from an edge; in-panel scroll to a new section; swatch-grid scroll; syntax-highlighted code streams/pastes in; code crossfade (CSS→SwiftUI) with heading flip; glowing magnifier callout over a code token; icon flips to green success checkmark; flash tooltip naming the gesture; oversized black cursor with white outline; grab-cursor drag; dark title-card prelude + hard cut; fast motion-blurred zoom-out settle; ONE continuous slow zoom-out spanning a demo shot; eased push-in → hold → eased pull-back roundtrip; quick punch-in to panel/timeline/code; subtle 3D tilt drift/parallax on a floating panel; big zoom-out to the product payoff; result element re-animates with the edited ease; confetti drift; terminal log append; large arrow callout slide-in; static hold.

**rule mapping**

- cursor glide to a control, presses, click feedback → `cursor-click-ripple`
- cursor state flips pointer↔grab over a scrubbable field / draggable handle → `context-sensitive-cursor`
- scrubbed numeric readout counts up/down under the drag → `counting-dynamic-scale`
- **the live-sync couple itself** (control gesture drives a second element's property in the same beat) → `control-target-sync` (concurrent tweens at the SAME timeline position — readout tween + target transform tween sharing one label)
- inline retype with backspace, typos, holds / keystroke thresholds → `discrete-text-sequence` (+ `context-sensitive-cursor` for the caret blink)
- per-keystroke preview resize → `discrete-text-sequence` (keystroke state thresholds) + `control-target-sync` (the coupled scale steps)
- instant value snap-conversion / hex readout swap / heading flip (`Layout`→`HStack`) / status text → `discrete-text-sequence`
- syntax-highlighted code streaming/pasting in, terminal log append → `discrete-text-sequence` (bulk additions are explicitly in-scope)
- dropdown/menu pops open; floating toolbar springs up; tooltip flash; redline chips pop sequentially (staggered, ≤500ms) → `spring-pop-entrance`
- dropdown row hover-highlight stepping and pick sequencing / which edit beat shows what → `dynamic-content-sequencing`
- dashed inspection guides / selection outline draw on → `svg-path-draw`; dotted motion path with waypoints → `svg-path-draw` (the path display)
- knob TRAVEL along the motion path → path following — see `hyperframes-keyframes` (paths)
- easing-handle drag bending the curve (SVG `d` interpolation) → SVG path morph — see `hyperframes-keyframes` (morph; `svg-path-draw` only draws strokes, it cannot morph a path); coords readout beside it → `discrete-text-sequence`
- glowing magnifier callout over a code token (incl. the live enlarged duplicate of a UI token) → composition: `ambient-glow-bloom` (the glow) + `spring-pop-entrance` (the callout pop)
- code panel slides in from an edge / panel docks → `card-morph-anchor` / `scale-swap-transition` (per cursor-ui-demo precedent for panel slide-in)
- code block crossfade CSS→SwiftUI; success-icon flip to green checkmark → `scale-swap-transition` (state swap at the same anchor)
- in-panel scroll / swatch-grid scroll (masked internal translate) → `gsap-effects`; on a 3D-tilted panel → `3d-page-scroll` (tilted plane w/ internal scroll)
- subtle 3D tilt drift/parallax on the floating panel; continuous micro-drift on holds → `multi-phase-camera` (micro-drift phase)
- punch-in to panel/timeline/code and settle → `coordinate-target-zoom` + `multi-phase-camera`
- eased push-in → hold → eased pull-back roundtrip (co-visibility preserved) → `multi-phase-camera` (pull-back / focus / push sequencing)
- ONE continuous slow zoom-out spanning the demo shot; big zoom-out to the product payoff → `viewport-change` (single `.world` composite transform)
- fast motion-blurred zoom-out settle transition → `motion-blur-streak` + `viewport-change`
- result element re-animates with the edited ease (toggle slides with the new S-curve) → `gsap-effects` (custom-ease tween on the payoff element)
- confetti drift on the payoff → `particle-burst` (deterministic confetti) + `sine-wave-loop` (bounded drift)
- large arrow callout slide-in + hold → `gsap-effects` (single slide tween)
- dark title-card prelude (capability line fades/drifts in, hard cut out) → cross-blueprint: `titlecard-reveal` territory; the drift/fade itself → `gsap-effects` — EXIT-N/A as a mapped rule here
- hard cuts between title and demo; final static hold → EXIT-N/A (transition registry / no rule needed)

**camera modifier**: The camera law is the INVERSE of cursor-ui-demo's chase: it serves **co-visibility of the couple**. Three attested postures — (1) LOCKED: fixed framing for the whole demo, panel + target both in frame, all motion element-level (CSS_39.0, CSS_102.8 after settle); (2) ONE CONTINUOUS MOVE: a single slow zoom-out (or drift) spanning the entire demo shot while edits fire inside it (CSS_10.9, CSS_63.5's tilt-drift) → `viewport-change`; (3) PUNCH-AND-RETURN: eased push-in onto the acting surface, tight hold through the edit, eased pull-back to the identical opening framing (071_bolt, 080_figma, 017_figma) → `multi-phase-camera` + `coordinate-target-zoom` — with the hard constraint that during a write-sync edit the mirror surface is never cropped out. If the camera is chasing the cursor target-to-target with per-beat state swaps, you're in `cursor-ui-demo`, not here.

## Selected motion rule: control-target-sync

---
name: control-target-sync
description: The live-sync couple — a scrubbed/typed/picked control drives a second element's property in the SAME beat. Readout tween + target transform tween share one timeline label (continuous scrub), or one threshold state array carries both sides (discrete steps). Makes "change this, watch it change" read as causality.
metadata:
  tags: control, scrub, live-sync, mirror, panel, editor, couple, readout, ui
---

# Control-Target Sync

THE live-editing move: an inspector/editor control is manipulated — a value scrubbed, a field retyped, a dropdown picked — and a **bound second element answers in the same frame**. The button rotates WHILE the rotation value scrubs; icons resize PER KEYSTROKE. The persuasion is causality — one gesture, two surfaces changing together — and this rule is the coupling contract that produces it.

Nearest precedent is [reactive-displacement.md](reactive-displacement.md): that rule also derives two elements' motion from one source, but it is **collision physics** — an entering intruder displaces an exiting victim, once, as a transition, and the victim leaves. This rule is a **live editing mirror**: the control is manipulated repeatedly across several beats, the target answers every time, and both sides hold the stage throughout. The numeric readout rides [counting-dynamic-scale.md](counting-dynamic-scale.md)'s proxy pattern; discrete steps ride [discrete-text-sequence.md](discrete-text-sequence.md)'s threshold pattern — what this rule adds is the law that binds either of them to the target.

## How It Works

An **edit beat** is a set of concurrent tweens at ONE timeline label: `tl.addLabel("edit1", …)`, then the **readout tween** (numeric proxy + `onUpdate` writing `textContent` only) and the **target transform tween** (`rotation` / `x` / `y` / `scale` to the same endpoint), both placed at the label with the same **duration** and **ease**. The two motions are two projections of one gesture — value at 40% ⇒ target at 40%, on every frame, under any seek. That mathematical lockstep reads as "the panel is editing the page," not "two animations happen to overlap."

For **discrete edits** (per-keystroke retypes, dropdown picks, unit snaps) the couple steps instead of glides: a single threshold state array carries BOTH sides — each state holds the readout text AND the target's property value — and one driver applies whichever state is active. Both sides read from the same state object, so they cannot desync.

Chain 2–4 edit beats with short holds between, and end on a **landed** edit — the last value applied and holding, never a tooltip with the dropdown unopened.

## Recipe

```html
<!-- Bipartite by construction: target surface + inspector panel share the frame.
     Every scrubbed readout gets `font-variant-numeric: tabular-nums` and a fixed
     min-width (≥ the longest value) or the panel edge jitters as digits change. -->
<div class="target-surface">
  <div class="target-button" id="target-button">{buttonLabel}</div>
  <div class="preview-row">
    <div class="preview-icon">{iconA}</div>
    …
  </div>
</div>
<div class="panel">
  <div class="field-row">
    <span>Rotation</span><span class="field-value" id="rotation-readout">0°</span>
  </div>
  <div class="field-row">
    <span>Class</span><span class="field-value mono" id="class-readout">text-1xl</span>
  </div>
</div>
```

```js
// ---- Continuous couple: ONE label; both tweens share duration AND ease ----
tl.addLabel("edit1", EDIT1_AT);
const rotState = { v: 0 };
const rotReadout = document.getElementById("rotation-readout");
tl.to(
  rotState,
  {
    v: ROT_TARGET,
    duration: SCRUB_DUR,
    ease: SCRUB_EASE,
    onUpdate: () => {
      rotReadout.textContent = `${Math.round(rotState.v)}°`;
    },
  },
  "edit1",
);
tl.to(
  "#target-button",
  { rotation: ROT_TARGET, duration: SCRUB_DUR, ease: SCRUB_EASE },
  "edit1", // same label — the mirror answers in the same frame
);

// ---- Discrete couple: ONE state array carries BOTH sides ----
const STEPS = [
  { t: 0.0, text: "text-1xl", scale: 1.0 }, // must equal the initial state
  { t: 0.4, text: "text-4xl", scale: 1.9 },
  { t: 1.0, text: "text-xl", scale: 0.85 }, // backspace
  { t: 1.35, text: "text-2xl", scale: 1.3 }, // lands
];
const stepAt = (time) => [...STEPS].reverse().find((s) => time >= s.t) ?? STEPS[0];

tl.addLabel("edit3", EDIT3_AT);
const classReadout = document.getElementById("class-readout");
const stepDriver = { t: 0 };
let lastStep = null;
tl.to(
  stepDriver,
  {
    t: STEPS_TOTAL,
    duration: STEPS_TOTAL,
    ease: "none",
    onUpdate: () => {
      const s = stepAt(stepDriver.t);
      if (s !== lastStep) {
        classReadout.textContent = s.text; // control steps
        gsap.set(".preview-icon", { scale: s.scale }); // target steps — same state object
        lastStep = s;
      }
    },
  },
  "edit3",
);
```

## Variations

- **Dropdown pick → instant conversion (self-conversion)** — the pick converts the panel's own readout in place (`tl.set("#padding-readout", { textContent: "6 px" }, "pick")`); control and target collapse into one element. Compose the dropdown from neighbors: menu pops via [spring-pop-entrance.md](spring-pop-entrance.md), row hover-stepping via [dynamic-content-sequencing.md](dynamic-content-sequencing.md). The conversion must be an INSTANT snap — tweening between unit strings reads as broken, and instantness is the feature being sold.
- **Easing-handle drag → target re-animates (deferred mirror)** — the edit authors a _behavior_, so the mirror is a **replay**, not a concurrent transform: beat 1 drags the handle (handle tween + coords readout), then at a later label the target performs its motion with the newly-authored curve (`tl.fromTo("#toggle-knob", { x: 0 }, { x: KNOB_TRAVEL, duration: REPLAY_DUR, ease: AUTHORED_EASE }, "replay")`), often under a zoom-out ([viewport-change.md](viewport-change.md)). The one sanctioned case where the response is not in the gesture's beat; the replay must still be unmistakably the edited parameter.
- **Read-sync mirror (reverse direction)** — the gesture happens ON the target (hovering swatches, selecting an element) and the PANEL readout is the bound side. Same discrete contract — one state array of `{ t, hoverTarget, readout }` drives both the highlight and the text.
- **Color couple** — the readout counts (`0 → 80`) while the target's `backgroundColor` tweens between two palette stops at the same label. Keep it two fixed stops (GSAP interpolates); never derive per-frame hex strings by hand.

## Values

| token                | range                           | notes                                                                                                                                 |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| SCRUB_DUR            | 0.8–1.6 s                       | the viewer must see BOTH sides move — under ~0.6 s the mirror registers subconsciously at best                                        |
| SCRUB_EASE           | `power1.inOut` / `power2.inOut` | shared verbatim by both tweens. Never `back.out` / `elastic.out` — an overshooting value reads as a broken hinge; the readout is data |
| edit endpoints       | visible but plausible           | −10° tilt, 38 px shift, 1xl → 4xl → 2xl; a 2° rotation doesn't demo anything                                                          |
| HOLD_BETWEEN         | 0.3–0.8 s                       | each landed value gets a breath; below 0.3 s the beats smear into one gesture                                                         |
| BEAT_COUNT           | 2–4                             | one edit is a moment, not a demo; past 4 the shot reads as a settings tour                                                            |
| STEP gaps (discrete) | 0.15–0.5 s                      | keystroke pacing per discrete-text-sequence; first state must equal the on-load state                                                 |
| VALUE_MIN_WIDTH      | ≥ longest value's width         | without it the panel edge jitters as digit counts change                                                                              |

## Critical Constraints

- **One label, one gesture** — readout tween and target tween share position, duration, AND ease; never sequence readout-then-target, and never stagger the target behind the readout even by 0.1 s — a delayed response reads as an animation following an edit, not a bound surface. A mismatched ease desyncs the mirror mid-tween even when endpoints agree.
- **Discrete steps share one state object** — both sides read the same array entry, so desync is impossible by construction; first entry mirrors the initial DOM state.
- **The readout is data** — no overshoot, no bounce on the settle; the target may carry the gesture's ease but lands exactly on the edited value.
- **Co-visibility is load-bearing** — control and target share the frame for every edit beat; a camera move must never crop the mirror out (punch-and-return around the beats, not through them).
- **`tabular-nums` + fixed `min-width`** on every scrubbed readout; `onUpdate` is O(1) — text writes only, discrete drivers guard writes with a last-state check.
- **End on a landed edit** — the final beat resolves with the value applied and holding (or the deferred-mirror replay); never mid-gesture or on an unopened menu.
- **The gesture's actor is a separate rule** — cursor glide, grab-cursor flip, and click feedback come from the cursor rules; this rule owns only the couple.

## See also

`cursor-click-ripple` / `context-sensitive-cursor` (the hand performing the gesture) · `counting-dynamic-scale` (the readout half alone, when there is no bound target) · `discrete-text-sequence` (retypes inside the control field) · `spring-pop-entrance` (dropdowns/chrome around the couple) · `multi-phase-camera` (punch-and-return framing) · `chart-scrub-readout` (the sibling READ direction — a scrub interrogates a chart instead of editing a target).

## Selected motion rule: cursor-drag

---
name: cursor-drag
description: The drag verb for driven cursors — grab, lift, travel, drop-snap. A semi-transparent ghost chip rides the cursor in exact lockstep and snaps into a placed field with selection chrome; variants cover fill-handle auto-fill down rows, corner-handle proportional resize (uniform scale only), and grab-lift-reorder with the neighbor springing into the vacated slot.
metadata:
  tags: cursor, drag, drop, ghost, handle, resize, reorder, snap, interaction, mouse
---

# Cursor Drag

> Cursor look, sizing, off-screen entry, and tip-targeting defer to the **oversized-cursor house doctrine** — this rule owns the drag _mechanics_ only.

THE held-journey verb: the cursor presses down on a payload, carries it, and releases it somewhere else. The load-bearing law is **lockstep**: the cursor tip and the payload's grip point move as one rigid object for the entire travel — a one-frame drift reads as the chip slipping out of the hand. Distinct from [cursor-click-ripple.md](cursor-click-ripple.md) (move → point event at a single location): a drag is a _sustained hold across space_, and the payload is the co-star. Reuse [physics-press-reaction.md](physics-press-reaction.md) for the grab's press dip (cursor + payload compress together); for N simultaneous actors see [multi-cursor-choreography.md](multi-cursor-choreography.md) — this rule is one protagonist performing a workflow beat.

## How It Works

Five beats: **approach** (cursor glides to the source chip, `power2.inOut`) → **grab** (press dip on cursor + chip together; on the down-beat `tl.set` reveals the **ghost** — a pre-rendered semi-transparent clone at the chip's position — plus a small lift `fromTo` to `GHOST_LIFT_SCALE` with a soft shadow, `immediateRender: false`) → **travel** (cursor and ghost move as **matched tweens**) → **drop** (ghost off, placed field pops in with selection chrome) → **adjust / exit** (optional handle resize, then the cursor glides to the next target).

Matched tweens = same timeline position, same duration, same ease, over straight lines — that keeps the pair rigidly locked at every eased midpoint. A shared `[cursor, ghost]` targets array only works when both need identical deltas; with different start points, use two matched `fromTo`s. Rule-specific corollary of the contract's absolute-values law: a relative `+=` travel on either partner breaks the lockstep under seek.

Measure chip and slot rects at build time — a 4 px miss on the drop line reads as a failed drag (montage: authored CSS-matched constants, per the contract). `TIP_OFFSET_X/Y` aligns the cursor's TIP (not its bbox) with the grip point.

## Recipe

```html
<!-- Ghost = clone of the chip AT the chip's position, in DOM from t=0, opacity: 0.
     Same silhouette as the chip — or hand and payload read as different objects.
     Placed field sits at the slot's final position, opacity: 0, with a .select-box
     and four corner .handle elements inside. -->
<div class="tray-chip" id="source-chip"><span class="grip-dots">⋮⋮</span> {chipLabel}</div>
<div class="drag-ghost" id="drag-ghost"><span class="grip-dots">⋮⋮</span> {chipLabel}</div>
<div class="placed-field" id="placed-field">
  {placedLabel}
  <!-- + selection chrome -->
</div>
<div class="cursor" id="cursor"><!-- arrow SVG --></div>
```

```js
const chipRect = document.querySelector("#source-chip").getBoundingClientRect();
const slotRect = document.querySelector("#placed-field").getBoundingClientRect();
const TRAVEL_DX = slotRect.left - chipRect.left;
const TRAVEL_DY = slotRect.top - chipRect.top;

// Travel — MATCHED tweens: same position, duration, ease; absolute endpoints.
tl.fromTo(
  "#drag-ghost",
  { x: 0, y: 0 },
  { x: TRAVEL_DX, y: TRAVEL_DY, duration: TRAVEL_DUR, ease: TRAVEL_EASE, immediateRender: false },
  TRAVEL_AT,
);
tl.fromTo(
  "#cursor",
  { x: chipRect.left + TIP_OFFSET_X, y: chipRect.top + TIP_OFFSET_Y },
  {
    x: chipRect.left + TIP_OFFSET_X + TRAVEL_DX,
    y: chipRect.top + TIP_OFFSET_Y + TRAVEL_DY,
    duration: TRAVEL_DUR,
    ease: TRAVEL_EASE,
    immediateRender: false,
  },
  TRAVEL_AT,
);

// Drop is a state commit: ghost off + placed field on at the SAME position.
tl.set("#drag-ghost", { opacity: 0 }, DROP_AT);
tl.fromTo(
  "#placed-field",
  { opacity: 0, scale: 0.92 },
  { opacity: 1, scale: 1, duration: SNAP_DUR, ease: "power3.out" },
  DROP_AT,
);
tl.fromTo(
  [".select-box", ".handle"],
  { opacity: 0, scale: 0.6 },
  { opacity: 1, scale: 1, duration: 0.18, ease: "power3.out", stagger: 0.02 },
  DROP_AT + SNAP_DUR * 0.4,
);
```

## Variations

- **Corner-handle proportional resize** — width/height tweens are forbidden, so the resize renders as uniform `scale` with `transform-origin` at the **opposite (anchor) corner**: the anchor stays put, the dragged corner travels. The corner's position is _linear in scale_ (`corner = anchor + scale × (corner₀ − anchor)`), so a cursor tween to the corner's end position with the **same duration and ease** stays glued to the handle exactly:

  ```js
  tl.to(
    "#placed-field",
    { scale: RESIZE_SCALE, transformOrigin: "0% 0%", duration: RESIZE_DUR, ease: "power2.inOut" },
    RESIZE_AT,
  );
  tl.to(
    "#cursor",
    { x: CORNER_END_X, y: CORNER_END_Y, duration: RESIZE_DUR, ease: "power2.inOut" },
    RESIZE_AT,
  );
  ```

  One-axis resizes are `scaleX`/`scaleY` on the same origin logic — stretch-safe boxes only; route to [anchored-layout-expand.md](anchored-layout-expand.md)'s counter-scale when content must stay undistorted.

- **Fill-handle auto-fill** — the spreadsheet verb: the cursor drags a cell's fill handle straight down on a `"none"` (linear) ease; each row commits via a snapped `tl.set` (never a fade) keyed to the handle's linear progress, so the fill edge and cursor never separate:

  ```js
  tl.fromTo(
    "#cursor",
    { y: HANDLE_Y },
    { y: HANDLE_Y + FILL_DIST, duration: FILL_DUR, ease: "none", immediateRender: false },
    FILL_AT,
  );
  gsap.utils.toArray(".fill-cell").forEach((cell, i) => {
    tl.set(cell, { opacity: 1 }, FILL_AT + ((i + 1) / CELL_COUNT) * FILL_DUR);
  });
  ```

- **Grab-lift-reorder** — lift = `y: -LIFT_RISE` + `rotation: LIFT_TILT` (sign from index parity) + shadow on; as the carried item crosses the neighbor's midpoint, the **neighbor springs into the vacated slot** (a `fromTo` translate at `TRAVEL_AT + TRAVEL_DUR * 0.5`, `power3.out`); drop = rotation → 0, shadow off, settle. The neighbor's counter-move sells the reorder — without it the list reads as broken.
- **Component grab between surfaces** — a chip dragged mockup-to-mockup, swapping identity on drop (`tl.set` recolor + label swap at `DROP_AT`, tiny settle pop); the drop chrome is just the identity swap, no handles.

## Values

| token                       | range                                        | notes                                                                                                                          |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| approach / press            | per cursor-click-ripple                      | approach 0.4–1.0 s; press-dip halves 0.06–0.12 s; cursor compresses more than the payload                                      |
| GHOST_OPACITY               | 0.5–0.75                                     | below 0.5 vanishes on busy documents; ~1.0 reads as the original moving — then hide `#source-chip` at the grab                 |
| GHOST_LIFT_SCALE / LIFT_DUR | 1.03–1.08 / 0.12–0.2 s                       | the shadow is the "off the surface" cue; the scale is garnish                                                                  |
| TRAVEL_DUR / TRAVEL_EASE    | 0.6–1.2 s / `power2.inOut`                   | a considered drag decelerates into the slot; `power1.inOut` for a calmer carry. `TRAVEL_AT ≥ GRAB_AT + 2×PRESS_DUR + LIFT_DUR` |
| DROP_AT / SNAP_DUR          | `TRAVEL_AT + TRAVEL_DUR` exactly / 0.2–0.3 s | a gap between arrival and snap reads as the drop failing                                                                       |
| RESIZE_SCALE / RESIZE_DUR   | by story (≈0.4–0.6) / 0.6–1.0 s              | `power2.inOut`                                                                                                                 |
| LIFT_RISE / LIFT_TILT       | 6–12 px / 2–4°                               | reorder pickup; index-derived tilt sign                                                                                        |

## Critical Constraints

- **Lockstep is the law** — matched tweens over straight lines (or one shared tween when deltas are identical); verify at the eased midpoint, not just the endpoints. Absolute endpoints on both partners.
- **The ghost is pre-rendered** — a DOM clone at the source position from t=0, `opacity: 0`, revealed by `tl.set`; placed field and chrome likewise. Never cloned at runtime, never conditionally rendered.
- **Grab has weight** — press dip + lift shadow before any travel; a chip departing without a press reads as telekinesis.
- **Drop is a state commit** — ghost off and placed field on at the same timeline position, `DROP_AT = TRAVEL_AT + TRAVEL_DUR`.
- **Resizes are uniform `scale`, origin at the anchor corner** — never width/height; one-axis stretch on stretch-safe boxes only.
- **Linear ease on the fill-handle travel** — the evenly-spaced `tl.set` reveals depend on it; an eased handle bunches them at the ends.
- **One verb per beat** — drag, then resize, then exit; overlapping a travel with a resize turns choreography into mush.
- **`pointer-events: none`** on cursor, ghost, and chrome.

## See also

`physics-press-reaction` (the grab's press dip) · `cursor-click-ripple` (a plain click before/after) · `spring-pop-entrance` (the placed field's snap-settle) · `waterfall-entry` (kinetic fill cascade) · `multi-phase-camera` (the zoom-breathing carrier shot golden drag demos ride) · `multi-cursor-choreography` (this verb inside an ensemble).

## Selected motion rule: dynamic-content-sequencing

---
name: dynamic-content-sequencing
description: Auto-calculate timeline start/end times from content length + per-item duration config — longer content gets more screen time without hardcoded numbers.
metadata:
  tags: timeline, sequencing, dynamic, duration, content-aware, utility
---

# Dynamic Content Sequencing

A utility pattern (not a motion rule in itself) for scenes that show a SEQUENCE of items (cards, phrases, stats): each item's duration is computed from its content length + per-item config, and the sequencer assigns absolute start/end times automatically — no hardcoded offsets per item. Distinct from [discrete-text-sequence](discrete-text-sequence.md) (one text element changing states) — this rule swaps between distinct content blocks.

## How It Works

A content array of `{ eyebrow, title, body, speedFactor, hold }` entries is reduced once at build time into a flat `TIMELINE` of `{ …entry, start, end }` — duration per entry is `BASE_DURATION + body.length × SEC_PER_CHAR + hold`, so longer text earns more reading time. A single linear driver's `onUpdate` reverse-searches the active entry and swaps the DOM **only on transitions** (a `lastTitle` guard — per-frame `textContent` writes flicker in render); an optional progress bar fills 0→100% across the whole run.

## Recipe

```html
<!-- inside a standard scene clip (hyperframes-core) -->
<div class="display">
  <div class="eyebrow" id="eyebrow"></div>
  <div class="title" id="title"></div>
  <div class="body" id="body"></div>
  <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
</div>
```

```css
.body {
  min-height: 160px; /* reserve space — content height varies; without this, layout jumps */
}
.progress-fill {
  height: 100%;
  width: 0%;
}
```

```js
// N entries, each with its own pacing (optionally a speedFactor multiplier);
// the final entry uses a larger hold (closing beat).
const CONTENT = [
  { eyebrow: "{eyebrow1}", title: "{title1}", body: "{body1}", hold: HOLD_MID },
  // …
  { eyebrow: "{eyebrowN}", title: "{titleN}", body: "{bodyN}", hold: HOLD_FINAL },
];

// Pre-compute absolute start/end ONCE — never in onUpdate.
let cumulative = 0;
const TIMELINE = CONTENT.map((entry) => {
  const dur = BASE_DURATION + entry.body.length * SEC_PER_CHAR + entry.hold;
  const start = cumulative;
  cumulative += dur;
  return { ...entry, start, end: cumulative };
});

function entryAt(time) {
  for (let i = TIMELINE.length - 1; i >= 0; i--) {
    if (time >= TIMELINE[i].start) return TIMELINE[i];
  }
  return TIMELINE[0];
}

const eyebrowEl = document.getElementById("eyebrow");
const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");
const progressEl = document.getElementById("progress-fill");

const TOTAL_DURATION = cumulative + TAIL_PAD;
const driver = { t: 0 };
let lastTitle = "";

tl.to(
  driver,
  {
    t: TOTAL_DURATION,
    duration: TOTAL_DURATION,
    ease: "none",
    onUpdate: () => {
      const entry = entryAt(driver.t);
      // Swap content only on transitions — no per-frame DOM thrash
      if (entry.title !== lastTitle) {
        eyebrowEl.textContent = entry.eyebrow;
        titleEl.textContent = entry.title;
        bodyEl.textContent = entry.body;
        lastTitle = entry.title;
      }
      progressEl.style.width = `${(driver.t / TOTAL_DURATION) * 100}%`;
    },
  },
  0,
);
```

## Variations

- **Crossfade between items** — return BOTH adjacent entries during an overlap window (`time ≥ e.start − overlap && time ≤ e.end + overlap`, overlap ≈ 0.3s) and render them with opacities computed from distance to the boundary.
- **Per-item motion variation** — map an `entry.style` key to an existing rule per chapter (e.g. `3d-text-depth-layers` → `hacker-flip-3d` → `counting-dynamic-scale`); the sequencer only orchestrates timing.
- **Auto-extend composition duration** — you can set `data-duration` from the computed `TOTAL_DURATION` in script, but HF reads `data-duration` at composition load and setting it after init may not take effect — author the duration manually from a rough total.

### Accelerating cadence (geometric hold decay)

For rhetorical escalation — "everyone says…", a roll-call, a praise flurry — the beat grid itself accelerates: early entries hold ~1s (read speed), then windows shrink geometrically into a ~0.15–0.3s flurry, braking on an emphasis state before the resolve. The acceleration is pre-computed into the same flat `TIMELINE` — still content-driven, still deterministic, no speed-up tween anywhere:

```js
// Geometric decay on the hold, clamped at a flurry floor; the brake state holds longest.
const HOLDS = CONTENT.map((entry, i) => Math.max(FLURRY_FLOOR, HOLD_START * Math.pow(DECAY, i)));
HOLDS[CONTENT.length - 1] = HOLD_FINAL;

let cumulative = 0;
const TIMELINE = CONTENT.map((entry, i) => {
  // Past ~0.5s states are glanced as motion texture, not read —
  // drop the per-char term or you never reach flurry speed.
  const readable = HOLDS[i] >= READ_THRESHOLD;
  const dur = HOLDS[i] + (readable ? entry.body.length * SEC_PER_CHAR : 0);
  const start = cumulative;
  cumulative += dur;
  return { ...entry, start, end: cumulative };
});
```

Worked example — **praise-chip flurry**: ~16 short quotes hard-cut through a chip beside a pinned wordmark. First 3 states at `HOLD_START = 1.0` (each reads fully); `DECAY = 0.8` shrinks every following window until `FLURRY_FLOOR = 0.2` catches it (≈12 states over ~2.5s — a churn of acclaim, individually glanced); the longest phrase takes `HOLD_FINAL ≈ 1.6` as the brake before the closing lockup.

Values: `HOLD_START` 0.8–1.2s; `DECAY` 0.75–0.88 (higher = longer runway before the flurry bites); `FLURRY_FLOOR` 0.15–0.3s (below ~0.15s swaps strobe); `READ_THRESHOLD` ~0.5s; brake ≥ 4× the floor or the stop doesn't register as a beat. The 3–6 entry guidance relaxes here — 12–18 states are legal precisely because flurry states aren't individually read. The hard-cut discipline (`lastTitle` guard, instant swaps) is what lets 0.2s states render clean.

## Values

| token         | range                 | notes                                                                                                                 |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| BASE_DURATION | 0.6–1.5s              | minimum per entry regardless of length — even one-word entries get read time                                          |
| SEC_PER_CHAR  | 0.03–0.06 s/char      | ≈17–33 chars/sec; uniform across the sequence so the pace reads as one engine; lean high for wide-character languages |
| HOLD_MID      | 0.5–1.0s              | dwell on a non-final entry; `< HOLD_FINAL`                                                                            |
| HOLD_FINAL    | 1.0–2.0s              | climax dwell — must exceed HOLD_MID by a clear margin so the close reads as a beat                                    |
| SPEED_FACTOR  | 0.5–2.0 (default 1.0) | per-entry only; if every entry shares a factor, fold it into SEC_PER_CHAR                                             |
| TAIL_PAD      | 0.0–1.0s              | quiet beat after the last entry; prefer 0 when the next composition owns the breath                                   |
| CONTENT N     | 3–6 entries           | <3 isn't a sequence; >6 drags (accelerating cadence relaxes this — see above)                                         |

Reference: `../examples/messaging-multi-phrase.html`.

## Critical Constraints

- **Pre-compute the TIMELINE once at build** — never recompute in `onUpdate`; the reverse search over the flat array is the whole per-frame cost.
- **DOM swap only on entry transition** (`lastTitle`/key guard) — per-frame `textContent` assignment flickers in HF render.
- **`min-height` on the body element** — without reservation, downstream elements (progress bar, brand) jitter as content height varies.
- **Sequential only** — for parallel tracks use a different reduction.
- **Titles fit one line at the chosen size; bodies fit inside `min-height` after wrapping.**

## See also

`discrete-text-sequence` (per-entry typewriter on the body) · `context-sensitive-cursor` (cursor color per chapter) · `vertical-spring-ticker` (animated word swap instead of hard cut) · `scale-swap-transition` (visual morph between entries).
