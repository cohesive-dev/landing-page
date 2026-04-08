import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import type { ConversationParams } from "@/app/api/types";
import { getApiKey, unauthorizedResponse, sanitizeError } from "@/app/api/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  try {
    const apiKey = getApiKey(request);
    if (!apiKey) return unauthorizedResponse();

    const { campaignId } = await params;
    const { searchParams } = request.nextUrl;

    const { leadEmail }: ConversationParams = {
      leadEmail: searchParams.get("leadEmail") ?? "",
    };

    const query = new URLSearchParams();
    query.set("campaignId", campaignId);
    if (leadEmail) query.set("leadEmail", leadEmail);

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/outreach/email?${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      Sentry.captureException(new Error(`Conversation error: ${res.status}`), {
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
