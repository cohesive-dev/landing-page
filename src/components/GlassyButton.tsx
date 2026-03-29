"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CalendlyModal from "./CalendlyModal";

const CALENDLY_URL =
  "https://calendly.com/cohesiveapp/cohesive-demo?embed_domain=getcohesiveai.com&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1";

const GlassyButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center gap-2 bg-[#2141EC] text-white px-7 py-3.5 rounded-full font-semibold text-base tracking-wide shadow-[0_4px_20px_rgba(33,65,236,0.4)] hover:shadow-[0_6px_30px_rgba(33,65,236,0.55)] hover:scale-105 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        Request A Demo
        <svg
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
      {open && <CalendlyModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default GlassyButton;
