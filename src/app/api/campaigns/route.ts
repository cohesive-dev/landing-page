import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { getApiKey, unauthorizedResponse, sanitizeError } from "@/app/api/utils";

export async function GET(request: NextRequest) {
  try {
    const apiKey = getApiKey(request);
    if (!apiKey) return unauthorizedResponse();

    const query = new URLSearchParams();
    query.set("platformOrganizationId", apiKey);

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/outreach/campaigns?${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      Sentry.captureException(new Error(`Campaigns error: ${res.status}`), {
        extra: { data },
      });
      return NextResponse.json(sanitizeError(data), { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("DEBUG", error);
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
