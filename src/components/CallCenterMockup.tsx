"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import MockupSidebar from "./MockupSidebar";

type CallEntry = {
  kind: "call";
  direction: "outgoing" | "incoming";
  status: string;
  duration: string;
  timestamp: string;
  fromNumber: string;
  toNumber: string;
  summary: string;
};

type SmsEntry = {
  kind: "sms";
  direction: "outgoing" | "incoming";
  timestamp: string;
  fromNumber: string;
  toNumber: string;
  text: string;
};

type Entry = CallEntry | SmsEntry;

const ACCOUNT = {
  name: "Coastline Auto Repair",
  phone: "(415) 555-0142",
  campaign: "Spring Service Outreach — SF",
  status: "ACTIVE",
};

const AGENT_NUMBER = "+1 (415) 555-0102";
const CUSTOMER_NUMBER = "+1 (415) 555-0142";

const ENTRIES: Entry[] = [
  {
    kind: "call",
    direction: "outgoing",
    status: "completed",
    duration: "4m 12s",
    timestamp: "Apr 28, 11:14 AM",
    fromNumber: AGENT_NUMBER,
    toNumber: CUSTOMER_NUMBER,
    summary:
      "AI agent introduced Cohesive's preventive maintenance package. Marco (owner) confirmed they're due for a renewal and asked for pricing in writing. Agreed to a walkthrough.",
  },
  {
    kind: "sms",
    direction: "outgoing",
    timestamp: "Apr 28, 11:21 AM",
    fromNumber: AGENT_NUMBER,
    toNumber: CUSTOMER_NUMBER,
    text:
      "Hi Marco — great chatting just now. Here's the pricing overview we discussed: cohesive.app/p/auto-care · Let me know if you'd like to set a time for the walkthrough.",
  },
  {
    kind: "sms",
    direction: "incoming",
    timestamp: "Apr 29, 09:02 AM",
    fromNumber: CUSTOMER_NUMBER,
    toNumber: AGENT_NUMBER,
    text:
      "Pricing looks fair. Can we do a walkthrough Friday morning? We're at 1480 Mission St.",
  },
  {
    kind: "sms",
    direction: "outgoing",
    timestamp: "Apr 29, 09:05 AM",
    fromNumber: AGENT_NUMBER,
    toNumber: CUSTOMER_NUMBER,
    text:
      "Friday 10am works on our end — calendar invite headed to this number. Estimator will call ~30 minutes before arrival.",
  },
  {
    kind: "call",
    direction: "outgoing",
    status: "voicemail",
    duration: "0m 42s",
    timestamp: "May 02, 09:30 AM",
    fromNumber: AGENT_NUMBER,
    toNumber: CUSTOMER_NUMBER,
    summary:
      "Reminder call before Friday's walkthrough. Reached voicemail. Followed up with SMS confirmation.",
  },
  {
    kind: "call",
    direction: "incoming",
    status: "completed",
    duration: "2m 18s",
    timestamp: "May 02, 02:48 PM",
    fromNumber: CUSTOMER_NUMBER,
    toNumber: AGENT_NUMBER,
    summary:
      "Marco called back to confirm the walkthrough. Asked about service-contract terms and rough proposal timeline; agent committed to follow-up email by EOD.",
  },
];

const DESIGN_W = 1280;
const DESIGN_H = 668;

export default function CallCenterMockup() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / DESIGN_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: `${DESIGN_W}px`,
          height: `${DESIGN_H}px`,
          transform: `scale(${scale})`,
        }}
      >
        <div
          className="relative rounded-xl overflow-hidden border border-black/10 ring-1 ring-black/[0.04] shadow-[0_30px_60px_-30px_rgba(11,18,32,0.25)] w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(80% 50% at 50% 0%, rgba(37,109,133,0.08), transparent 60%), linear-gradient(180deg, #ffffff 0%, #f4f5f8 100%)",
          }}
        >
          <div className="p-3 h-full">
            <div className="flex h-full rounded-lg overflow-hidden bg-gray-100 border border-black/[0.05]">
              <MockupSidebar selected="Call Center" forceShow />
              <main className="flex-1 min-w-0 bg-white rounded-tl-xl rounded-bl-xl border-l border-black/[0.06] flex flex-col">
                <ConversationView />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationView() {
  return (
    <div className="flex-1 min-h-0 flex flex-col text-gray-700 text-xs bg-white px-5 py-4">
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <BackLink />
        <AccountCard />
        <DateFilter />
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1">
          <div className="flex flex-col gap-3">
            {ENTRIES.map((entry, i) =>
              entry.kind === "call" ? (
                <CallBubble key={i} entry={entry} />
              ) : (
                <SmsBubble key={i} entry={entry} />
              )
            )}
          </div>
        </div>
        <ReplyComposer />
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <div className="flex items-center gap-2 text-gray-600 w-fit">
      <ArrowLeftIcon size={14} />
      <span className="text-[11px]">Back to all leads</span>
    </div>
  );
}

