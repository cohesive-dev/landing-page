"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const endpoints = [
  { id: "workflow", label: "Typical Workflow", section: "Guide" },
  { id: "campaigns", label: "Get Campaigns", section: "Campaigns" },
  { id: "inbox-all", label: "Get All Sent", section: "Inbox" },
  { id: "inbox-replies", label: "Get Replies", section: "Inbox" },
  { id: "conversation", label: "Conversation", section: "Inbox" },
  { id: "reply", label: "Reply", section: "Actions" },
  { id: "forward", label: "Forward", section: "Actions" },
  { id: "types", label: "Types", section: "Reference" },
];

type Lang = "curl" | "javascript" | "python";

const codeSamples: Record<string, Record<Lang, string>> = {
  campaigns: {
    curl: `curl -X GET \\
  -H "x-api-key: your_api_key_here" \\
  "https://getcohesiveai.com/api/campaigns"`,
    javascript: `const res = await fetch("/api/campaigns", {
  headers: { "x-api-key": "your_api_key_here" },
});
const data = await res.json();`,
    python: `import requests

res = requests.get(
    "https://getcohesiveai.com/api/campaigns",
    headers={"x-api-key": "your_api_key_here"},
)
data = res.json()`,
  },
  "inbox-all": {
    curl: `curl -X GET \\
  -H "x-api-key: your_api_key_here" \\
  "https://getcohesiveai.com/api/{campaignId}/inbox/all?offset=0&sortBy=date&search=acme"`,
    javascript: `const res = await fetch(
  \`/api/\${campaignId}/inbox/all?offset=0&sortBy=date&search=acme\`,
  { headers: { "x-api-key": "your_api_key_here" } }
);
const data = await res.json();`,
    python: `import requests

res = requests.get(
    f"https://getcohesiveai.com/api/{campaign_id}/inbox/all",
    params={"offset": 0, "sortBy": "date", "search": "acme"},
    headers={"x-api-key": "your_api_key_here"},
)
data = res.json()`,
  },
  "inbox-replies": {
    curl: `curl -X GET \\
  -H "x-api-key: your_api_key_here" \\
  "https://getcohesiveai.com/api/{campaignId}/inbox/replies?offset=0&isInterested=true"`,
    javascript: `const res = await fetch(
  \`/api/\${campaignId}/inbox/replies?offset=0&isInterested=true\`,
  { headers: { "x-api-key": "your_api_key_here" } }
);
const data = await res.json();`,
    python: `import requests

res = requests.get(
    f"https://getcohesiveai.com/api/{campaign_id}/inbox/replies",
    params={"offset": 0, "isInterested": "true"},
    headers={"x-api-key": "your_api_key_here"},
)
data = res.json()`,
  },
  conversation: {
    curl: `curl -X GET \\
  -H "x-api-key: your_api_key_here" \\
  "https://getcohesiveai.com/api/{campaignId}/conversation?leadEmail=jane@example.com"`,
    javascript: `const res = await fetch(
  \`/api/\${campaignId}/conversation?leadEmail=jane@example.com\`,
  { headers: { "x-api-key": "your_api_key_here" } }
);
const data = await res.json();`,
    python: `import requests

res = requests.get(
    f"https://getcohesiveai.com/api/{campaign_id}/conversation",
    params={"leadEmail": "jane@example.com"},
    headers={"x-api-key": "your_api_key_here"},
)
data = res.json()`,
  },
  reply: {
    curl: `curl -X POST \\
  "https://getcohesiveai.com/api/{campaignId}/reply" \\
  -H "x-api-key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "senderEmail": "you@company.com",
    "replyEmailBody": "<p>Thanks for your interest!</p>",
    "originalEmailStatsId": "stat_123",
    "originalEmailMessageId": "msg_456",
    "originalEmailTime": "2025-01-15T10:30:00Z",
    "originalEmailBody": "<p>Original message</p>",
    "cc": null,
    "bcc": null,
    "leadEmail": "jane@example.com",
    "messageId": "msg_789",
    "attachments": []
  }'`,
    javascript: `const res = await fetch(\`/api/\${campaignId}/reply\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your_api_key_here",
  },
  body: JSON.stringify({
    senderEmail: "you@company.com",
    replyEmailBody: "<p>Thanks for your interest!</p>",
    originalEmailStatsId: "stat_123",
    originalEmailMessageId: "msg_456",
    originalEmailTime: "2025-01-15T10:30:00Z",
    originalEmailBody: "<p>Original message</p>",
    cc: null,
    bcc: null,
    leadEmail: "jane@example.com",
    messageId: "msg_789",
    attachments: [],
  }),
});
const data = await res.json();`,
    python: `import requests

res = requests.post(
    f"https://getcohesiveai.com/api/{campaign_id}/reply",
    headers={"x-api-key": "your_api_key_here"},
    json={
        "senderEmail": "you@company.com",
        "replyEmailBody": "<p>Thanks for your interest!</p>",
        "originalEmailStatsId": "stat_123",
        "originalEmailMessageId": "msg_456",
        "originalEmailTime": "2025-01-15T10:30:00Z",
        "originalEmailBody": "<p>Original message</p>",
        "cc": None,
        "bcc": None,
        "leadEmail": "jane@example.com",
        "messageId": "msg_789",
        "attachments": [],
    },
)
data = res.json()`,
  },
  forward: {
    curl: `curl -X POST \\
  "https://getcohesiveai.com/api/{campaignId}/forward" \\
  -H "x-api-key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "senderEmail": "you@company.com",
    "leadEmail": "jane@example.com",
    "statsId": "stat_123",
    "cc": null,
    "bcc": null,
    "toEmails": "team@company.com,manager@company.com",
    "messageId": "msg_789",
    "attachments": []
  }'`,
    javascript: `const res = await fetch(\`/api/\${campaignId}/forward\`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your_api_key_here",
  },
  body: JSON.stringify({
    senderEmail: "you@company.com",
    leadEmail: "jane@example.com",
    statsId: "stat_123",
    cc: null,
    bcc: null,
    toEmails: "team@company.com,manager@company.com",
    messageId: "msg_789",
    attachments: [],
  }),
});
const data = await res.json();`,
    python: `import requests

res = requests.post(
    f"https://getcohesiveai.com/api/{campaign_id}/forward",
    headers={"x-api-key": "your_api_key_here"},
    json={
        "senderEmail": "you@company.com",
        "leadEmail": "jane@example.com",
        "statsId": "stat_123",
        "cc": None,
        "bcc": None,
        "toEmails": "team@company.com,manager@company.com",
        "messageId": "msg_789",
        "attachments": [],
    },
)
data = res.json()`,
  },
};

function CurlIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function JsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.79 2.53-2.55v-5.78h-1.7v5.74c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83zm5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z" />
    </svg>
  );
}

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.914 0zM8.708 1.85c.578 0 1.048.47 1.048 1.053 0 .58-.47 1.053-1.048 1.053a1.055 1.055 0 01-1.048-1.053c0-.583.47-1.053 1.048-1.053z" />
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H11.98v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.451s-3.24-.052-3.24 3.148v5.292S5.72 24 12.086 24zm3.206-1.85a1.055 1.055 0 01-1.048-1.053c0-.58.47-1.053 1.048-1.053.578 0 1.048.47 1.048 1.053 0 .583-.47 1.053-1.048 1.053z" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CodeSample({ endpointId }: { endpointId: string }) {
  const [lang, setLang] = useState<Lang>("curl");
  const [copied, setCopied] = useState(false);
  const samples = codeSamples[endpointId];
  if (!samples) return null;

  const tabs: { key: Lang; label: string; icon: React.ReactNode }[] = [
    { key: "curl", label: "cURL", icon: <CurlIcon className="w-3.5 h-3.5" /> },
    { key: "javascript", label: "JavaScript", icon: <JsIcon className="w-3.5 h-3.5" /> },
    { key: "python", label: "Python", icon: <PythonIcon className="w-3.5 h-3.5" /> },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(samples[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e2e]">
      <div className="flex items-center justify-between border-b border-gray-700">
        <div className="flex">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setLang(t.key); setCopied(false); }}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${lang === t.key
                ? "bg-[#2a2a3e] text-white border-b-2 border-[#2141EC]"
                : "text-gray-400 hover:text-gray-200 hover:bg-[#2a2a3e]/50"
                }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 mr-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer rounded hover:bg-[#2a2a3e]"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="text-gray-300">{samples[lang]}</code>
      </pre>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  let color = "bg-gray-100 text-gray-600";

  if (type === "string") color = "bg-amber-50 text-amber-700";
  else if (type === "number") color = "bg-blue-50 text-blue-700";
  else if (type === "boolean") color = "bg-purple-50 text-purple-700";
  else if (type.includes("null")) color = "bg-rose-50 text-rose-600";
  else if (type.includes("[]")) color = "bg-teal-50 text-teal-700";
  else if (type.startsWith('"')) color = "bg-emerald-50 text-emerald-700";

  return (
    <code className={`text-xs px-1.5 py-0.5 rounded font-mono ${color}`}>
      {type}
    </code>
  );
}

