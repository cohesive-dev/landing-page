import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import type { ForwardBody } from "@/app/api/types";
import { getApiKey, unauthorizedResponse, sanitizeError } from "@/app/api/utils";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  try {
    const apiKey = getApiKey(request);
    if (!apiKey) return unauthorizedResponse();

    const { campaignId } = await params;
    const body: ForwardBody = await request.json();

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/outreach/forward`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          senderEmail: body.senderEmail,
          campaignId,
          leadEmail: body.leadEmail,
          statsId: body.statsId,
          cc: body.cc ?? null,
          bcc: body.bcc ?? null,
          toEmails: body.toEmails,
          messageId: body.messageId,
          attachments: body.attachments ?? [],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      Sentry.captureException(new Error(`Forward error: ${res.status}`), {
        extra: { data },
      });
      return NextResponse.json(sanitizeError(data), { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
