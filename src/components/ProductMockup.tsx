"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import MockupSidebar from "./MockupSidebar";

type AccountStage =
  | "Interested"
  | "Not Interested"
  | "Won"
  | "Lost"
  | "Email Follow-up"
  | "Phone Follow-up"
  | "Prospect";

type AccountType = "Business" | "Residential";
type Source = "Yelp" | "LinkedIn" | "Google Maps" | "Referral" | "Web form";

type Account = {
  name: string;
  initials: string;
  avatarColor: string;
  owner: string;
  type: AccountType;
  domain: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  source: Source;
  updatedAt: string;
  stage: AccountStage;
  lastCall: { result: string; duration: string } | null;
};

const ACCOUNTS: Account[] = [
  {
    name: "Acme Cleaning Co.",
    initials: "AC",
    avatarColor: "bg-[#256D85]",
    owner: "Sarah Chen",
    type: "Business",
    domain: "acmecleaning.com",
    email: "billing@acmecleaning.com",
    phone: "(415) 555-0142",
    description: "Commercial janitorial services",
    address: "1820 Mission St, San Francisco",
    source: "Yelp",
    updatedAt: "11/12/25, 09:14 AM",
    stage: "Interested",
    lastCall: { result: "Connected", duration: "4m 22s" },
  },
  {
    name: "Bay Area HVAC Pros",
    initials: "BH",
    avatarColor: "bg-[#2F6FED]",
    owner: "Mike Rodriguez",
    type: "Business",
    domain: "bayhvac.com",
    email: "info@bayhvac.com",
    phone: "(510) 555-0188",
    description: "HVAC installation & repair",
    address: "2401 Telegraph Ave, Oakland",
    source: "Google Maps",
    updatedAt: "11/12/25, 08:02 AM",
    stage: "Email Follow-up",
    lastCall: { result: "Voicemail", duration: "0m 38s" },
  },
  {
    name: "Greenleaf Landscaping",
    initials: "GL",
    avatarColor: "bg-[#3F8F4F]",
    owner: "Priya Patel",
    type: "Business",
    domain: "greenleafsf.com",
    email: "contact@greenleafsf.com",
    phone: "(650) 555-0119",
    description: "Commercial landscaping & grounds",
    address: "980 El Camino Real, San Mateo",
    source: "LinkedIn",
    updatedAt: "11/11/25, 04:47 PM",
    stage: "Prospect",
    lastCall: null,
  },
  {
    name: "Sunrise Painting",
    initials: "SP",
    avatarColor: "bg-[#D97706]",
    owner: "Diego Alvarez",
    type: "Business",
    domain: "sunrisepainting.com",
    email: "hello@sunrisepainting.com",
    phone: "(408) 555-0173",
    description: "Interior & exterior painting",
    address: "1500 Stevens Creek, San Jose",
    source: "Referral",
    updatedAt: "11/12/25, 11:31 AM",
    stage: "Phone Follow-up",
    lastCall: { result: "Connected", duration: "6m 14s" },
  },
  {
    name: "ClearView Window Co.",
    initials: "CV",
    avatarColor: "bg-[#0EA5B7]",
    owner: "Jordan Lee",
    type: "Business",
    domain: "clearviewwindows.com",
    email: "sales@clearviewwindows.com",
    phone: "(415) 555-0156",
    description: "High-rise window cleaning",
    address: "88 Howard St, San Francisco",
    source: "Web form",
    updatedAt: "11/10/25, 02:18 PM",
    stage: "Interested",
    lastCall: { result: "Connected", duration: "3m 02s" },
  },
  {
    name: "Pacific Pest Control",
    initials: "PP",
    avatarColor: "bg-[#7C3AED]",
    owner: "Hannah Wu",
    type: "Business",
    domain: "pacpest.com",
    email: "info@pacpest.com",
    phone: "(925) 555-0102",
    description: "Commercial pest control",
    address: "600 Hartz Ave, Danville",
    source: "Yelp",
    updatedAt: "11/08/25, 10:09 AM",
    stage: "Won",
    lastCall: { result: "Booked demo", duration: "8m 47s" },
  },
  {
    name: "Goldstar Roofing",
    initials: "GR",
    avatarColor: "bg-[#B45309]",
    owner: "Tyler Brooks",
    type: "Business",
    domain: "goldstarroof.com",
    email: "bids@goldstarroof.com",
    phone: "(707) 555-0144",
    description: "Commercial roofing & exteriors",
    address: "3210 Sonoma Hwy, Santa Rosa",
    source: "Google Maps",
    updatedAt: "11/12/25, 10:51 AM",
    stage: "Prospect",
    lastCall: null,
  },
  {
    name: "Metro Plumbing Solutions",
    initials: "MP",
    avatarColor: "bg-[#475569]",
    owner: "Ravi Singh",
    type: "Business",
    domain: "metroplumbing.com",
    email: "service@metroplumbing.com",
    phone: "(415) 555-0167",
    description: "Commercial plumbing",
    address: "945 Bryant St, San Francisco",
    source: "LinkedIn",
    updatedAt: "11/11/25, 07:23 AM",
    stage: "Not Interested",
    lastCall: { result: "Connected", duration: "1m 08s" },
  },
  {
    name: "Apex Electrical Services",
    initials: "AE",
    avatarColor: "bg-[#EAB308]",
    owner: "Olivia Bennett",
    type: "Business",
    domain: "apexelectricbay.com",
    email: "estimates@apexelectricbay.com",
    phone: "(415) 555-0124",
    description: "Commercial electrical contracting",
    address: "275 Brannan St, San Francisco",
    source: "Web form",
    updatedAt: "11/12/25, 12:08 PM",
    stage: "Email Follow-up",
    lastCall: { result: "No answer", duration: "0m 12s" },
  },
  {
    name: "Harbor Kitchen Hood Co.",
    initials: "HK",
    avatarColor: "bg-[#0F766E]",
    owner: "Marcus Tan",
    type: "Business",
    domain: "harborhoodcleaning.com",
    email: "schedule@harborhoodcleaning.com",
    phone: "(510) 555-0193",
    description: "NFPA-96 hood & exhaust cleaning",
    address: "1840 Embarcadero, Oakland",
    source: "Referral",
    updatedAt: "11/12/25, 07:46 AM",
    stage: "Interested",
    lastCall: { result: "Booked demo", duration: "5m 31s" },
  },
];

