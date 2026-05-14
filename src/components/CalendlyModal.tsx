"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

const CALENDLY_URL =
  "https://calendly.com/cohesiveapp/cohesive-demo?embed_domain=getcohesiveai.com&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1";

const CalendlyModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-xl shadow-2xl overflow-hidden m-4"
        style={{ width: "calc(100vw - 2rem)", maxWidth: 500, height: "min(90vh, 800px)", minHeight: 600 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <iframe
          src={CALENDLY_URL}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Schedule a demo"
          style={{ display: "block" }}
        />
      </div>
    </div>,
    document.body
  );
};

export default CalendlyModal;
