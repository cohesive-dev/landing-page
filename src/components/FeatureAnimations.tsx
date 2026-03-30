"use client";

export function ScheduleAnim() {
  return (
    <div className="w-full h-40 bg-[#f8f9ff] rounded-xl mb-5 overflow-hidden relative flex items-end justify-center gap-2 px-6 pb-4">
      {/* Calendar slots animating in */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex-1 rounded-lg bg-[#2141EC]/10 border border-[#2141EC]/20 relative overflow-hidden"
          style={{
            height: `${40 + i * 15}%`,
            animation: `slideUp 2s ease-out ${i * 0.15}s infinite`,
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#2141EC]/30 rounded-b-lg"
            style={{
              height: `${30 + i * 10}%`,
              animation: `pulse 3s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        </div>
      ))}
      {/* Route line */}
      <svg className="absolute top-4 left-6 right-6 h-8 opacity-30" viewBox="0 0 200 30">
        <path d="M0,15 Q50,0 100,15 T200,15" fill="none" stroke="#2141EC" strokeWidth="2" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
        </path>
        <circle r="3" fill="#2141EC">
          <animateMotion dur="3s" repeatCount="indefinite" path="M0,15 Q50,0 100,15 T200,15" />
        </circle>
      </svg>
    </div>
  );
}

export function CustomerAnim() {
  return (
    <div className="w-full h-40 bg-[#f8f9ff] rounded-xl mb-5 overflow-hidden relative flex items-center justify-center">
      {/* Contact cards stacking */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute bg-white rounded-lg shadow-md border border-gray-100 p-3 flex items-center gap-3"
          style={{
            width: '70%',
            transform: `translateY(${(i - 1) * 28}px) scale(${1 - i * 0.05})`,
            opacity: 1 - i * 0.2,
            animation: `cardStack 4s ease-in-out ${i * 0.5}s infinite`,
            zIndex: 3 - i,
          }}
        >
          <div className="w-8 h-8 rounded-full bg-[#2141EC]/15 shrink-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#2141EC]/40" />
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded w-3/4 mb-1.5" />
            <div className="h-1.5 bg-gray-100 rounded w-1/2" />
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function EstimateAnim() {
  return (
    <div className="w-full h-40 bg-[#f8f9ff] rounded-xl mb-5 overflow-hidden relative flex items-center justify-center p-5">
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        {/* Typing estimate lines */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-between items-center mb-2 last:mb-0">
            <div
              className="h-2 bg-gray-200 rounded"
              style={{
                width: `${45 + i * 10}%`,
                animation: `expandWidth 2s ease-out ${i * 0.3}s infinite`,
              }}
            />
            <div
              className="h-2 bg-[#2141EC]/20 rounded w-12"
              style={{ animation: `fadeInOut 2s ease-in-out ${i * 0.3 + 0.5}s infinite` }}
            />
          </div>
        ))}
        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
          <div className="h-2.5 bg-gray-300 rounded w-16" />
          <div className="h-2.5 bg-[#2141EC]/40 rounded w-20" style={{ animation: `fadeInOut 2s ease-in-out 1.2s infinite` }} />
        </div>
      </div>
    </div>
  );
}

export function InvoiceAnim() {
  return (
    <div className="w-full h-40 bg-[#f8f9ff] rounded-xl mb-5 overflow-hidden relative flex items-center justify-center">
      {/* Invoice flying in */}
      <div className="relative" style={{ animation: 'invoiceSlide 3s ease-in-out infinite' }}>
        <div className="w-28 bg-white rounded-lg shadow-lg border border-gray-100 p-3">
          <div className="h-1.5 bg-[#2141EC]/30 rounded w-full mb-2" />
          <div className="h-1 bg-gray-100 rounded w-3/4 mb-1" />
          <div className="h-1 bg-gray-100 rounded w-1/2 mb-2" />
          <div className="h-px bg-gray-200 mb-2" />
          <div className="flex justify-between">
            <div className="h-1.5 bg-gray-200 rounded w-8" />
            <div className="h-1.5 bg-green-400 rounded w-10" />
          </div>
        </div>
      </div>
      {/* Checkmark appearing */}
      <svg className="absolute right-8 top-6 w-8 h-8 text-green-500" style={{ animation: 'checkPop 3s ease-in-out 1s infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

export function AnalyticsAnim() {
  return (
    <div className="w-full h-40 bg-[#f8f9ff] rounded-xl mb-5 overflow-hidden relative flex items-end justify-center gap-3 px-6 pb-5">
      {/* Animated bar chart */}
      {[35, 55, 45, 70, 60, 80, 50].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-[#2141EC]/20 relative overflow-hidden" style={{
          height: `${h}%`,
          animation: `growBar 2.5s ease-out ${i * 0.1}s infinite`,
        }}>
          <div className="absolute bottom-0 left-0 right-0 bg-[#2141EC]/40 rounded-t-md" style={{
            height: `${60 + ((i * 17 + 7) % 30)}%`,
            animation: `growBar 2.5s ease-out ${i * 0.1 + 0.2}s infinite`,
          }} />
        </div>
      ))}
      {/* Trend line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
        <polyline
          points="10,70 40,50 70,60 100,35 130,42 160,25 190,30"
          fill="none"
          stroke="#2141EC"
          strokeWidth="2"
          opacity="0.5"
          strokeDasharray="200"
          style={{ animation: 'drawLine 3s ease-out infinite' }}
        />
      </svg>
    </div>
  );
}

export function MobileAnim() {
  return (
    <div className="w-full h-40 bg-[#f8f9ff] rounded-xl mb-5 overflow-hidden relative flex items-center justify-center">
      {/* Phone outline */}
      <div className="w-20 h-32 bg-white rounded-2xl border-2 border-gray-200 relative overflow-hidden shadow-lg" style={{ animation: 'phoneBounce 3s ease-in-out infinite' }}>
        {/* Screen content */}
        <div className="absolute top-3 left-2 right-2 bottom-3 bg-[#f8f9ff] rounded-lg p-1.5">
          {/* Notification sliding in */}
          <div className="bg-[#2141EC]/10 rounded p-1 mb-1" style={{ animation: 'slideRight 2.5s ease-out infinite' }}>
            <div className="h-1 bg-[#2141EC]/30 rounded w-3/4 mb-0.5" />
            <div className="h-0.5 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="bg-green-50 rounded p-1 mb-1" style={{ animation: 'slideRight 2.5s ease-out 0.3s infinite' }}>
            <div className="h-1 bg-green-300 rounded w-2/3 mb-0.5" />
            <div className="h-0.5 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="bg-orange-50 rounded p-1" style={{ animation: 'slideRight 2.5s ease-out 0.6s infinite' }}>
            <div className="h-1 bg-orange-300 rounded w-3/5 mb-0.5" />
            <div className="h-0.5 bg-gray-200 rounded w-2/5" />
          </div>
        </div>
        {/* Home bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-300 rounded-full" />
      </div>
      {/* Signal waves */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#2141EC]/20"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            animation: `ripple 3s ease-out ${i * 0.4}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
