import "server-only";

/**
 * Composio integration — server-side only.
 * The key is read from the environment; it must never reach the client
 * bundle. Importing this module from a Client Component will fail the
 * build thanks to `server-only`.
 */

const BASE_URL = "https://backend.composio.dev/api/v3";

function apiKey(): string {
  const key = process.env.COMPOSIO_API_KEY;
  if (!key) {
    throw new Error(
      "COMPOSIO_API_KEY is not set. Add it to .env.local (see .env.example)."
    );
  }
  return key;
}

export function isComposioConfigured(): boolean {
  return Boolean(process.env.COMPOSIO_API_KEY);
}

export async function composioFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey(),
      ...init.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Composio ${res.status} on ${path}: ${body.slice(0, 300)}`);
  }
  return res.json() as Promise<T>;
}
