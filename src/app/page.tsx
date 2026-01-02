"use client";

import { useMemo, useState } from "react";
import {
  buildVideoAutomationPlan,
  defaultRequest,
  type VideoAutomationPlan,
  type VideoAutomationRequest,
} from "@/lib/videoEngine";

const toneOptions: { label: string; value: VideoAutomationRequest["tone"] }[] = [
  { label: "Educational Breakdown", value: "educational" },
  { label: "Story Driven", value: "story" },
  { label: "Contrarian POV", value: "controversial" },
  { label: "Case Study", value: "case-study" },
  { label: "Inspirational", value: "inspirational" },
];

const personaOptions: { label: string; value: VideoAutomationRequest["persona"] }[] = [
  { label: "Strategist", value: "strategist" },
  { label: "Creator Operator", value: "creator" },
  { label: "Ops Architect", value: "operator" },
  { label: "Growth Marketer", value: "marketer" },
];

const platformOptions = [
  { label: "YouTube", value: "youtube" },
  { label: "YouTube Shorts", value: "shorts" },
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram Reels", value: "instagram" },
  { label: "Podcast", value: "podcast" },
];

const monetizationOptions = [
  { label: "Affiliate Stack", value: "affiliate" },
  { label: "Done-For-You / Service", value: "service" },
  { label: "Digital Product", value: "digital-product" },
  { label: "Community / Membership", value: "community" },
];

const durationOptions = [
  { label: "6 minute sprint", value: "6" },
  { label: "8 minute guide", value: "8" },
  { label: "10 minute authority", value: "10" },
  { label: "15 minute flagship", value: "15" },
];

