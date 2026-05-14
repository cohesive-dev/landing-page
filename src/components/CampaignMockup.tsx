"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import MockupSidebar from "./MockupSidebar";

type DailyVolume = { date: string; sent: number; replied: number };

const DAILY_VOLUME: DailyVolume[] = [
  { date: "Apr 28", sent: 612, replied: 22 },
  { date: "Apr 29", sent: 740, replied: 31 },
  { date: "Apr 30", sent: 690, replied: 28 },
  { date: "May 01", sent: 820, replied: 36 },
  { date: "May 02", sent: 905, replied: 42 },
  { date: "May 03", sent: 488, replied: 19 },
  { date: "May 06", sent: 1020, replied: 47 },
  { date: "May 07", sent: 980, replied: 41 },
  { date: "May 08", sent: 1110, replied: 53 },
  { date: "May 09", sent: 1042, replied: 48 },
  { date: "May 10", sent: 1180, replied: 58 },
  { date: "May 12", sent: 1264, replied: 61 },
];

type ActivityType =
  | "Template & Email Changes"
  | "Follow-up Emails"
  | "Sending Health"
  | "Lead Refills";

type Activity = {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
};

const ACTIVITIES: Activity[] = [
  {
    type: "Template & Email Changes",
    title: "Refined opener for Bay Area cohort",
    description:
      "Detected 14% lower reply rate vs. control. Updated subject line and intro paragraph; reverted to baseline on weak performance.",
    time: "2h ago",
  },
  {
    type: "Follow-up Emails",
    title: "Sent follow-up nudge to 248 cold leads",
    description:
      "Cadence triggered 72 hours after the first send for leads with no open or reply. Personalized to last detected industry signal.",
    time: "5h ago",
  },
  {
    type: "Sending Health",
    title: "Throttled sends from inbox 3",
    description:
      "Bounce rate spiked above the 2% safety threshold. Paused that sender for 24 hours and redistributed volume across remaining inboxes.",
    time: "Yesterday",
  },
  {
    type: "Lead Refills",
    title: "Refilled 320 leads from local SMB pool",
    description:
      "Pool dropped below the 500-lead threshold. Pulled matching ICP within a 25-mile radius and queued enrichment.",
    time: "Yesterday",
  },
];

const PROMPT_TEXT =
  "I'm selling kitchen hood maintenance service to bars and restaurants in the Bay Area";
const TYPING_SPEED_MS = 28;
const STATUS_DURATION_MS = 1400;

const STATUS_STEPS = [
  "Finding relevant businesses",
  "Found 7,622 businesses matching your criteria",
  "Enriching emails",
  "Found 4,803 valid emails",
  "Drafting campaigns",
];

type Phase = "idle" | "typing" | "post-typing" | "thinking" | "dashboard";

