// Authored applications of the local research, not quotations or new viewing claims.
// Source headings point to the evidence; before/after examples are original illustrations.
export const filmLearnings = [
  {
    id: 'learning-one-case', kind: 'lesson', category: 'Storytelling',
    title: 'Let one real task carry the story',
    summary: 'Keep the same case, document or request across shots so each action adds to a result the viewer can follow.',
    when: 'A feature demo needs to explain a workflow across several screens.',
    steps: [
      'Choose one believable task and record its starting state, valid action and resulting state.',
      'Keep a recognizable identifier or artifact visible as the task moves between screens.',
      'End on the changed result long enough to see what the action accomplished.'
    ],
    watchFor: 'A polished sequence can still imply unsupported behavior. Verify that the same data really can move through the demonstrated workflow.',
    example: { before: 'A dashboard, editor and activity feed appear as three unrelated beauty shots.', after: 'One review request opens a diff, receives a comment and returns with its updated status.' },
    sources: [
      { entryId: 'research-reference-study-b', section: "B16 — Peer Richelsen's quoted Linear film: product performs the plot" },
      { entryId: 'research-distilled-findings-b', section: 'Editorial direction' }
    ]
  },
  {
    id: 'learning-mechanism-before-metric', kind: 'lesson', category: 'Storytelling',
    title: 'Show what causes the benefit before naming it',
    summary: 'A visible mechanism gives a metric meaning. Show the operation, its consequence and then the supported claim.',
    when: 'A technical product promises lower cost, faster work or fewer repeated steps.',
    steps: [
      'Draw the inputs, operation and output needed to explain the claim in one view.',
      'Animate the causal order: the input arrives, the operation happens, the result changes.',
      'Place the verified metric beside that result, then show a concrete way to use the feature.'
    ],
    watchFor: 'A conceptual diagram explains a mechanism; it does not verify a benchmark. Use only measurements supported by the actual product.',
    example: { before: 'A large “faster” headline appears before the viewer knows what the system does.', after: 'A repeated request reuses an existing result; the supported time comparison follows that visible change.' },
    sources: [
      { entryId: 'research-reference-study-a', section: 'A04 — runinfra: technical mechanism → quantified case → offer' },
      { entryId: 'research-learnings', section: 'Story, argument, and proof' }
    ]
  },
  {
    id: 'learning-return-with-change', kind: 'lesson', category: 'Storytelling',
    title: 'Bring the opening object back with a changed meaning',
    summary: 'A recurring object can connect varied scenes and make the ending feel earned when its state develops with the argument.',
    when: 'A brand film moves between footage, diagrams, typography and product screens.',
    steps: [
      'Introduce one object or relationship that makes the opening problem tangible.',
      'Return to it after a meaningful action, preserving its identity while changing its state.',
      'Use its final state to resolve the opening question or lead naturally into the closing identity.'
    ],
    watchFor: 'Repetition needs development. Reusing a symbol without changing what it tells the viewer becomes decoration.',
    example: { before: 'Every feature gets a new abstract shape, followed by an unrelated logo reveal.', after: 'An unresolved route returns as a saved path, then as part of a reusable network at the close.' },
    sources: [
      { entryId: 'research-portfolio-studies', section: 'Transfer to the skill' },
      { entryId: 'research-creator-studies-routine-visual-study', section: 'Transfer proposals for software films' },
      { entryId: 'research-creator-studies-creative-process-visual-study', section: 'Proposed software-film experiments' }
    ]
  },
  {
    id: 'learning-transition-anchor', kind: 'lesson', category: 'Motion',
    title: 'Carry one recognizable anchor through a transition',
    summary: 'Preserve an object, edge or direction across the handoff so movement connects two ideas without making the viewer find the subject again.',
    when: 'An action leads from one product state into another scene or layout.',
    steps: [
      'Mark the attention target in both the departing frame and the arriving frame.',
      'Match a relevant property such as object identity, position, boundary shape or travel direction.',
      'Inspect the crossover and the settled result together, then compare the sequence with a direct cut.'
    ],
    watchFor: 'A mask can hide a cut but cannot make unrelated states causally connected. Use a simple cut when the chapter actually changes.',
    example: { before: 'The whole interface blurs away and a new panel arrives from an arbitrary direction.', after: 'The selected card stays recognizable while its edge reveals the detail view, then settles beside the result.' },
    sources: [
      { entryId: 'research-distilled-findings-a', section: 'Skill-ready findings: A01–A08' },
      { entryId: 'research-distilled-findings-b', section: 'High motion direction' },
      { entryId: 'research-creator-studies-daniel-visual-study', section: 'Original software-film transfer proposals' }
    ]
  },
  {
    id: 'learning-motion-from-velocity', kind: 'lesson', category: 'Motion',
    title: 'Shape the speed curve before adding effects',
    summary: 'Separate the route from its timing. Inspect velocity and acceleration to understand where an object rushes, turns or settles.',
    when: 'A reveal follows the right path but feels abrupt, weightless or slow.',
    steps: [
      'Choose readable start and end poses before adjusting the movement between them.',
      'Change duration and easing independently while comparing the visible motion with its speed curve.',
      'Inspect the join into the final hold; decide whether an abrupt stop, ease or spring return serves that beat.'
    ],
    watchFor: 'Lower acceleration is not automatically better. A deliberate impact or cut may need a discontinuity; distinguish that choice from an accidental jump.',
    example: { before: 'A curved path receives a bounce preset and blur, yet still slams into its reading state.', after: 'The same route uses a longer deceleration and a stable arrival; effects are added only if the travel needs them.' },
    sources: [
      { entryId: 'research-creator-studies-adjacent-creators', section: 'Ben Marriott: design and velocity before effects accumulation' },
      { entryId: 'research-math-reference-shuding-reference-study', section: 'Interpretation for the MovieMaker mathematics' }
    ]
  },
  {
    id: 'learning-stepped-cadence', kind: 'lesson', category: 'Motion',
    title: 'Give cutouts their own cadence',
    summary: 'Hold the cutout pose for several frames while the camera keeps moving at the delivery frame rate.',
    when: 'A paper collage needs a stop-motion feel alongside a smooth pan or animated text.',
    steps: [
      'Set the delivery rate first. For example, use a 24 fps timeline.',
      'Change the cutout pose every third frame, starting on frames 1, 4 and 7. Leave the camera and any animated type on their own timing.',
      'Scrub through frames 1 to 3. The bird should keep the same shape while the ridge marker shifts with the pan. On frame 4, the bird changes pose.'
    ],
    watchFor: 'Apply the hold to the cutout before the camera transform. If you hold the finished image, the pan and any moving type will jump at the same time as the paper.',
    example: { before: 'Paper and pan both update every three frames.', after: 'Paper updates every three frames. The pan moves every frame.' },
    sources: [
      { entryId: 'research-reference-study-a-tail', section: 'A15 — Karn Sarao: TasteGraph, collage and stepped motion' },
      { entryId: 'research-rendering-tools', section: 'Finish is an authored treatment' }
    ]
  },
  {
    id: 'learning-proof-framing', kind: 'lesson', category: 'Framing',
    title: 'Let the frame become simpler when proof must read',
    summary: 'Use dramatic framing to introduce the subject, then give consequential text, actions and results a stable, legible view.',
    when: 'A cinematic setup leads into code, a chart, a detailed interface or a presenter explanation.',
    steps: [
      'Identify exactly what the viewer must inspect in the proof shot.',
      'Reserve separate space for the product, explanatory type and presenter when they share a frame.',
      'Reduce perspective, competing movement and peripheral detail as the evidence arrives; inspect the crop at delivery size.'
    ],
    watchFor: 'A large close-up can remove the context needed to understand an action. Keep enough surrounding interface to locate the change.',
    example: { before: 'A presenter, moving diagram and tilted code panel all compete in the same central area.', after: 'The presenter introduces the question, then a frontal code-and-explanation layout holds the evidence.' },
    sources: [
      { entryId: 'research-distilled-findings-b', section: 'Cinematography and UI proof' },
      { entryId: 'research-portfolio-studies', section: 'Skale: page inventory and three preview comparisons' }
    ]
  },
  {
    id: 'learning-depth-before-camera', kind: 'lesson', category: 'Framing',
    title: 'Build depth before asking the camera to reveal it',
    summary: 'Foreground, subject and background relationships give a camera move something useful to disclose through parallax, occlusion or scale.',
    when: 'One establishing shot needs a spatial product metaphor or a physical-object reveal.',
    steps: [
      'Compose distinct depth layers and a clear subject in a locked frame first.',
      'Choose a camera path that reveals a relationship or surface unavailable from the starting view.',
      'Compare the moving shot with the locked version, then return to simpler coverage when the film reaches detailed product proof.'
    ],
    watchFor: 'A flat screenshot has no hidden surfaces. Invented depth layers can distort the interface, and atmosphere can conceal weak spatial construction.',
    example: { before: 'A screenshot rotates in empty space without revealing anything new.', after: 'A brief lateral move separates foreground tasks from a shared system behind them, then lands on a readable interface.' },
    sources: [
      { entryId: 'research-creator-studies-adjacent-creators', section: 'Sebastian Jern: depth is constructed before the camera moves' },
      { entryId: 'research-distilled-findings-a', section: 'Skill-ready findings: A01–A08' }
    ]
  },
  {
    id: 'learning-whole-cut-first', kind: 'lesson', category: 'Editing',
    title: 'Make the whole argument work before polishing a shot',
    summary: 'A rough complete cut reveals missing bridges and timing pressure while changes are still inexpensive.',
    when: 'A film has several scenes, narration or one expensive hero sequence.',
    steps: [
      'Arrange rough frames for the complete story and state what each shot adds to the viewer’s understanding.',
      'Time a natural voice read and temporary music against that sequence before detailed animation.',
      'Test the most demanding shot, then put it back into the complete cut and adjust the surrounding beats.'
    ],
    watchFor: 'A rough board should leave room for discoveries. Preserve the argument and shot connections without treating every early drawing as a final composition.',
    example: { before: 'The opening is fully finished before anyone discovers that the explanation needs twice the remaining time.', after: 'A complete rough cut exposes the missing explanation early, so the opening and proof can share the runtime deliberately.' },
    sources: [
      { entryId: 'research-creator-studies-adjacent-creators', section: 'Andy To: build the whole edit before finishing its parts' },
      { entryId: 'research-creator-studies-gawx-process-sources', section: 'GP01 — The 2025 process is planned, but not rigid' }
    ]
  },
  {
    id: 'learning-speech-anchors', kind: 'lesson', category: 'Editing',
    title: 'Attach visual cues to meaning in the edited speech',
    summary: 'Map retained speech into the finished timeline, then anchor a relevant action or result to the phrase that explains it.',
    when: 'Narration is trimmed or reordered after captions and visual cues have been planned.',
    steps: [
      'Keep a source-to-program time map for the retained speech and verify the revised word timing.',
      'Choose the phrase that should introduce an action or settled result, including any intentional lead or lag.',
      'Regenerate dependent cues after an audio change, then listen and watch the joins in context.'
    ],
    watchFor: 'Aligned word records do not prove that an edit preserved a quiet consonant, a meaningful pause or the speaker’s emphasis.',
    example: { before: 'A pause is removed, but the result animation still starts at its old timestamp.', after: 'The result remains attached to its explanatory phrase after trimming, with the chosen lead preserved.' },
    sources: [
      { entryId: 'research-video-model-second-video-linked-resource-review', section: 'Build a semantic time map after editing speech' },
      { entryId: 'research-video-model-second-video-source-notes', section: 'Provisional implications' }
    ]
  },
  {
    id: 'learning-readable-hold', kind: 'lesson', category: 'Editing',
    title: 'Count reading time from the moment the content is ready',
    summary: 'Give complete, settled and visible content a continuous reading window instead of counting its entrance animation as reading time.',
    when: 'A proof shot contains text, code, a chart label or a detailed result.',
    steps: [
      'Mark when all required content has appeared, settled and reached a usable size.',
      'Measure the uninterrupted interval before movement, occlusion or the next cut removes that opportunity.',
      'Compare it with a declared reading assumption, then check actual comprehension at the delivery size.'
    ],
    watchFor: 'A bounding box and a word count cannot establish contrast, absence of occlusion or audience understanding. Geometry is a diagnostic, not the final reading test.',
    example: { before: 'A title spends most of its shot building letter by letter and disappears just after completion.', after: 'The title finishes early, holds intact beside the proof, then exits after the viewer has had a continuous chance to read.' },
    sources: [
      { entryId: 'research-video-model-source-investigation', section: 'Lemo Opuscar' },
      { entryId: 'research-distilled-findings-b', section: 'Editorial direction' },
      { entryId: 'research-math-reference-shuding-reference-study', section: 'Interpretation for the MovieMaker mathematics' }
    ]
  },
  {
    id: 'learning-purposeful-broll', kind: 'lesson', category: 'Storytelling',
    title: 'Give every insert a specific sentence to explain',
    summary: 'Choose an insert for the meaning it adds, rather than filling narration with loosely related imagery.',
    when: 'A spoken explanation needs B-roll, a diagram or a change from the presenter.',
    steps: [
      'Write the idea the insert must communicate and identify whether it is proof, illustration, reenactment or metaphor.',
      'Select the exact source interval and crop that show the relevant action or relationship.',
      'Compare the insert with keeping the presenter or product visible; keep the version that explains the thought more clearly.'
    ],
    watchFor: 'Generated or archival-looking imagery may illustrate a claim without verifying it. Do not let the visual imply evidence it does not contain.',
    example: { before: 'A sentence about routing a request is covered with generic footage of a busy office.', after: 'The same sentence accompanies the request entering the correct queue and reaching its owner.' },
    sources: [
      { entryId: 'research-video-model-second-video-linked-resource-review', section: 'Give B-roll a specific job' },
      { entryId: 'research-video-model-second-video-source-notes', section: 'What changes in the model' }
    ]
  },
  {
    id: 'learning-selective-sound-cues', kind: 'lesson', category: 'Sound',
    title: 'Accent meaningful events, then leave room for the result',
    summary: 'Assign sound to anticipation, action, consequence and rest so important changes stand out without every movement demanding an accent.',
    when: 'Music and effects are being fitted to an animated product sequence.',
    steps: [
      'Mark the few events whose meaning benefits from a sonic cue and sketch the quiet passages around them.',
      'Keep detected onsets or beats in source seconds and choose deliberate offsets before rounding to output frames.',
      'Listen to restrained and fuller passes with the actual picture; preserve speech clarity and remove accents that compete with the proof.'
    ],
    watchFor: 'Detected beats are editable candidates, not instructions to cut. Analysis frames differ from video frames, and silence may have no beat to detect.',
    example: { before: 'Every card movement receives a whoosh while narration and music continue at full density.', after: 'One cue anticipates the action, a quieter result holds under the voice, and the next accent marks a real chapter change.' },
    sources: [
      { entryId: 'research-video-model-runtime-repo-review', section: 'Librosa' },
      { entryId: 'research-creator-studies-adjacent-creators', section: 'Aidin Robbins: story and camera intention; sound research target' },
      { entryId: 'research-creator-studies-gawx-process-sources', section: 'Transfers to the software-film skill' }
    ]
  },
  {
    id: 'learning-build-the-look', kind: 'lesson', category: 'Production',
    title: 'Build the look in the scene before adding a grade',
    summary: 'Coherent materials, value separation and lighting give finishing effects a clear purpose and keep the subject readable.',
    when: 'A scene needs a tactile, dark-material or cinematic treatment.',
    steps: [
      'Choose the palette roles, material family and light direction while composing the untreated frame.',
      'Separate subject and background through geometry, value and controlled highlights before adding bloom, grain or haze.',
      'Compare clean and finished versions at delivery size, preserving exact product colors and sharp proof where needed.'
    ],
    watchFor: 'A global texture or glow can unify the wrong things. Treat interface text and photographed or rendered materials as different finishing needs.',
    example: { before: 'A dark object disappears into the background, so a broad glow is added over the whole image.', after: 'A grazing highlight reveals the object’s edge and material; restrained finishing leaves the nearby interface sharp.' },
    sources: [
      { entryId: 'research-distilled-findings-b', section: 'Finishing modes to make explicit' },
      { entryId: 'research-rendering-tools', section: 'Finish is an authored treatment' },
      { entryId: 'research-creator-studies-forum-research', section: 'Concrete additions suggested for the skill' }
    ]
  },
  {
    id: 'learning-repeatable-frames', kind: 'lesson', category: 'Production',
    title: 'Make a frame independent of how you reached it',
    summary: 'Time-addressed animation makes seeking, rendering and revision reliable; stateful effects need explicit history management.',
    when: 'A film uses procedural variation, physics, particles or temporal effects.',
    steps: [
      'Derive pure animation from the requested frame time and key variation by element identity and time.',
      'Bake simulation results or restore and replay a complete known state, including interpolation and temporal-effect history.',
      'Compare sequential, repeated, reverse and shuffled requests for the same frames before parallel export.'
    ],
    watchFor: 'A fixed seed or timestep alone does not make arbitrary seeking repeatable. Shared random streams and hidden effect history can still change a frame.',
    example: { before: 'The particle layout changes when the renderer requests a frame directly instead of playing from the start.', after: 'That frame uses the same baked transforms or reconstructed state in preview, isolated capture and parallel export.' },
    sources: [
      { entryId: 'research-video-model-runtime-repo-review', section: 'React Three Rapier' },
      { entryId: 'research-video-model-source-investigation', section: 'pixelfx' },
      { entryId: 'research-video-model-three-source-review', section: 'Three.js source review — 10 November 2026' },
      { entryId: 'research-video-model-second-video-linked-resource-review', section: 'Declared determinism is weaker than arbitrary seeking' }
    ]
  },
  {
    id: 'learning-check-delivery', kind: 'lesson', category: 'Production',
    title: 'Judge the finished image in its delivery format',
    summary: 'Cropping, resizing and compression can change the proof. Review the actual encoded result instead of relying on a large working preview.',
    when: 'A film must work across desktop, mobile, portrait or compressed delivery variants.',
    steps: [
      'Identify protected text, actions and subject areas before choosing each crop and output size.',
      'Render a representative difficult passage with the intended delivery settings, including its transitions and settled frame.',
      'Inspect text edges, thin lines, gradients, color and visible proof after encoding, then revise the source or crop where detail fails.'
    ],
    watchFor: 'A higher-bit-depth container cannot restore precision absent from the source. A sharp still also cannot establish transition quality or readable time.',
    example: { before: 'A chart looks clear in the editing canvas but its labels collapse in the portrait export.', after: 'The delivery crop preserves the relevant labels, and the encoded passage is checked at the size the audience will see.' },
    sources: [
      { entryId: 'research-rendering-tools', section: 'Finish is an authored treatment' },
      { entryId: 'research-video-model-runtime-repo-review', section: 'Changes worth transferring' },
      { entryId: 'research-math-reference-shuding-reference-study', section: 'Interpretation for the MovieMaker mathematics' }
    ]
  }
];

// Duplicate research reports and evidence inventories, not the practical production guides.
export const learningSourceGuideIds = [
  'skills-software-film-director-references-creator-evidence',
  'skills-software-film-director-references-portfolio-studies',
  'skills-software-film-director-references-reference-analysis',
  'skills-software-film-director-references-reference-library',
  'skills-software-film-director-references-rendering-and-tools',
  'skills-software-film-director-references-studies-a-extra',
  'skills-software-film-director-references-studies-a',
  'skills-software-film-director-references-studies-b'
];
