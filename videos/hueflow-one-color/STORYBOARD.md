---
format: 1920x1080
duration: 30s
message: "One color. Infinite possibilities."
arc: Transformation cascade (Feature-Benefit Cascade) — One color → Palette → Combination → Discover → System → Design → Statement → Brand
audience: designers, brand builders, and product teams who work with color
mode: autonomous
music: premium cinematic ambient product film — soft felt piano and airy synth pads, gentle pulse, slow elegant build to a warm resolve, Apple keynote feel
---

## Video direction

- **palette system** (from frame.md): canvas `bg` #FAF7F2 on every frame; UI panels are `glass-card` (white 62% + blur + white hairline, 24px radius, `shadow-float`) or `surface` #FFFFFF cards with `shadow-soft`; text `text` #1C1712, secondary `text-muted` #766F66; chrome accent (cursor, selected chip, CTA, focus rings) is `primary` #E8531F only. Palette swatches are CONTENT and may be any vibrant hue. The hero palette used in frames 2, 5, 6 and 8 is: #E8531F (burnt orange) · #F4A261 (apricot) · #FCE0B8 (cream, from the site tokens) · #2A9D8F (teal) · #264653 (deep teal-navy). Complementary partner in frame 3: #1D4E89 (site token blue).
- **type**: Avenir Next only, by frame.md roles. Statement lines use `h1` 700 at -0.03em, centered; UI labels use `body`/`tag`; hex codes use Avenir Next 500 with tabular numerals, uppercase.
- **glass**: hand-authored per frame.md `glass-card` — the catalog glass blocks (`liquid-glass-*`) sit on aurora shaders, which this brief forbids.
- **light & depth**: soft top-left key light — every floating element carries diffuse low-opacity shadows; one warm ambient glow bloom behind each frame's hero (peak ≤ 0.35, colored by the hero's own hue); never hard offset shadows, never dark vignettes.
- **cursor**: install the registry component `simulated-cursor` (catalog match for "animated cursor click demo") and restyle it to this spec — the "designer" is a custom cursor only — a white arrow with a thin #1C1712 outline and soft shadow, with a small #E8531F dot at its tip on press. It always arrives on decelerating paths and aims a few px off center.
- **motion grammar + reveal model**: smooth long-tail settles (`power3` default, `expo.out` for fast arrivals); no bounce, no overshoot, no elastic. There is no voiceover, so each reveal lands on the music's soft pulses (about every 6.5s, at ~0, 6, 13, 20, 26.5, 33 and 39.5s of the video) and on the on-screen line's own words. Never front-load: at t=0 only the carry-over element from the previous frame is on screen; everything else waits for its cue in the back half.
- **camera**: slow and sophisticated — gentle push-ins in the FRONT half of a shot, slow lateral glides (frame 4), and one decelerating zoom-out (frame 6). No back-half drifting pans or pushes.
- **rhythm / held frames**: frames 1, 7 and 8 are the quiet, held beats (breath, statement, lockup); frames 2–6 carry the interaction and transformation energy. Frame 5 ends on a deliberate still hold before the design reveal.
- **aliveness during holds**: stillness first; at most a subtle low-amplitude jitter (`sine-wave-loop`) on one hero, or one single-pass sheen (`ambient-glow-bloom`). No breathing loops.
- **negative list**: no slideshow (front-load then freeze); no screensaver (many elements floating independently); no bokeh or purple-blue "AI" gradients; no dark backgrounds; no browser chrome, scrollbars or real OS cursor; no stock people; no invented metrics (the only number is the real 16.6:1 contrast of #1C1712 on #FAF7F2); no captions (music-only film); no SFX (music-only brief); nothing important below 83% of the frame height.

## Frame 1 — One color

- scene: A single glowing orange tile blooms alone on a warm off-white void
- voiceover: "It all starts with one color."
- on_screen: "It all starts with one color."
- duration: 3.774s
- poster: 4s
- transition_in: cut
- status: animated
- src: compositions/frames/01-one-color.html
- type: hook
- persuasion: Visual spectacle / curiosity gap
- beat: curiosity + calm
- asset_candidates:

- blueprint: cta-morph-press (Adapt)
- focal: the #E8531F color tile (built, no asset)
- roles: none — typography and a single built tile
- sfx: none
- handoff_out: color tile — center x 960, y 430; size 240×240; radius 36px; fill #E8531F; ambient glow opacity 0.3; scale 1; opacity 1; motion: at rest (no velocity)

Adapt: keep the Hook widget-morph signature (a lone widget on a flat field transforms in place, then yields to a typed line); the widget is a single color tile, there is no cursor, and the "payload" is the tile coming to light.
Scene 1 (0.0–1.8s): empty warm #FAF7F2 field, dead silent. A tiny #E8531F point appears at center and swells into a rounded square tile via a smooth long-tail settle (`spring-pop-entrance`, no overshoot) as a warm orange glow blooms behind it (`ambient-glow-bloom`). Centered, the tile ~12% of frame width; 3 depth layers (canvas, glow, tile + contact shadow).
Scene 2 (1.8–3.6s): the tile morphs in place — its corners soften (paint-only border-radius tween) and a glassy sheen travels once across its face (single-pass sheen, `ambient-glow-bloom`); a gentle push-in on the whole stage runs underneath (one smooth scale tween on a stage wrapper, front half only). "#E8531F" fades up beneath the tile in small hex type.
Scene 3 (3.6–6.0s): "It starts with one color." reveals word by word below the hex line (`dynamic-content-sequencing`, blur-to-sharp, power3), centered, `h2` weight. The camera stops; the frame holds still; the tile keeps only a barely visible jitter (`sine-wave-loop`, low amplitude). The hex and the line stay; the crossfade into frame 2 dissolves them while the tile holds its exact position.

narrativeRole: Cold open. Silence, light, and one vivid color (HueFlow's own #E8531F) create intrigue before anything is explained.
keyMessage: Everything begins with a single color.

## Frame 2 — Palette

- scene: The tile splits and expands into a five-swatch harmonious palette inside a glass Palette Generator card
- voiceover: "Grow it into a palette."
- on_screen: "Grow it into a palette."
- duration: 3.252s
- poster: 4s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-palette.html
- type: product_intro
- persuasion: Show-don't-tell proof
- beat: delight + clarity
- asset_candidates:

- blueprint: cursor-ui-demo (Adapt — Product_Intro)
- focal: the glass Palette Generator card with the 5-swatch palette (built, no asset)
- roles: none — rebuilt HueFlow UI
- sfx: none
- handoff_in: color tile — center x 960, y 430; size 240×240; radius 36px; fill #E8531F; ambient glow opacity 0.3; scale 1; opacity 1; motion: at rest

Adapt: keep the cursor-led first touch on a real surface; the surface is a rebuilt HueFlow Palette Generator glass card, and the payoff is the palette unfolding from the tile.
Scene 1 (0.0–1.4s): the tile holds at center exactly as handed in; a glass card gently materializes around it (fade + slight scale-up from 0.97) — header "Palette Generator" left, "#E8531F · 5 colors" (site copy) muted beneath, a pill button "Generate" in #E8531F on the right. The custom cursor glides in from lower right on a decelerating path. Centered card ~55% of frame width; layered depth (canvas, glow, glass card, tile, cursor).
Scene 2 (1.4–3.2s): the cursor presses "Generate" (`cursor-click-ripple`, soft press); in the same beat four sibling swatches unfold outward from behind the tile, two to each side, while the tile holds the centre slot — a row of five rounded swatches #264653 · #2A9D8F · #E8531F · #F4A261 · #FCE0B8 (`center-outward-expansion`, power3). Each swatch's hex label rises in beneath it one after another (group stagger ≤ 0.5s).
Scene 3 (3.2–6.0s): "Grow it into a palette." reveals above the card, centered (`dynamic-content-sequencing`). The cursor drifts onto the teal swatch — that swatch lifts slightly and a dark pill badge (black at 55%) with "#2A9D8F" fades in on it (the site's badge; swatches are separate tiles here, so no flex-widen). Hold still; the cursor rests.

narrativeRole: The first transformation (One color → Palette) and the first look at HueFlow's Palette Generator ("#E8531F · 5 colors", from the site). The designer is present only as a cursor.
keyMessage: One color becomes a whole palette in a click.

## Frame 3 — Combination

- scene: A color-harmony panel; the cursor drags along a hue wheel and complementary, analogous and triadic pairings re-form live beside it
- voiceover: "Explore every combination."
- on_screen: "Explore every combination."
- duration: 2.991s
- poster: 5s
- transition_in: push-slide LEFT
- status: animated
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

## Frame 4 — Discover

- scene: A slow horizontal camera glide across a floating wall of exploration cards: mood palettes (Minimal, Warm, Cool, Luxury, Nature, Pastel, Bold, Trending), gradients, and a color picker readout
- voiceover: "Palettes. Gradients. Trends."
- on_screen: "Palettes. Gradients. Trends."
- duration: 3.618s
- poster: 3s
- transition_in: push-slide LEFT
- status: animated
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

## Frame 5 — System

- scene: The palette snaps into a labeled design-token system — Primary, Secondary, Accent, Background, Surface, Text, Success, Warning, Error — with hex codes and an AAA contrast badge
- voiceover: "Then build an entire design system."
- on_screen: "Build an entire system."
- duration: 3.983s
- poster: 5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-system.html
- type: feature_showcase
- persuasion: Rule of three → value stacking (color → roles → tokens)
- beat: confidence + control
- asset_candidates:

- blueprint: grid-card-assemble (Reproduce — Key_Feature grid)
- focal: the nine-tile design-token grid (built, no asset)
- roles: none — rebuilt HueFlow design-system section
- sfx: none

Scene 1 (0.0–1.3s): the hero palette strip (#E8531F #F4A261 #FCE0B8 #2A9D8F #264653) sits slim and centered near the top of the frame, alone on the canvas.
Scene 2 (1.3–4.0s): nine white token tiles assemble into a 3×3 grid beneath it in a staggered cascade (`center-outward-expansion`-style short rise + fade, group stagger ≤ 0.5s per row, rows on successive pulses): Primary #E8531F · Secondary #F4A261 · Accent #2A9D8F / Background #FAF7F2 · Surface #FFFFFF · Text #1C1712 / Success #2E9E5B · Warning #E9A23B · Error #D64545. Each tile shows a rounded color chip, the role label, and its hex (the site's own role labels). Centered, grid ~56% of frame width; 3 depth layers.
Scene 3 (4.0–5.6s): "Build an entire system." reveals above the grid (`dynamic-content-sequencing`), and a small contrast badge springs onto the Text tile's corner — "Aa · 16.6:1 · AAA" (the real contrast of #1C1712 on #FAF7F2) with a smooth settle (`spring-pop-entrance`, no overshoot).
Scene 4 (5.6–7.0s): a single soft sheen travels once across the grid (`ambient-glow-bloom` sheen) and the frame holds dead still — the deliberate breather before the design reveal.

narrativeRole: Combination → System. Mirrors the site's own "Start with one color. Build an entire system." section and its role labels, plus the Contrast Checker's AAA badge as proof of accessibility.
keyMessage: A palette becomes production-ready tokens.

## Frame 6 — Design

- scene: The token system flows into a real product UI that re-skins live in the palette, then one decelerating zoom-out reveals the full HueFlow interface full-screen
- voiceover: "From one color to a finished design."
- on_screen: ""
- duration: 4.036s
- poster: 5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-design.html
- type: benefit_highlight
- persuasion: Future pacing (see the finished design)
- beat: aspiration + satisfaction
- asset_candidates: assets/og-image.png — HueFlow Open Graph image, the brand's own hero graphic; assets/logo-7237a897.svg — HueFlow wordmark for the interface header

- blueprint: zoom-out-workspace-reveal (Adapt — Benefits)
- focal: the rebuilt full-screen HueFlow interface (built), with the HueFlow wordmark in its header
- roles: logo-7237a897.svg = supporting (the wordmark in the interface nav, recolored #1C1712) · og-image.png = supporting (a floating preview card inside the interface; omit if it duplicates the hero)
- sfx: none

Adapt: keep the ONE decelerating zoom-out that reveals the containing whole (the signature); the close-up is a single UI card being painted by the tokens, and the whole it reveals is the HueFlow interface.
Scene 1 (0.0–2.2s): open tight on a single product UI card (a landing-page hero mock) at large scale: the tokens paint it element by element — background fills #FAF7F2, headline sets in #1C1712, the "Create a palette" button fills #E8531F, a swatch row fills with the hero palette (`control-target-sync`, each on its own short beat). Close-up fills ~80% of frame.
Scene 2 (2.2–3.4s): ONE continuous, strongly decelerating zoom-out (`multi-phase-camera` pull-back) reveals that card as part of the full HueFlow interface, full-screen: a glass nav bar with the HueFlow wordmark, a left hero "Find colors that feel right." (site h1, "feel right." in #E8531F) with two pill buttons, and on the right the site's color grid of rounded swatches. The camera eases to a full stop and locks.
Scene 3 (3.4–6.0s): locked wide; element-level payoff only — the right-hand swatch grid cells light up in a soft diagonal cascade from the hero palette colors (`center-outward-expansion`), then everything holds still.

narrativeRole: System → Design, and the brief's "end with a beautiful full-screen HueFlow interface". The payoff that the whole chain lands somewhere real.
keyMessage: From one color to a finished design, in one place.

## Frame 7 — Statement

- scene: The interface softly blurs back; the thesis line builds in two beats, centered, in large Avenir Next
- voiceover: "One color. Infinite possibilities."
- on_screen: "One color. Infinite possibilities."
- duration: 4.297s
- poster: 3s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/07-statement.html
- type: benefit_highlight
- persuasion: Future pacing
- beat: inspiration
- asset_candidates:

- blueprint: kinetic-type-beats (Adapt — Benefits statement relay, low tempo)
- focal: the thesis line (typography)
- roles: none
- sfx: none

Adapt: keep the in-place statement build on a flat field; two slow beats instead of a relay, and the payoff word carries a hue sweep instead of a pop.
Scene 1 (0.0–1.4s): flat #FAF7F2 field, centered. "One color." arrives in `h1` via a soft blur-to-sharp per-word reveal (power3).
Scene 2 (1.4–3.5s): "Infinite possibilities." arrives on the line below; a multi-hue gradient built from the hero palette sweeps once through "Infinite possibilities." and settles to solid #1C1712 with "Infinite" left in #E8531F (`gradient-text-sweep`). Hold still for the read.

narrativeRole: States the message outright once the viewer has seen the proof, with silence around it.
keyMessage: One color. Infinite possibilities.

## Frame 8 — HueFlow

- scene: The HUEFLOW wordmark resolves center with "Discover your next color." and hueflow.site beneath, a small palette of the video's colors settling underneath
- voiceover: "HueFlow. Discover your next color."
- on_screen: "HUEFLOW / Discover your next color. / hueflow.site"
- duration: 4.022s
- poster: 3s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-hueflow.html
- type: branding
- persuasion: Brand recall + call to explore
- beat: warmth + motivation
- asset_candidates: assets/logo-7237a897.svg — HueFlow wordmark (header logo)

- blueprint: logo-assemble-lockup (Adapt — Brand_Outro)
- focal: the "HUEFLOW" lockup (typography, per the brief)
- roles: logo-7237a897.svg = supporting (use only if a small mark reads cleaner than the typeset lockup; never both at equal weight)
- sfx: none

Adapt: keep the brand mark coming to exist on a cleared stage and resolving into a centered lockup extended to the URL; the mark is assembled from the video's own palette.
Scene 1 (0.0–1.3s): five small hero-palette dots drift in from the edges and converge at center (`center-outward-expansion` in reverse), then resolve into "HUEFLOW" set in Avenir Next 700 with wide tracking, #1C1712, centered, as the dots settle into a slim five-color bar beneath it.
Scene 2 (1.3–2.4s): "Discover your next color." reveals under the bar in `h3`, muted (`dynamic-content-sequencing`).
Scene 3 (2.4–3.5s): a "hueflow.site" pill wipes in left→right beneath it with a #E8531F leading edge (clip-path wipe); hold; the whole lockup fades gently to the canvas over the final ~0.4s as the music fades (the video's only real exit).

narrativeRole: Brand lockup and invitation. "Discover your next color." is also the site's own heading, so the video hands off to the site in its own words.
keyMessage: HueFlow — discover your next color.
