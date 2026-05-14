import type { ReactNode } from "react";

export type SidebarItemLabel =
  | "Email Campaign"
  | "Do-Not-Contact"
  | "Accounts"
  | "Inbox"
  | "Call Center"
  | "Agents"
  | "Settings";

const SIDEBAR_ITEMS: { icon: ReactNode; label: SidebarItemLabel }[] = [
  { icon: <MegaphoneIcon />, label: "Email Campaign" },
  { icon: <ChatSlashIcon />, label: "Do-Not-Contact" },
  { icon: <UsersIcon />, label: "Accounts" },
  { icon: <InboxIcon />, label: "Inbox" },
  { icon: <PhoneIcon size={16} />, label: "Call Center" },
  { icon: <BrainIcon />, label: "Agents" },
  { icon: <GearIcon />, label: "Settings" },
];

export default function MockupSidebar({
  selected,
  forceShow = false,
}: {
  selected: SidebarItemLabel;
  forceShow?: boolean;
}) {
  return (
    <aside
      className={`${forceShow ? "flex" : "hidden md:flex"} w-[68px] flex-none flex-col bg-gray-100 text-neutral-800 relative`}
    >
      <div className="flex items-center justify-center p-4">
        <div className="w-7 h-7 rounded-md bg-[#0B1220] text-white flex items-center justify-center text-[11px] font-semibold tracking-tight">
          C
        </div>
        <button
          aria-hidden
          tabIndex={-1}
          className="absolute right-[-12px] top-6 rounded-full p-1.5 bg-white border border-gray-300"
        >
          <CaretRightIcon size={8} />
        </button>
      </div>

      <nav className="flex-1 mt-6">
        <div className="flex flex-col items-center gap-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isSelected = item.label === selected;
            return (
              <div key={item.label} className="group relative w-full flex justify-center">
                <div
                  className={`rounded-md p-2 transition-colors group-hover:bg-neutral-200 ${
                    isSelected ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="pointer-events-none absolute left-[calc(100%-4px)] top-1/2 -translate-y-1/2 z-30 whitespace-nowrap rounded-md bg-[#0B1220] px-2.5 py-1.5 text-[11px] font-medium text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-4 flex justify-center">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2F6FED] to-[#256D85] text-white flex items-center justify-center text-[10px] font-medium">
          KW
        </div>
      </div>
    </aside>
  );
}

/* ---------- icons ---------- */

type IconProps = { size?: number };

function MegaphoneIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
      <path d="M15 8a4 4 0 0 1 0 8" />
      <path d="M18 5a7 7 0 0 1 0 14" />
    </svg>
  );
}

function ChatSlashIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <line x1="4" y1="20" x2="20" y2="4" />
    </svg>
  );
}

function UsersIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function InboxIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
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

function GearIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function BrainIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 3.5 17.5a2.5 2.5 0 0 1-1.06-4.78 2.5 2.5 0 0 1 0-4.42A2.5 2.5 0 0 1 4 4.5a2.5 2.5 0 0 1 5.5-2.5z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 20.5 17.5a2.5 2.5 0 0 0 1.06-4.78 2.5 2.5 0 0 0 0-4.42A2.5 2.5 0 0 0 20 4.5a2.5 2.5 0 0 0-5.5-2.5z" />
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
