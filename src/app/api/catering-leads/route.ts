import { NextRequest, NextResponse } from "next/server";
import { handleCateringLeadSubmission } from "@/lib/catering-leads";

// Destination: the Slack group DM (CATERING_LEADS_SLACK_BOT_TOKEN + CATERING_LEADS_SLACK_CHANNEL), else
// CATERING_LEADS_WEBHOOK_URL. Neither set -> 503 and the page asks the visitor to email us.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "invalid", errors: {} }, { status: 400 });
  }

  const result = await handleCateringLeadSubmission(body, process.env, fetch);
  return NextResponse.json(result.body, { status: result.status });
}