const InputLabel = ({ title, helper }: { title: string; helper?: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{title}</span>
    {helper ? <span className="text-xs text-zinc-500">{helper}</span> : null}
  </div>
);

const SectionCard = ({
  plan,
  activeId,
  onSelect,
}: {
  plan: VideoAutomationPlan;
  activeId: string;
  onSelect: (id: string) => void;
}) => (
  <div className="grid gap-4">
    {plan.segments.map((segment) => (
      <button
        key={segment.id}
        onClick={() => onSelect(segment.id)}
        className={`rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/30 ${
          activeId === segment.id ? "ring-2 ring-blue-400/60" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            {segment.timing}
          </span>
          <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-200">
            {segment.label}
          </span>
        </div>
        <p className="mt-3 text-sm text-zinc-200">{segment.objective}</p>
        <p className="mt-1 text-xs text-zinc-500">Tap to review script + edit notes</p>
      </button>
    ))}
  </div>
);

const DetailPanel = ({ plan, activeId }: { plan: VideoAutomationPlan; activeId: string }) => {
  const segment = plan.segments.find((item) => item.id === activeId) ?? plan.segments[0];
  if (!segment) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-white">{segment.label}</h3>
        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-100">
          {segment.timing}
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Script Beats</h4>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-100">
            {segment.script.map((line, index) => (
              <li key={index} className="rounded-lg bg-white/5 p-3">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Visual Direction
            </h4>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-100">
              {segment.visualReferences.map((item, index) => (
                <li key={index} className="rounded-lg bg-white/5 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Sound Design
            </h4>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-100">
              {segment.soundDesign.map((item, index) => (
                <li key={index} className="rounded-lg bg-white/5 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Editor Notes
        </h4>
        <ul className="mt-3 grid gap-2 text-sm text-zinc-100 md:grid-cols-2">
          {segment.editorNotes.map((item, index) => (
            <li key={index} className="rounded-lg bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Home() {
  const [request, setRequest] = useState<VideoAutomationRequest>(defaultRequest);
  const [plan, setPlan] = useState<VideoAutomationPlan>(() =>
    buildVideoAutomationPlan(defaultRequest),
  );
  const [activeSegment, setActiveSegment] = useState<string>(plan.segments[0]?.id ?? "");

  const updateRequest = (
    field: keyof VideoAutomationRequest,
    value: string | VideoAutomationRequest[keyof VideoAutomationRequest],
  ) => {
    setRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const regenerate = () => {
    const next = buildVideoAutomationPlan(request);
    setPlan(next);
    setActiveSegment(next.segments[0]?.id ?? "");
  };

  const ctaBlocks = useMemo(
    () => [
      {
        title: "Hook Formula",
        value: plan.hook,
      },
      {
        title: "Core Promise",
        value: plan.promise,
      },
      {
        title: "Platform Directive",
        value: plan.platformDirective,
      },
    ],
    [plan.hook, plan.promise, plan.platformDirective],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900 text-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-12">
        <header className="flex flex-col gap-4 border-b border-white/5 pb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
                Agentic Creator Ops
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
                Professional YouTube Automation AI Agent
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-zinc-400">
                Drop in your topic and let the agent architect hooks, scripts, visual direction,
                metadata, and post-publish workflow engineered for retention, monetization, and
                effortless repurposing.
              </p>
            </div>
            <button
              onClick={regenerate}
              className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
            >
              Generate Execution Blueprint
            </button>
          </div>
        </header>

        <main className="grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <section className="sticky top-8 h-fit space-y-6 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <div>
              <InputLabel title="Video Topic" helper="Be specific. This is the transformation headline." />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.topic}
                onChange={(event) => updateRequest("topic", event.target.value)}
                placeholder="e.g. 3-Step AI Workflow To 10x YouTube Output"
              />
            </div>

            <div>
              <InputLabel title="Target Audience" helper="Exact avatar you want to binge the video." />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.targetAudience}
                onChange={(event) => updateRequest("targetAudience", event.target.value)}
                placeholder="e.g. Agency owners running lean teams"
              />
            </div>

            <div>
              <InputLabel title="Desired Outcome" helper="What win are you promising the viewer?" />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.outcome}
                onChange={(event) => updateRequest("outcome", event.target.value)}
                placeholder="e.g. Doubling high-retention uploads in 30 days"
              />
            </div>

            <div>
              <InputLabel title="Signature Offer" helper="What asset / offer will the CTA push to?" />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.offer}
                onChange={(event) => updateRequest("offer", event.target.value)}
                placeholder="e.g. Automation Vault Template Bundle"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <InputLabel title="Persona" helper="Aligns segment objectives with operating style." />
                <select
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                  value={request.persona}
                  onChange={(event) =>
                    updateRequest("persona", event.target.value as VideoAutomationRequest["persona"])
                  }
                >
                  {personaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <InputLabel
                  title="Tone"
                  helper="Controls hook construction, pacing, and pattern interrupts."
                />
                <select
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                  value={request.tone}
                  onChange={(event) =>
                    updateRequest("tone", event.target.value as VideoAutomationRequest["tone"])
                  }
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <InputLabel title="Primary Platform" />
                <select
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                  value={request.platform}
                  onChange={(event) =>
                    updateRequest("platform", event.target.value as VideoAutomationRequest["platform"])
                  }
                >
                  {platformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <InputLabel title="Video Runtime" helper="Influences segment timing." />
                <select
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                  value={request.duration}
                  onChange={(event) =>
                    updateRequest("duration", event.target.value as VideoAutomationRequest["duration"])
                  }
                >
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <InputLabel title="Monetization Focus" helper="Allows CTA copy to align with the funnel." />
              <select
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.monetizationFocus}
                onChange={(event) =>
                  updateRequest(
                    "monetizationFocus",
                    event.target.value as VideoAutomationRequest["monetizationFocus"],
                  )
                }
              >
                {monetizationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <InputLabel title="Retainer CTA" helper="Visible in every segment + closing loop." />
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.cta}
                onChange={(event) => updateRequest("cta", event.target.value)}
                placeholder="e.g. Claim the automation toolkit (link below)"
              />
            </div>

            <div>
              <InputLabel title="SEO Keywords" helper="Comma separated. Powers metadata + captions." />
              <textarea
                className="mt-2 h-20 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/80"
                value={request.keywords}
                onChange={(event) => updateRequest("keywords", event.target.value)}
                placeholder="youtube automation, ai content workflow, monetized channels"
              />
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              {ctaBlocks.map((block) => (
                <div key={block.title} className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm text-blue-50">{block.value}</p>
                </div>
              ))}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Pattern Interrupts
                </h3>
                <ul className="mt-3 grid gap-2 text-sm text-zinc-100 md:grid-cols-3">
                  {plan.patternInterrupts.map((item, index) => (
                    <li key={index} className="rounded-xl bg-black/40 p-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
              <SectionCard plan={plan} activeId={activeSegment} onSelect={setActiveSegment} />
              <DetailPanel plan={plan} activeId={activeSegment} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Metadata Stack
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Title
                    </p>
                    <p className="mt-1 text-sm text-white">{plan.metadata.title}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Description Block
                    </p>
                    <pre className="mt-1 whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-xs text-zinc-200">
                      {plan.metadata.description}
                    </pre>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Tags
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {plan.metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-100"
                        >
                          #{tag.replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Thumbnail + Short Form Angles
                </h3>
                <div className="mt-4 grid gap-3 text-sm text-zinc-100">
                  <div className="rounded-xl bg-black/40 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Thumbnail Concepts
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.metadata.thumbnailConcepts.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-black/40 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Shorts Hooks
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.metadata.shortsAngles.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-black/40 p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Retention Devices
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.metadata.retentionDevices.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  B-Roll + Overlay
                </h3>
                <ul className="mt-3 grid gap-2 text-sm text-zinc-100">
                  {plan.metadata.bRollIdeas.map((item, index) => (
                    <li key={index} className="rounded-xl bg-black/40 p-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Automation Workflow
                </h3>
                <div className="mt-4 grid gap-3 text-sm text-zinc-100">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Research Stack
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.workflow.researchStack.map((item, index) => (
                        <li key={index} className="rounded-xl bg-black/40 p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Automation Stack
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.workflow.automationStack.map((item, index) => (
                        <li key={index} className="rounded-xl bg-black/40 p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Launch Workflow
                </h3>
                <div className="mt-4 grid gap-3 text-sm text-zinc-100">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Production Flow
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.workflow.productionWorkflow.map((item, index) => (
                        <li key={index} className="rounded-xl bg-black/40 p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Publishing Checklist
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.workflow.publishingChecklist.map((item, index) => (
                        <li key={index} className="rounded-xl bg-black/40 p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-zinc-500">
                      Repurposing System
                    </p>
                    <ul className="mt-2 grid gap-2">
                      {plan.workflow.repurposingSystem.map((item, index) => (
                        <li key={index} className="rounded-xl bg-black/40 p-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-blue-500/10 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                Post-Publish Attack Plan
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-blue-50 md:grid-cols-2">
                {plan.postPublishActions.map((item, index) => (
                  <li key={index} className="rounded-xl bg-black/30 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
