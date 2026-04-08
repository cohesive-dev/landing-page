import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import type { InboxRepliesParams } from "@/app/api/types";
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

    const { offset, sortBy, search, isInterested }: InboxRepliesParams = {
      offset: searchParams.get("offset") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      isInterested: searchParams.get("isInterested") ?? undefined,
    };

    const query = new URLSearchParams();
    query.set("campaignId", campaignId);
    query.set("category", "reply");

    if (offset) query.set("offset", offset);
    if (sortBy) query.set("sortBy", sortBy);
    if (search) query.set("search", search);
    if (isInterested) query.set("isInterested", isInterested);

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/outreach/inbox?${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      Sentry.captureException(new Error(`Inbox replies error: ${res.status}`), {
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