function AccountCard() {
  return (
    <div className="bg-white border border-gray-200 p-4 flex flex-col gap-1">
      <h2 className="text-[13px] font-semibold text-black">{ACCOUNT.name}</h2>
      <span className="text-gray-500 text-[11px]">{ACCOUNT.phone}</span>
      <span className="text-gray-500 text-[11px] mt-1">
        Campaign:{" "}
        <span className="text-gray-800">{ACCOUNT.campaign}</span>
        {" · "}
        <span className="uppercase tracking-wide text-[10px] text-gray-600">
          {ACCOUNT.status}
        </span>
      </span>
    </div>
  );
}

function DateFilter() {
  return (
    <div className="flex items-center gap-2 flex-wrap text-[11px]">
      <span className="text-gray-600">Filter by date:</span>
      <span className="flex items-center gap-1 text-gray-600">
        <span>From</span>
        <span className="px-2 py-1.5 border border-gray-300 bg-white text-gray-700">
          04/28/2025
        </span>
      </span>
      <span className="flex items-center gap-1 text-gray-600">
        <span>To</span>
        <span className="px-2 py-1.5 border border-gray-300 bg-white text-gray-700">
          05/12/2025
        </span>
      </span>
    </div>
  );
}

function CallBubble({ entry }: { entry: CallEntry }) {
  const isOutbound = entry.direction === "outgoing";
  return (
    <div className={`flex ${isOutbound ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[55%] rounded border border-gray-200 p-3 flex flex-col gap-2 bg-white text-[11px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <PhoneIcon size={12} />
            <span className="font-medium capitalize">{entry.direction} call</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">{entry.duration}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600 capitalize">{entry.status}</span>
          </div>
          <span className="text-gray-500 whitespace-nowrap text-[10px]">
            {entry.timestamp}
          </span>
        </div>
        <div className="text-[10px] text-gray-500">
          {entry.fromNumber} → {entry.toNumber}
        </div>
        <FakeAudioPlayer />
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] uppercase tracking-wide text-gray-500">
            Summary
          </span>
          <div className="text-gray-700 leading-snug">{entry.summary}</div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-[10px]">
          <CaretDownIcon size={10} />
          <span className="underline">Show transcript</span>
        </div>
      </div>
    </div>
  );
}

function SmsBubble({ entry }: { entry: SmsEntry }) {
  const isOutbound = entry.direction === "outgoing";
  return (
    <div className={`flex ${isOutbound ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[70%] rounded px-4 py-2.5 flex flex-col gap-1 ${isOutbound ? "bg-black text-white" : "bg-gray-100 text-black"
          }`}
      >
        <div className="flex items-center gap-2 text-[10px] opacity-70">
          <ChatIcon size={11} />
          <span className="capitalize">{entry.direction} SMS</span>
          <span>·</span>
          <span>{entry.timestamp}</span>
        </div>
        <span className="whitespace-pre-wrap text-[12px] leading-snug">
          {entry.text}
        </span>
        <div className="text-[10px] opacity-60">
          {entry.fromNumber} → {entry.toNumber}
        </div>
      </div>
    </div>
  );
}

function FakeAudioPlayer() {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-2 py-1">
      <span className="w-5 h-5 rounded-full bg-[#0B1220] text-white flex items-center justify-center">
        <PlayIcon size={9} />
      </span>
      <div className="flex-1 h-1 rounded-full bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-[#2F6FED]" />
      </div>
      <span className="text-[9px] text-gray-500">0:38 / 4:12</span>
    </div>
  );
}

function ReplyComposer() {
  return (
    <div className="bg-white border border-gray-200 p-3 flex flex-col gap-2 mt-1">
      <div className="flex items-end gap-2">
        <div className="flex-1 text-[11px] border border-gray-300 p-2.5 text-gray-400">
          Type a reply… (Cmd/Ctrl+Enter to send)
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className="flex items-center gap-1.5 px-3 py-2.5 text-[11px] text-white bg-black"
        >
          <SendIcon size={11} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- icons ---------- */

type IconProps = { size?: number };

function ArrowLeftIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function PhoneIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CaretDownIcon({ size = 10 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PlayIcon({ size = 9 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

function SendIcon({ size = 11 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M2 21l21-9L2 3l0 7 15 2-15 2 0 7z" />
    </svg>
  );
}