export default function CampaignMockup() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setTimeout(() => setPhase("typing"), 500);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= PROMPT_TEXT.length) {
      const t = setTimeout(() => setPhase("post-typing"), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTypedChars((c) => c + 1), TYPING_SPEED_MS);
    return () => clearTimeout(t);
  }, [phase, typedChars]);

  useEffect(() => {
    if (phase !== "post-typing") return;
    const t = setTimeout(() => setPhase("thinking"), 300);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "thinking") return;
    if (statusIdx >= STATUS_STEPS.length - 1) {
      const t = setTimeout(() => setPhase("dashboard"), STATUS_DURATION_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStatusIdx((i) => i + 1), STATUS_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, statusIdx]);

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-xl overflow-hidden border border-black/10 ring-1 ring-black/[0.04] shadow-[0_30px_60px_-30px_rgba(11,18,32,0.25)]"
      style={{
        backgroundImage:
          "radial-gradient(80% 50% at 50% 0%, rgba(37,109,133,0.08), transparent 60%), linear-gradient(180deg, #ffffff 0%, #f4f5f8 100%)",
      }}
    >
      <div className="p-2 sm:p-3">
        <div className="flex h-[640px] rounded-lg overflow-hidden bg-gray-100 border border-black/[0.05]">
          <MockupSidebar selected="Email Campaign" />
          {phase === "dashboard" ? (
            <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar bg-[#FAF8F4] rounded-tl-xl rounded-bl-xl border-l border-black/[0.06]">
              <div className="p-5">
                <CampaignHeader
                  onReset={() => {
                    setPhase("idle");
                    setTypedChars(0);
                    setStatusIdx(0);
                    setTimeout(() => setPhase("typing"), 500);
                  }}
                />
                <KpiGrid />
                <VolumeChart />
                <AgentActivity />
              </div>
            </main>
          ) : (
            <PromptPanel
              phase={phase}
              typedChars={typedChars}
              statusIdx={statusIdx}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PromptPanel({
  phase,
  typedChars,
  statusIdx,
}: {
  phase: Phase;
  typedChars: number;
  statusIdx: number;
}) {
  const isIdle = phase === "idle";
  const showCursor = phase === "typing" || phase === "post-typing";
  const showStatus = phase === "thinking";
  const typedText = PROMPT_TEXT.slice(0, typedChars);

  return (
    <main className="flex-1 min-w-0 bg-white rounded-tl-xl rounded-bl-xl border-l border-black/[0.06] flex items-center justify-center px-16">
      <div className="w-full max-w-[640px] flex flex-col gap-3">
        <div className="border border-gray-200 rounded-2xl bg-white px-5 py-4 min-h-[140px] flex flex-col shadow-[0_8px_30px_-12px_rgba(11,18,32,0.12)]">
          <div className="flex-1">
            {isIdle ? (
              <span className="text-gray-400 text-[15px] leading-relaxed">
                Tell us what you sell and whom you want to sell to...
              </span>
            ) : (
              <span className="text-gray-900 text-[15px] leading-relaxed">
                {typedText}
                {showCursor && (
                  <span className="inline-block w-[2px] h-[1em] bg-[#0B1220] align-middle ml-[1px] animate-pulse" />
                )}
              </span>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <span className="inline-flex items-center gap-1.5 bg-[#0B1220] text-white px-4 py-2 rounded-full text-[12px]">
              Build my campaign
              <ArrowRightIcon />
            </span>
          </div>
        </div>

        <div className="min-h-[28px] flex items-center justify-center gap-3">
          {showStatus && (
            <>
              <Spinner />
              <span className="text-gray-700 text-[14px]">
                {STATUS_STEPS[statusIdx]}
              </span>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="2.5" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="#2F6FED"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CampaignHeader({ onReset }: { onReset: () => void }) {
  return (
    <div className="w-full flex items-center gap-3 bg-white px-4 py-3 border border-gray-200 mb-5">
      <button
        type="button"
        onClick={onReset}
        aria-label="Replay walkthrough"
        className="flex items-center text-[#0B1220] hover:text-[#2F6FED] transition-colors cursor-pointer"
      >
        <ArrowLeftIcon size={18} />
      </button>
      <h1 className="flex-1 text-left text-[14px] font-semibold text-[#0B1220] truncate">
        Spring Outreach — Bay Area SMB
      </h1>
      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Live
      </span>
      <span className="hidden md:inline-flex items-center text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
        Apr 28 – May 12
      </span>
    </div>
  );
}

function KpiGrid() {
  const replyRate = ((412 / 9840) * 100).toFixed(2);
  const bounceRate = ((89 / 12847) * 100).toFixed(2);
  const interestedRate = ((147 / 412) * 100).toFixed(1);

  return (
    <div className="w-full grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-5">
      <KpiCard label="Email Sent" value="12,847" />
      <KpiCard label="Leads Completed" value="1,304" />
      <KpiCard label="Leads In Progress" value="2,156" />
      <KpiCard
        label="Reply Rate"
        value="412 / 9,840"
        caption={`${replyRate}% reply rate`}
        barColor="bg-green-500"
        barPct={Number(replyRate)}
      />
      <KpiCard
        label="Email Bounces"
        value="89 / 12,847"
        caption={`${bounceRate}% bounce rate`}
        barColor="bg-red-500"
        barPct={Math.min(Number(bounceRate) * 30, 100)}
      />
      <KpiCard
        label="Interested Reply Rate"
        value="147 / 412"
        caption={`${interestedRate}% interested reply rate`}
        barColor="bg-purple-500"
        barPct={Number(interestedRate)}
      />
    </div>
  );
}

function KpiCard({
  label,
  value,
  caption,
  barColor,
  barPct,
}: {
  label: string;
  value: string;
  caption?: string;
  barColor?: string;
  barPct?: number;
}) {
  return (
    <div className="bg-white p-4 border border-gray-200">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-[11px] text-gray-500">{label}</h3>
      </div>
      <div className="pt-3">
        <div className="text-[1.5rem] font-semibold text-gray-900 tracking-tight leading-none">
          {value}
        </div>
        {caption && <p className="text-[10px] text-gray-500 mt-1.5">{caption}</p>}
        {barColor && barPct !== undefined && (
          <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100">
            <div
              className={`h-1.5 rounded-full ${barColor}`}
              style={{ width: `${barPct}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function VolumeChart() {
  const maxSent = Math.max(...DAILY_VOLUME.map((d) => d.sent));
  return (
    <div className="w-full bg-white border border-gray-200 p-4 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-600">
          <ChartBarIcon size={16} />
          <span>Daily Email Volume</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <LegendDot dotClassName="bg-white border border-[#0B1220]" label="Emails Sent" />
          <LegendDot dotClassName="bg-[#0B1220]" label="Replies" />
        </div>
      </div>
      <div className="relative h-[180px]">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-dashed border-gray-100" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-end gap-2 sm:gap-3 px-1">
          {DAILY_VOLUME.map((d) => {
            const sentH = (d.sent / maxSent) * 100;
            const repliedH = (d.replied / maxSent) * 100 * 8;
            return (
              <div
                key={d.date}
                className="flex-1 h-full flex items-end justify-center gap-1"
              >
                <div
                  style={{ height: `${sentH}%` }}
                  className="w-1/2 max-w-[14px] bg-white border border-[#0B1220]"
                  title={`${d.sent} sent`}
                />
                <div
                  style={{ height: `${Math.min(repliedH, 100)}%` }}
                  className="w-1/2 max-w-[14px] bg-[#0B1220]"
                  title={`${d.replied} replies`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex gap-2 sm:gap-3 px-1">
        {DAILY_VOLUME.map((d) => (
          <div
            key={d.date}
            className="flex-1 text-center text-[9px] text-gray-400 truncate"
          >
            {d.date}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ dotClassName, label }: { dotClassName: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 ${dotClassName}`} />
      <span>{label}</span>
    </span>
  );
}

function AgentActivity() {
  return (
    <div className="w-full bg-white border border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-600">
          <RunnerIcon size={16} />
          <span>Agent Activity</span>
        </div>
        <div className="text-[11px] text-gray-500 border border-gray-200 rounded-md px-2 py-1 flex items-center gap-1">
          All Activity
          <CaretDownIcon size={10} />
        </div>
      </div>
      <div className="flex flex-col">
        {ACTIVITIES.map((activity, i) => (
          <ActivityRow key={i} activity={activity} />
        ))}
      </div>
    </div>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  const meta = ACTIVITY_META[activity.type];
  return (
    <div className="p-4 border-t border-gray-100 first:border-t-0 flex gap-3">
      <div
        className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${meta.iconBg} ${meta.iconText}`}
      >
        {meta.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span
            className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${meta.badgeClass}`}
          >
            {activity.type}
          </span>
          <span className="text-[10px] text-gray-400">{activity.time}</span>
        </div>
        <div className="text-[12px] font-semibold text-gray-800 mb-0.5">
          {activity.title}
        </div>
        <div className="text-[11px] leading-[1.5] text-gray-600">
          {activity.description}
        </div>
      </div>
    </div>
  );
}

const ACTIVITY_META: Record<
  ActivityType,
  { icon: ReactNode; iconBg: string; iconText: string; badgeClass: string }
> = {
  "Template & Email Changes": {
    icon: <PencilIcon size={14} />,
    iconBg: "bg-blue-50",
    iconText: "text-blue-700",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  "Follow-up Emails": {
    icon: <SendIcon size={14} />,
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-700",
    badgeClass: "bg-emerald-50 text-emerald-700",
  },
  "Sending Health": {
    icon: <HeartbeatIcon size={14} />,
    iconBg: "bg-amber-50",
    iconText: "text-amber-700",
    badgeClass: "bg-amber-50 text-amber-700",
  },
  "Lead Refills": {
    icon: <UsersPlusIcon size={14} />,
    iconBg: "bg-purple-50",
    iconText: "text-purple-700",
    badgeClass: "bg-purple-50 text-purple-700",
  },
};

/* ---------- icons ---------- */

type IconProps = { size?: number };

function ArrowLeftIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ChartBarIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
}

function RunnerIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2" />
      <path d="M4 22l3-6 4-2-2-5 4 2 3 4 4-1" />
      <path d="M9 9l3-3 4 2" />
    </svg>
  );
}

function CaretDownIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PencilIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

function SendIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function HeartbeatIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function UsersPlusIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );
}
