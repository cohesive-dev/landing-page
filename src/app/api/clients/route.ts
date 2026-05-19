import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { getApiKey, unauthorizedResponse, sanitizeError } from "@/app/api/utils";

export async function GET(request: NextRequest) {
  try {
    const apiKey = getApiKey(request);
    if (!apiKey) return unauthorizedResponse();

    const res = await fetch(
      `${process.env.API_BASE_URL}/api/public/platform-organizations`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      Sentry.captureException(new Error(`Clients error: ${res.status}`), {
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