const TABLE_COLUMNS = [
  "Name",
  "Owner",
  "Type",
  "Domain",
  "Email",
  "Phone",
  "Description",
  "Address",
  "Source",
  "Last Updated",
  "Stage",
  "Last Call",
];

const DESIGN_W = 1280;
const DESIGN_H = 668;

export default function ProductMockup() {
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
              <MockupSidebar selected="Accounts" forceShow />
              <MainPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MainPanel() {
  return (
    <main className="flex-1 min-w-0 overflow-hidden bg-white rounded-tl-xl rounded-bl-xl border-l border-black/[0.06]">
      <div className="w-full h-full flex flex-col p-4">
        <Toolbar />
        <TableCard />
        <Pagination />
      </div>
    </main>
  );
}

function Toolbar() {
  return (
    <div className="w-full flex flex-row justify-between mb-4 text-gray-700 text-[11px] bg-white border border-gray-300">
      <div className="flex flex-row gap-1 px-3 py-1.5">
        <ToolbarButton icon={<FunnelIcon />}>Filter</ToolbarButton>
        <ToolbarButton icon={<PhoneIcon size={14} />}>Dial</ToolbarButton>
        <ToolbarButton icon={<PhoneIcon size={14} />}>Parallel Dial</ToolbarButton>
        <ToolbarButton icon={<ChatSlashIcon size={14} />}>Add to DNC list</ToolbarButton>
      </div>
      <div className="flex items-center gap-1 px-3 py-1.5">
        <div className="flex items-center text-[11px] bg-gray-100 rounded-full p-0.5 mr-1">
          {(["all", "residential", "business"] as const).map((t) => (
            <span
              key={t}
              className={`px-3 py-1 rounded-full transition-colors ${
                t === "all"
                  ? "bg-white text-gray-900 shadow-sm font-medium"
                  : "text-gray-500"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <ToolbarButton icon={<StarIcon />}>View Interested</ToolbarButton>
        <ToolbarButton icon={<RefreshIcon />}>Refresh</ToolbarButton>
        <ToolbarButton icon={<DownloadIcon />}>Download</ToolbarButton>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="flex items-center justify-center gap-2 w-fit px-2 py-1.5 rounded-md hover:bg-gray-100">
      {icon}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}

function TableCard() {
  return (
    <div className="flex-1 min-h-0 w-full overflow-hidden bg-white border border-gray-300">
      <div className="h-full w-full overflow-x-auto overflow-y-auto no-scrollbar">
        <table className="w-full text-[11px] text-left text-black table-fixed min-w-[1500px]">
          <colgroup>
            <col className="w-[56px]" />
            <col className="w-[170px]" />
            <col className="w-[130px]" />
            <col className="w-[90px]" />
            <col className="w-[150px]" />
            <col className="w-[180px]" />
            <col className="w-[120px]" />
            <col className="w-[180px]" />
            <col className="w-[180px]" />
            <col className="w-[110px]" />
            <col className="w-[140px]" />
            <col className="w-[120px]" />
            <col className="w-[140px]" />
          </colgroup>
          <thead>
            <tr className="text-[11px] text-black h-[44px]">
              <th className="bg-white sticky top-0 z-10">
                <div className="flex flex-row gap-3 pl-4 items-center h-[44px] border-b border-gray-300">
                  <Checkbox />
                  <PhoneIcon size={14} />
                </div>
              </th>
              {TABLE_COLUMNS.map((header, i) => (
                <th key={header} className="bg-white sticky top-0 z-10">
                  <div className="flex items-center justify-start h-[44px] pl-4 pr-3 gap-1.5 border-b border-gray-300 text-gray-700">
                    <span>{header}</span>
                    {i === 0 && <CaretDownIcon size={10} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {ACCOUNTS.map((account) => (
              <tr
                key={account.email}
                className="group h-[48px] hover:bg-blue-50/50 transition-colors cursor-pointer"
              >
                <td className="relative">
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-[#2F6FED] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex h-[48px] pl-4 items-center">
                    <Checkbox />
                  </div>
                </td>
                <td className="px-4">
                  <div className="flex gap-2 items-center h-[48px]">
                    <div
                      className={`shrink-0 rounded-full w-6 h-6 ${account.avatarColor} text-white text-[9px] font-medium flex items-center justify-center`}
                    >
                      {account.initials}
                    </div>
                    <span className="truncate text-gray-900 group-hover:text-[#0B1220] group-hover:font-medium">
                      {account.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 truncate text-gray-700">{account.owner}</td>
                <td className="px-4">
                  <TypeBadge type={account.type} />
                </td>
                <td className="px-4 truncate text-gray-600">{account.domain}</td>
                <td className="px-4 truncate text-gray-600">{account.email}</td>
                <td className="px-4 truncate text-gray-600">{account.phone}</td>
                <td className="px-4 truncate text-gray-600">{account.description}</td>
                <td className="px-4 truncate text-gray-600">{account.address}</td>
                <td className="px-4 truncate text-gray-600">{account.source}</td>
                <td className="px-4 truncate text-gray-500">{account.updatedAt}</td>
                <td className="px-4">
                  <StageBadge stage={account.stage} />
                </td>
                <td className="px-4 truncate">
                  {account.lastCall ? (
                    <div className="flex flex-col leading-tight">
                      <span className="text-gray-800">{account.lastCall.result}</span>
                      <span className="text-gray-400 text-[10px]">
                        {account.lastCall.duration}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StageBadge({ stage }: { stage: AccountStage }) {
  const styles: Record<AccountStage, string> = {
    Interested: "text-green-800 bg-green-100",
    "Not Interested": "text-red-800 bg-red-100",
    Won: "text-green-800 bg-green-100",
    Lost: "text-red-800 bg-red-100",
    "Email Follow-up": "text-yellow-800 bg-yellow-100",
    "Phone Follow-up": "text-yellow-800 bg-yellow-100",
    Prospect: "text-blue-800 bg-blue-100",
  };
  return (
    <span
      className={`px-2 py-1 text-[10px] rounded-full w-fit inline-block whitespace-nowrap ${styles[stage]}`}
    >
      {stage}
    </span>
  );
}

function TypeBadge({ type }: { type: AccountType }) {
  const styles: Record<AccountType, string> = {
    Business: "text-slate-700 bg-slate-100 ring-slate-200",
    Residential: "text-amber-800 bg-amber-50 ring-amber-200",
  };
  return (
    <span
      className={`px-2 py-0.5 text-[10px] rounded-md w-fit inline-block whitespace-nowrap ring-1 ${styles[type]}`}
    >
      {type}
    </span>
  );
}

function Pagination() {
  return (
    <div className="mt-3 flex flex-row items-center gap-3 text-gray-800 text-[11px]">
      <CaretLeftIcon size={12} />
      <div className="w-[60px] px-3 py-1 border border-gray-300 flex items-center justify-between">
        <span>1</span>
        <CaretDownIcon size={10} />
      </div>
      <CaretRightIcon size={12} />
      <div className="text-[11px] text-gray-600">Page 1 of 4</div>
    </div>
  );
}

function Checkbox() {
  return (
    <span className="h-3.5 w-3.5 border border-gray-300 rounded-[3px] bg-white inline-block" />
  );
}

/* ---------- icons ---------- */

type IconProps = { size?: number };

function ChatSlashIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  );
}

function PhoneIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function FunnelIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function StarIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function RefreshIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function DownloadIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CaretLeftIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CaretRightIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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
