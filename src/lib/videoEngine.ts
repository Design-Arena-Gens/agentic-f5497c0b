export type DistributionChannel = "youtube" | "shorts" | "tiktok" | "instagram" | "podcast";

export interface VideoAutomationRequest {
  topic: string;
  targetAudience: string;
  outcome: string;
  offer: string;
  tone: "educational" | "story" | "controversial" | "case-study" | "inspirational";
  duration: "6" | "8" | "10" | "15";
  persona: string;
  platform: DistributionChannel;
  cta: string;
  keywords: string;
  monetizationFocus: "affiliate" | "service" | "digital-product" | "community";
}

export interface VideoSegment {
  id: string;
  label: string;
  objective: string;
  timing: string;
  script: string[];
  visualReferences: string[];
  soundDesign: string[];
  editorNotes: string[];
}

export interface OptimizationMetadata {
  title: string;
  description: string;
  tags: string[];
  chapters: { time: string; title: string }[];
  bRollIdeas: string[];
  thumbnailConcepts: string[];
  shortsAngles: string[];
  retentionDevices: string[];
}

export interface WorkflowBlueprint {
  researchStack: string[];
  automationStack: string[];
  productionWorkflow: string[];
  publishingChecklist: string[];
  repurposingSystem: string[];
  metricsToMonitor: string[];
}

export interface VideoAutomationPlan {
  hook: string;
  promise: string;
  patternInterrupts: string[];
  platformDirective: string;
  segments: VideoSegment[];
  metadata: OptimizationMetadata;
  workflow: WorkflowBlueprint;
  postPublishActions: string[];
}

const toneConfig: Record<
  VideoAutomationRequest["tone"],
  {
    voice: string;
    pacing: string;
    narrativeStyle: string;
    patternInterrupts: string[];
  }
> = {
  educational: {
    voice: "Confident subject-matter expert with actionable breakdowns",
    pacing: "Fast-paced but structured with clear transitions",
    narrativeStyle: "Step-by-step roadmapping anchored in data and case studies",
    patternInterrupts: [
      "Drop a surprising statistic that reframes the problem",
      "Cut to a quick whiteboard sketch highlighting the framework",
      "Flash on-screen checklist that viewers can screenshot",
    ],
  },
  story: {
    voice: "Relatable narrator unpacking a transformation arc",
    pacing: "Dynamic ebb and flow, pushing tension before payoff",
    narrativeStyle: "Hero's journey with emotional stakes and vivid imagery",
    patternInterrupts: [
      "Reveal a turning-point moment with cinematic underscoring",
      "Insert a POV b-roll sequence to immerse the viewer",
      "Drop a rhetorical question inviting comments",
    ],
  },
  controversial: {
    voice: "Bold contrarian challenging mainstream beliefs",
    pacing: "Snappy delivery with deliberate pauses for emphasis",
    narrativeStyle: "Myth-busting backed by proof and bold claims",
    patternInterrupts: [
      "Flash bold text overlay summarizing a hot take",
      "Cut to split-screen comparison of old vs new paradigm",
      "Insert tweet-style receipts validating the argument",
    ],
  },
  "case-study": {
    voice: "Analytical breakdown of real-world example",
    pacing: "Methodical pacing with data-driven reveals",
    narrativeStyle: "Problem / diagnosis / execution / measurable outcome",
    patternInterrupts: [
      "Reveal a milestone metric with animated counter",
      "Show raw dashboard or spreadsheet snippet",
      "Pause to highlight a 'what most people miss' insight",
    ],
  },
  inspirational: {
    voice: "High-energy motivator with cinematic momentum",
    pacing: "Ascending pacing culminating in a rallying CTA",
    narrativeStyle: "Vision casting tied to actionable next steps",
    patternInterrupts: [
      "Smash cut to aspirational montage with bold typography",
      "Drop in a quote-on-screen with punchy sfx",
      "Use a quick beat drop paired with onscreen transformation",
    ],
  },
};

