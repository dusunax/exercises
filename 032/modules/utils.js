import { QUERY_KEYS } from "./config.js";

export function getInitialUsernameFromQuery() {
  const pathSegments = window.location.pathname
    .split("/")
    .filter(Boolean);

  const statsIndex = pathSegments.indexOf("stats");
  if (statsIndex !== -1 && pathSegments[statsIndex + 1]) {
    const pathUsername = normalizeUsername(pathSegments[statsIndex + 1]);
    if (isValidUsername(pathUsername)) {
      return pathUsername;
    }
  }

  const params = new URLSearchParams(window.location.search);
  for (const key of QUERY_KEYS) {
    const value = params.get(key);
    if (value) {
      return normalizeUsername(value.trim());
    }
  }
  return "";
}

function normalizeUsername(value) {
  const v = String(value || "").trim();
  if (!v) return "";
  return v.replace(/^@/, "");
}

export function parseUsernameFromText(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  try {
    const parsedUrl = new URL(raw, window.location.origin);
    const userFromQuery = QUERY_KEYS.map((key) => parsedUrl.searchParams.get(key)).find(Boolean);
    if (userFromQuery) {
      return normalizeUsername(userFromQuery);
    }

    const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment && lastSegment !== "stats") {
      const maybeUser = normalizeUsername(lastSegment);
      if (isValidUsername(maybeUser)) {
        return maybeUser;
      }
    }
  } catch {
    // keep fallback below
  }

  return normalizeUsername(raw);
}

export function isValidUsername(value) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(value);
}

export function getCurrentYearRange() {
  const year = new Date().getFullYear();
  return {
    year,
    start: `${year}-01-01`,
    end: `${year}-12-31`,
    yearKey: String(year),
  };
}

export function safeToString(value) {
  return String(value ?? "-");
}

export function getValidatedUsername(rawInput) {
  const username = parseUsernameFromText(rawInput);
  if (!username) {
    return { ok: false, message: "Please enter a GitHub username.", status: "Input is empty." };
  }
  if (!isValidUsername(username)) {
    return {
      ok: false,
      message:
        "Invalid GitHub username. Use letters, numbers, and '-' only. Username cannot start or end with '-'.",
      status: "Check the username format.",
    };
  }
  return { ok: true, username };
}
