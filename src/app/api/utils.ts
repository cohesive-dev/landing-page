import { NextRequest, NextResponse } from "next/server";

export function getApiKey(request: NextRequest): string | null {
  return request.headers.get("x-api-key");
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json({ error: "Missing API key" }, { status: 401 });
}

export function sanitizeError(data: unknown): unknown {
  const json = JSON.stringify(data);
  const cleaned = json.replace(/smartlead|smart\s*lead/gi, "");
  return JSON.parse(cleaned);
}