const personaToAngles: Record<VideoAutomationRequest["persona"], string[]> = {
  strategist: [
    "Map the macro goal to a system that compounds results",
    "Quantify impact using north-star metrics",
    "Highlight leverage points that minimize operator time",
  ],
  creator: [
    "Keep production lightweight with repurposable assets",
    "Inject personality-driven hooks that build parasocial depth",
    "Balance storytelling with hard-edged takeaways",
  ],
  operator: [
    "Automate repeatable tasks and track SOP compliance",
    "Optimize hand-offs between research, scripting, and editing",
    "Bake in QA checkpoints before publishing push",
  ],
  marketer: [
    "Align topic with funnel stage and monetization angle",
    "Engineer retention with curiosity loops and CTAs",
    "Cross-pollinate distribution across owned media",
  ],
};

const monetizationFocusToAngle: Record<VideoAutomationRequest["monetizationFocus"], string> = {
  affiliate: "Spotlight the exact stack with embedded trust-building proofs and comparison shots.",
  service: "Position the offer as the natural next step with case-backed credibility and urgency.",
  "digital-product": "Frame the digital asset as the fast-track bridge with limited access bonuses.",
  community: "Guide viewers into a shared mission with social proof from inside the tribe.",
};

const platformNotes: Record<DistributionChannel, string> = {
  youtube: "Design opening 8 seconds to maximize retention, lean on curiosity gaps, deliver a strong promise before 0:15.",
  shorts: "Lead with the hook in the first second, maintain punchy jump cuts, end on a loop-friendly call-back.",
  tiktok: "Blend meme-speed pacing with bold captions; on-screen text must stand alone without narration.",
  instagram: "Keep vertical framing polished, bake in share-to-story triggers and DM-based CTAs.",
  podcast: "Emphasize narrative clarity and audio contrast, support with show notes and timestamps.",
};

const defaultAngles = [
  "Set the problem stakes with a vivid narrative moment.",
  "Bridge into the proprietary mechanism viewers can immediately model.",
  "Close with a transformational promise tied directly to the CTA.",
];

const randomId = (label: string, index: number) => `${label.replace(/\s+/g, "-").toLowerCase()}-${index}`;

const buildHook = (req: VideoAutomationRequest) => {
  const personaLine =
    personaToAngles[req.persona]?.[0] ??
    "Break the pattern and deliver the unfair advantage your competitors are missing.";

  const keywordFragment = req.keywords.length > 0 ? ` using ${req.keywords.split(",")[0].trim()}` : "";
  return `Stop scrolling, ${req.targetAudience}! ${req.topic} ${keywordFragment} is the difference between ${req.outcome} and staying stuck — here’s the playbook ${personaLine.toLowerCase()}`;
};

const durationBreakdown = (duration: VideoAutomationRequest["duration"]) => {
  switch (duration) {
    case "6":
      return ["0:00 - Hook", "0:25 - Insight", "0:55 - Framework", "1:20 - Proof", "1:45 - CTA"];
    case "8":
      return ["0:00 - Pattern interrupt", "0:30 - Tension build", "1:10 - Framework reveal", "1:50 - Proof stack", "2:15 - CTA"];
    case "10":
      return ["0:00 - Hook", "0:45 - Story setup", "1:30 - Core mechanism", "2:20 - Case study", "3:00 - CTA & loop close"];
    default:
      return ["0:00 - Hook", "0:40 - Context", "1:20 - Mechanism", "2:10 - Proof", "3:10 - CTA"];
  }
};

