import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import type { ReplyBody } from "@/app/api/types";
import { getApiKey, unauthorizedResponse, sanitizeError } from "@/app/api/utils";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  try {
    const apiKey = getApiKey(request);
    if (!apiKey) return unauthorizedResponse();

    const { campaignId } = await params;
    const body: ReplyBody = await request.json();

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/outreach/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          senderEmail: body.senderEmail,
          campaignId,
          replyEmailBody: body.replyEmailBody,
          originalEmailStatsId: body.originalEmailStatsId,
          originalEmailMessageId: body.originalEmailMessageId,
          originalEmailTime: body.originalEmailTime,
          originalEmailBody: body.originalEmailBody,
          cc: body.cc ?? null,
          bcc: body.bcc ?? null,
          leadEmail: body.leadEmail,
          messageId: body.messageId,
          attachments: body.attachments ?? [],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      Sentry.captureException(new Error(`Reply error: ${res.status}`), {
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
