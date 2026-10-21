import { NextRequest, NextResponse } from "next/server";
import { handleRoofingLeadSubmission } from "@/lib/roofing-leads";

// Destination: the Slack group DM (ROOFING_LEADS_SLACK_BOT_TOKEN + ROOFING_LEADS_SLACK_CHANNEL), else
// ROOFING_LEADS_WEBHOOK_URL. Neither set -> 503 and the page asks the visitor to email us.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "invalid", errors: {} }, { status: 400 });
  }

  const result = await handleRoofingLeadSubmission(body, process.env, fetch);
  return NextResponse.json(result.body, { status: result.status });
}