function Endpoint({
  id,
  method,
  path,
  description,
  params,
  body,
  response,
  errorResponse,
}: {
  id: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  body?: { name: string; type: string; required: boolean; description: string }[];
  response?: { name: string; type: string; description: string }[];
  errorResponse?: { name: string; type: string; description: string }[];
}) {
  const methodColor =
    method === "GET"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div id={id} className="scroll-mt-24">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: endpoint details */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-200">
            <span className={`text-xs font-bold px-2.5 py-1 rounded ${methodColor}`}>
              {method}
            </span>
            <code className="text-sm font-mono text-gray-900">{path}</code>
          </div>
          <div className="px-5 py-4 space-y-4">
            <p className="text-gray-600 text-sm">{description}</p>

            {params && params.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Query Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Name</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Type</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Required</th>
                        <th className="text-left py-2 font-medium text-gray-500">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {params.map((p) => (
                        <tr key={p.name} className="border-b border-gray-100">
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{p.name}</code></td>
                          <td className="py-2 pr-4"><TypeBadge type={p.type} /></td>
                          <td className="py-2 pr-4 text-gray-600">{p.required ? "Yes" : "No"}</td>
                          <td className="py-2 text-gray-600">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {body && body.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Request Body <span className="font-normal text-gray-500">(JSON)</span>
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Field</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Type</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Required</th>
                        <th className="text-left py-2 font-medium text-gray-500">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {body.map((f) => (
                        <tr key={f.name} className="border-b border-gray-100">
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{f.name}</code></td>
                          <td className="py-2 pr-4"><TypeBadge type={f.type} /></td>
                          <td className="py-2 pr-4 text-gray-600">{f.required ? "Yes" : "No"}</td>
                          <td className="py-2 text-gray-600">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {response && response.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Response <span className="font-normal text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-700">200 OK</span>
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Field</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Type</th>
                        <th className="text-left py-2 font-medium text-gray-500">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {response.map((f) => (
                        <tr key={f.name} className="border-b border-gray-100">
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{f.name}</code></td>
                          <td className="py-2 pr-4"><TypeBadge type={f.type} /></td>
                          <td className="py-2 text-gray-600">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {errorResponse && errorResponse.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Error Response <span className="font-normal text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-700">4xx / 5xx</span>
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Field</th>
                        <th className="text-left py-2 pr-4 font-medium text-gray-500">Type</th>
                        <th className="text-left py-2 font-medium text-gray-500">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {errorResponse.map((f) => (
                        <tr key={f.name} className="border-b border-gray-100">
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{f.name}</code></td>
                          <td className="py-2 pr-4"><TypeBadge type={f.type} /></td>
                          <td className="py-2 text-gray-600">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: code sample */}
        <div className="xl:sticky xl:top-8 xl:self-start">
          <CodeSample endpointId={id} />
        </div>
      </div>
    </div>
  );
}

const campaignsResponse = [
  { name: "id", type: "string", description: "Campaign ID" },
  { name: "createdAt", type: "number", description: "Creation timestamp (ms)" },
  { name: "updatedAt", type: "number", description: "Last updated timestamp (ms)" },
  { name: "status", type: "CampaignStatus", description: "Campaign status" },
  { name: "creationStatus", type: "string", description: "Creation workflow status" },
  { name: "name", type: "string", description: "Campaign name" },
];

const inboxResponse = [
  { name: "leadEmail", type: "string", description: "Lead's email address" },
  { name: "leadName", type: "string", description: "Lead's display name" },
  { name: "category", type: '"reply" | "sent"', description: "Conversation category" },
  { name: "lastTimestamp", type: "number", description: "Timestamp of the last message (ms)" },
  { name: "isInterested", type: "boolean", description: "Whether the lead is marked as interested" },
  { name: "tagline", type: "string", description: "Short summary of the conversation" },
  { name: "tags", type: "string[]", description: "Tags applied to the conversation" },
];

const conversationResponse = [
  { name: "fromEmail", type: "string", description: "Sender email address" },
  { name: "toEmail", type: "string", description: "Recipient email address" },
  { name: "history", type: "CohesiveCampaignMessage[]", description: "Array of messages in the conversation" },
];

const messageResponse = [
  { name: "message", type: "string", description: "Success confirmation message" },
];

const errorResponseSchema = [
  { name: "error", type: "string", description: "Error message describing what went wrong" },
];

const sharedQueryParams = [
  { name: "offset", type: "number", required: false, description: "Pagination offset" },
  { name: "sortBy", type: "string", required: false, description: "Sort order for results" },
  { name: "search", type: "string", required: false, description: "Search filter" },
];

const attachmentNote = "Array of { url, filename, contentType }";

export default function ApiDocsPage() {
  const [active, setActive] = useState("workflow");
  const scrollingToRef = useRef<string | null>(null);

  useEffect(() => {
    const ids = endpoints.map((ep) => ep.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActive(id);
    scrollingToRef.current = id;
    setTimeout(() => {
      scrollingToRef.current = null;
    }, 800);
  };

  const grouped = endpoints.reduce<Record<string, typeof endpoints>>((acc, ep) => {
    (acc[ep.section] ??= []).push(ep);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fefdfd] flex flex-col" style={{ fontFamily: "var(--font-jakarta)" }}>
      <header className="py-6 pl-8 pr-6 lg:pr-8 border-b border-gray-100">
        <Link href="/" className="text-2xl font-normal italic text-[#2141EC]" style={{ fontFamily: "var(--font-playfair)" }}>
          Cohesive
        </Link>
      </header>

      <div className="flex-1 w-full flex">
        {/* Sidebar */}
        <nav className="hidden md:block w-80 shrink-0 border-r border-gray-100 py-8 pl-8 pr-6 sticky top-0 h-screen overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Endpoints</p>
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section}</p>
              <ul className="space-y-1">
                {items.map((ep) => {
                  const method = ep.id.startsWith("inbox") || ep.id === "conversation" || ep.id === "campaigns" ? "GET" : ep.id === "types" || ep.id === "workflow" ? "" : "POST";
                  const methodColor =
                    method === "GET"
                      ? "text-green-600"
                      : method === "POST"
                        ? "text-blue-600"
                        : "";
                  return (
                    <li key={ep.id}>
                      <a
                        href={`#${ep.id}`}
                        onClick={() => handleNavClick(ep.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${active === ep.id
                          ? "bg-[#2141EC]/5 text-[#2141EC] font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                      >
                        {method && (
                          <span className={`text-[10px] font-bold ${methodColor} w-8`}>{method}</span>
                        )}
                        {ep.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link href="/" className="text-sm text-[#2141EC] hover:underline">&larr; Back to home</Link>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 px-6 lg:px-12 py-8 min-w-0">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">API Documentation</h1>
            <p className="text-gray-500 mb-4">Reference for the Cohesive outreach API endpoints.</p>

            <section className="mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Base URL</h2>
              <code className="text-sm bg-gray-100 px-3 py-2 rounded block max-w-md">https://getcohesiveai.com/api</code>
              <p className="text-gray-500 text-sm mt-2">All endpoints are scoped to a campaign by its ID.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Authentication</h2>
              <p className="text-gray-600 text-sm mb-3">
                All requests must include an API key in the <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">x-api-key</code> header.
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e2e] max-w-md">
                <pre className="p-4 text-[13px] leading-relaxed">
                  <code className="text-gray-300">x-api-key: your_api_key_here</code>
                </pre>
              </div>
            </section>

            <section id="workflow" className="mb-10 scroll-mt-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Typical Workflow</h2>
              <p className="text-gray-600 text-sm mb-5">
                Most integrations follow this pattern to read conversations and take action on them:
              </p>
              <ol className="relative space-y-0 text-sm text-gray-700">
                {/* Connecting line */}
                <div className="absolute left-[15px] top-6 bottom-6 w-px bg-gradient-to-b from-[#2141EC]/30 via-[#2141EC]/20 to-[#2141EC]/30" />

                {[
                  {
                    step: 1,
                    title: "Fetch your campaigns",
                    body: (
                      <>
                        Call <a href="#campaigns" className="text-[#2141EC] hover:underline font-mono text-xs">GET /api/campaigns</a> to
                        list all campaigns and note the <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">id</code> of the campaign you want to work with.
                      </>
                    ),
                  },
                  {
                    step: 2,
                    title: "Browse the inbox",
                    body: (
                      <>
                        Use <a href="#inbox-all" className="text-[#2141EC] hover:underline font-mono text-xs">GET /api/&#123;campaignId&#125;/inbox/all</a> or <a href="#inbox-replies" className="text-[#2141EC] hover:underline font-mono text-xs">GET /api/&#123;campaignId&#125;/inbox/replies</a> to
                        see sent emails or replies. Each entry includes the <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">leadEmail</code> you will need for the next step.
                      </>
                    ),
                  },
                  {
                    step: 3,
                    title: "Get the full conversation",
                    body: (
                      <>
                        Call <a href="#conversation" className="text-[#2141EC] hover:underline font-mono text-xs">GET /api/&#123;campaignId&#125;/conversation?leadEmail=...</a> to
                        retrieve the complete email thread. The <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">history</code> array
                        contains every message with fields like <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">id</code> (message&nbsp;ID), <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">statsId</code>, <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">time</code>, and <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">emailBody</code>.
                      </>
                    ),
                  },
                  {
                    step: 4,
                    title: "Reply or forward",
                    body: (
                      <>
                        Use the values from the conversation thread to build your payload.
                        For <a href="#reply" className="text-[#2141EC] hover:underline font-mono text-xs">POST /api/&#123;campaignId&#125;/reply</a>, map
                        the message{"'"}s <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">statsId</code> {"->"}  <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">originalEmailStatsId</code>, <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">id</code> {"->"}  <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">originalEmailMessageId</code>, and so on.
                        For <a href="#forward" className="text-[#2141EC] hover:underline font-mono text-xs">POST /api/&#123;campaignId&#125;/forward</a>, pass
                        the <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">statsId</code> and <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">id</code> as <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">messageId</code> along with
                        the <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">toEmails</code> you want to forward to.
                      </>
                    ),
                  },
                ].map(({ step, title, body }) => (
                  <li key={step} className="relative flex gap-4 pb-4">
                    {/* Step number circle */}
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#2141EC] text-white text-xs font-bold shrink-0 shadow-sm shadow-[#2141EC]/25">
                      {step}
                    </span>
                    {/* Card */}
                    <div className="flex-1 border border-gray-200 rounded-lg px-5 py-4 bg-white shadow-sm hover:shadow-md hover:border-[#2141EC]/20 transition-all">
                      <p className="font-semibold text-gray-900 mb-1">{title}</p>
                      <p className="text-gray-500 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <div className="space-y-10">
              {/* Campaigns */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Campaigns</h2>
                <div className="space-y-6">
                  <Endpoint
                    id="campaigns"
                    method="GET"
                    path="/api/campaigns"
                    description="Fetch all campaigns. Returns an array of campaign objects."
                    response={campaignsResponse}
                    errorResponse={errorResponseSchema}
                  />
                </div>
              </section>

              {/* Inbox */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Inbox</h2>
                <div className="space-y-6">
                  <Endpoint
                    id="inbox-all"
                    method="GET"
                    path="/api/{campaignId}/inbox/all"
                    description="Fetch all sent emails for a campaign."
                    params={sharedQueryParams}
                    response={inboxResponse}
                    errorResponse={errorResponseSchema}
                  />
                  <Endpoint
                    id="inbox-replies"
                    method="GET"
                    path="/api/{campaignId}/inbox/replies"
                    description="Fetch all replies for a campaign."
                    params={[
                      ...sharedQueryParams,
                      { name: "isInterested", type: "string", required: false, description: 'Filter by interest status ("true" / "false")' },
                    ]}
                    response={inboxResponse}
                    errorResponse={errorResponseSchema}
                  />
                  <Endpoint
                    id="conversation"
                    method="GET"
                    path="/api/{campaignId}/conversation"
                    description="Fetch the full conversation history with a lead."
                    params={[
                      { name: "leadEmail", type: "string", required: true, description: "Email address of the lead" },
                    ]}
                    response={conversationResponse}
                    errorResponse={errorResponseSchema}
                  />
                </div>
              </section>

              {/* Actions */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="space-y-6">
                  <Endpoint
                    id="reply"
                    method="POST"
                    path="/api/{campaignId}/reply"
                    description="Send a reply to a conversation."
                    body={[
                      { name: "senderEmail", type: "string", required: true, description: "Email address of the sender" },
                      { name: "replyEmailBody", type: "string", required: true, description: "HTML body of the reply" },
                      { name: "originalEmailStatsId", type: "string", required: true, description: "Stats ID of the original email" },
                      { name: "originalEmailMessageId", type: "string", required: true, description: "Message ID of the original email" },
                      { name: "originalEmailTime", type: "string", required: true, description: "Timestamp of the original email" },
                      { name: "originalEmailBody", type: "string", required: true, description: "Body of the original email" },
                      { name: "cc", type: "string | null", required: false, description: "CC recipients" },
                      { name: "bcc", type: "string | null", required: false, description: "BCC recipients" },
                      { name: "leadEmail", type: "string", required: true, description: "Lead's email address" },
                      { name: "messageId", type: "string", required: true, description: "Message ID for threading" },
                      { name: "attachments", type: "Attachment[]", required: false, description: attachmentNote },
                    ]}
                    response={messageResponse}
                    errorResponse={errorResponseSchema}
                  />
                  <Endpoint
                    id="forward"
                    method="POST"
                    path="/api/{campaignId}/forward"
                    description="Forward a conversation to other recipients."
                    body={[
                      { name: "senderEmail", type: "string", required: true, description: "Email address of the sender" },
                      { name: "leadEmail", type: "string", required: true, description: "Lead's email address" },
                      { name: "statsId", type: "string", required: true, description: "Stats ID of the email to forward" },
                      { name: "cc", type: "string | null", required: false, description: "CC recipients" },
                      { name: "bcc", type: "string | null", required: false, description: "BCC recipients" },
                      { name: "toEmails", type: "string", required: true, description: "Comma-separated recipient email addresses" },
                      { name: "messageId", type: "string", required: true, description: "Message ID for threading" },
                      { name: "attachments", type: "Attachment[]", required: false, description: attachmentNote },
                    ]}
                    response={messageResponse}
                    errorResponse={errorResponseSchema}
                  />
                </div>
              </section>

              {/* Types */}
              <section id="types" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types</h2>

                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xl mb-4">
                  <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                    <code className="text-sm font-mono text-gray-900">CampaignStatus</code>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-600 mb-2">Enum of possible campaign statuses:</p>
                    <div className="flex flex-wrap gap-2">
                      {["DRAFTED", "ACTIVE", "COMPLETED", "STOPPED", "PAUSED", "ARCHIVED"].map((s) => (
                        <code key={s} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">&quot;{s}&quot;</code>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xl">
                  <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                    <code className="text-sm font-mono text-gray-900">Attachment</code>
                  </div>
                  <div className="px-5 py-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-4 font-medium text-gray-500">Field</th>
                          <th className="text-left py-2 pr-4 font-medium text-gray-500">Type</th>
                          <th className="text-left py-2 font-medium text-gray-500">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">url</code></td>
                          <td className="py-2 pr-4"><TypeBadge type="string" /></td>
                          <td className="py-2 text-gray-600">URL of the attachment file</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">filename</code></td>
                          <td className="py-2 pr-4"><TypeBadge type="string" /></td>
                          <td className="py-2 text-gray-600">Original file name</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">contentType</code></td>
                          <td className="py-2 pr-4"><TypeBadge type="string" /></td>
                          <td className="py-2 text-gray-600">MIME type (e.g. &quot;application/pdf&quot;)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xl mt-4">
                  <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                    <code className="text-sm font-mono text-gray-900">CohesiveCampaignMessage</code>
                  </div>
                  <div className="px-5 py-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 pr-4 font-medium text-gray-500">Field</th>
                          <th className="text-left py-2 pr-4 font-medium text-gray-500">Type</th>
                          <th className="text-left py-2 font-medium text-gray-500">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "type", type: "string", description: "Message type" },
                          { name: "id", type: "string", description: "Unique message identifier" },
                          { name: "time", type: "string", description: "Timestamp of the message" },
                          { name: "from", type: "string", description: "Sender email address" },
                          { name: "to", type: "string", description: "Recipient email address" },
                          { name: "emailBody", type: "string", description: "HTML body of the email" },
                          { name: "subject", type: "string", description: "Email subject line" },
                          { name: "emailSequenceNumber", type: "string | null", description: "Sequence number in the campaign" },
                          { name: "openCount", type: "number | null", description: "Number of times the email was opened" },
                          { name: "clickCount", type: "number | null", description: "Number of link clicks" },
                          { name: "campaignId", type: "string", description: "Associated campaign ID" },
                          { name: "statsId", type: "string", description: "Stats tracking ID" },
                          { name: "cc", type: "string[]", description: "CC recipients" },
                          { name: "bcc", type: "string[]", description: "BCC recipients" },
                          { name: "attachments", type: "Attachment[]", description: "File attachments" },
                        ].map((f) => (
                          <tr key={f.name} className="border-b border-gray-100">
                            <td className="py-2 pr-4"><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{f.name}</code></td>
                            <td className="py-2 pr-4"><TypeBadge type={f.type} /></td>
                            <td className="py-2 text-gray-600">{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