const buildSegments = (req: VideoAutomationRequest): VideoSegment[] => {
  const tone = toneConfig[req.tone];
  const personaAngles = personaToAngles[req.persona] ?? defaultAngles;
  const durationLabels = durationBreakdown(req.duration);

  return durationLabels.map((timecode, index) => {
    const [timestamp, label] = timecode.split(" - ");
    const objective = personaAngles[index % personaAngles.length];
    const scriptBlueprint = [
      `Open with a ${req.tone} beat that dramatizes: ${req.topic}.`,
      `Anchor why it matters for ${req.targetAudience} aiming for ${req.outcome}.`,
      `Introduce the mechanism: ${req.offer} — position it as the bridge.`,
    ];

    const editorNotes = [
      `Use ${tone.pacing.toLowerCase()} pacing.`,
      `Layer on-screen text summarizing: ${objective}.`,
      `Insert CTA reminder: ${req.cta}.`,
    ];

    const visuals = [
      `Overlay high-contrast captions with keywords: ${req.keywords || req.topic}.`,
      `Cutaway to proof asset (analytics, testimonial, workflow screen recording).`,
      `Use motion graphics to highlight ${req.offer} in action.`,
    ];

    const sound = [
      "Bed: High-energy trap beat at 92-100 BPM, drop mids during key lines.",
      "SFX: Quick riser + impact when revealing framework steps.",
      "Insert subtle woosh transitions between beats to maintain retention.",
    ];

    if (index === 0) {
      scriptBlueprint.unshift(`Deliver a direct callout: "${req.targetAudience}, if you're ${req.outcome}, you can't ignore this."`);
      scriptBlueprint.push(`Seed curiosity by teasing the final ${req.duration}-minute CTA payoff.`);
    }

    if (index === durationLabels.length - 1) {
      scriptBlueprint.push(`Hard CTA: ${req.cta}.`);
      visuals.push(`Final frame: CTA overlay pointing to ${req.offer} lead magnet.`);
      sound.push("Drop music volume by 40% to spotlight CTA line.");
    }

    return {
      id: randomId(label, index),
      label,
      objective,
      timing: timestamp,
      script: scriptBlueprint,
      visualReferences: visuals,
      soundDesign: sound,
      editorNotes,
    };
  });
};

const buildMetadata = (req: VideoAutomationRequest, segments: VideoSegment[]): OptimizationMetadata => {
  const keywordSlice = req.keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const tags = Array.from(
    new Set([
      req.topic.toLowerCase(),
      req.targetAudience.toLowerCase(),
      req.offer.toLowerCase(),
      `${req.topic.toLowerCase()} tutorial`,
      `${req.targetAudience.toLowerCase()} growth`,
      ...keywordSlice,
    ])
  ).slice(0, 12);

  const chapters = segments.map((segment) => ({
    time: segment.timing,
    title: segment.label,
  }));

  const descriptionBlocks = [
    `🔥 What you'll learn: ${segments[1]?.objective ?? ""}`,
    `🚀 Why it matters: ${req.outcome} for ${req.targetAudience}`,
    `🧠 Who this is for: ${req.persona} operators deploying ${req.offer}`,
    `💰 Monetization angle: ${monetizationFocusToAngle[req.monetizationFocus]}`,
    `📩 CTA: ${req.cta}`,
  ];

  const shortsAngles = [
    `Turn the hook into a 30s short focusing on "${segments[0]?.objective ?? req.topic}"`,
    `Pull the boldest data point into a green-screen style breakdown`,
    `Clip the CTA pay-off and wrap with loop back to the hook`,
  ];

  const thumbnailConcepts = [
    `Split-screen BEFORE/AFTER with bold text: "${req.outcome}"`,
    `High-contrast portrait with overlay "The ${req.topic.split(" ")[0]} Formula"`,
    `Workflow screenshot blurred with headline: "${req.offer} Playbook"`,
  ];

  const retentionDevices = [
    "Deliver numbered promises that must be completed to unlock the CTA.",
    "Seed micro-cliffhangers at the end of each segment.",
    "Overdeliver at the payoff by bundling a bonus tactic.",
  ];

  return {
    title: `${req.topic}: ${req.outcome} Without Burning Out`,
    description: descriptionBlocks.join("\n"),
    tags,
    chapters,
    bRollIdeas: [
      "Screen recordings of dashboard metrics ticking upward.",
      "Behind-the-scenes footage of automation workflow setup.",
      "User testimonial clips with kinetic typography overlays.",
      "Stock clips showing target audience struggling vs succeeding.",
    ],
    thumbnailConcepts,
    shortsAngles,
    retentionDevices,
  };
};

const buildWorkflow = (req: VideoAutomationRequest): WorkflowBlueprint => ({
  researchStack: [
    "HypeFury topic scraper → surface trend velocity",
    "Glasp highlights → pull quotable stats",
    "SparkToro audience intelligence → validate viewer psychographics",
  ],
  automationStack: [
    "Notion + Whalesync → script + CTA asset sync",
    "Descript → overdub narration, auto filler removal",
    "CapCut templates → fast vertical optimization",
    "Zapier → auto-push publish metadata + thumbnails to Drive",
  ],
  productionWorkflow: [
    "Draft bullet script using the segment objectives.",
    "Run AI voiceover pass + manual emphasis tweaks.",
    "Drop assets into template timeline and align captions.",
    "Run retention check using 3-beat curiosity loop.",
  ],
  publishingChecklist: [
    `Upload to ${req.platform} with metadata block and chapters.`,
    "Add pinned comment teasing CTA asset with trackable link.",
    "Schedule Shorts remix 24h later to re-target engaged viewers.",
    "Trigger email + SMS notification via marketing automation.",
  ],
  repurposingSystem: [
    "Convert segments into carousel slides (Canva auto layout).",
    "Spin hook into 3 newsletter subject line tests.",
    "Create Twitter thread with highlight clips + CTA at end.",
  ],
  metricsToMonitor: [
    "15s and 30s retention cliffs (Audience retention graph).",
    "CTR vs baseline for the series.",
    "Comment velocity in first 60 minutes.",
    "Opt-in conversion rate on CTA asset.",
  ],
});

const postPublish = (req: VideoAutomationRequest): string[] => [
  "Reply to the first 10 comments with depth to train the algorithm for conversation.",
  "Pull retention analytics after 12 hours and annotate drop-offs.",
  "Launch retargeting ad to viewers who watched 50%+ driving to CTA.",
  "Republish audio as mini-podcast episode with call-to-action baked in.",
  `Update Notion content pipeline with performance notes and next experiment for ${req.topic}.`,
];

export const defaultRequest: VideoAutomationRequest = {
  topic: "AI YouTube Automation Systems",
  targetAudience: "solo content entrepreneurs",
  outcome: "scaling to consistent $10k months",
  offer: "Done-With-You Automation Sprint",
  tone: "case-study",
  duration: "10",
  persona: "strategist",
  platform: "youtube",
  cta: "Grab the Automation Ops Dashboard (link in description)",
  keywords: "youtube automation, ai workflows, content systems",
  monetizationFocus: "service",
};

export const buildVideoAutomationPlan = (request: VideoAutomationRequest): VideoAutomationPlan => {
  const sanitized: VideoAutomationRequest = {
    ...defaultRequest,
    ...request,
    topic: request.topic.trim() || defaultRequest.topic,
    targetAudience: request.targetAudience.trim() || defaultRequest.targetAudience,
    outcome: request.outcome.trim() || defaultRequest.outcome,
    offer: request.offer.trim() || defaultRequest.offer,
    cta: request.cta.trim() || defaultRequest.cta,
    keywords: request.keywords.trim() || defaultRequest.keywords,
  };

  const hook = buildHook(sanitized);
  const tone = toneConfig[sanitized.tone];
  const segments = buildSegments(sanitized);

  return {
    hook,
    promise: `${tone.voice}. Viewers finish knowing exactly how to execute ${sanitized.topic} and move toward ${sanitized.outcome}.`,
    patternInterrupts: tone.patternInterrupts,
    platformDirective: platformNotes[sanitized.platform],
    segments,
    metadata: buildMetadata(sanitized, segments),
    workflow: buildWorkflow(sanitized),
    postPublishActions: postPublish(sanitized),
  };
};
