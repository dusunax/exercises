import { API_FETCH_OPTIONS, SEARCH_FETCH_OPTIONS, MAX_EVENT_PAGES } from "./config.js";
import { getCurrentYearRange, safeToString } from "./utils.js";

async function fetchJson(url, fetchOptions, fallbackMessage) {
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`${fallbackMessage} (${response.status})`);
  }
  return response.json();
}

function toDateKey(dateInput) {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().slice(0, 10);
}

function getDateOffset(date, delta) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + delta);
  return next;
}

function calculateCurrentStreak(commitDateSet) {
  const now = new Date();
  let cursor = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  let streak = 0;

  while (streak < 365) {
    const key = toDateKey(cursor);
    if (!commitDateSet.has(key)) {
      break;
    }
    streak += 1;
    cursor = getDateOffset(cursor, -1);
  }

  return streak;
}

export async function fetchYearlyCommitCount(username, range) {
  const q = `author:${username} committer-date:${range.start}..${range.end}`;
  const url = `https://api.github.com/search/commits?q=${encodeURIComponent(q)}&per_page=1`;
  const data = await fetchJson(url, SEARCH_FETCH_OPTIONS, "커밋 조회 제한");
  return safeToString(data.total_count);
}

export async function fetchYearlyPRCount(username, range) {
  const q = `author:${username} type:pr created:${range.start}..${range.end}`;
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=1`;
  const data = await fetchJson(url, API_FETCH_OPTIONS, "PR 조회 제한");
  return safeToString(data.total_count);
}

export async function fetchYearlyIssueCount(username, range) {
  const q = `author:${username} type:issue created:${range.start}..${range.end}`;
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=1`;
  const data = await fetchJson(url, API_FETCH_OPTIONS, "이슈 조회 제한");
  return safeToString(data.total_count);
}

export async function fetchYearlyPublicEvents(username, yearKey) {
  let page = 1;
  let count = 0;
  let reachedOlder = false;

  while (page <= MAX_EVENT_PAGES) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100&page=${page}`;
    const events = await fetchJson(url, API_FETCH_OPTIONS, "이벤트 조회 제한");

    if (!Array.isArray(events) || events.length === 0) {
      break;
    }

    for (const event of events) {
      const created = typeof event.created_at === "string" ? event.created_at.slice(0, 4) : "";
      if (!created) continue;
      if (created < yearKey) {
        reachedOlder = true;
        break;
      }
      if (created === yearKey) {
        count += 1;
      }
    }

    if (reachedOlder || events.length < 100) break;
    page += 1;
  }

  return safeToString(count);
}

export async function fetchYearlyStreak(username) {
  const range = getCurrentYearRange();
  const startDate = new Date(`${range.start}T00:00:00Z`);
  const commitDates = new Set();
  let page = 1;
  let reachedOlder = false;

  while (page <= MAX_EVENT_PAGES) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100&page=${page}`;
    const events = await fetchJson(url, API_FETCH_OPTIONS, "스탯 조회 제한");

    if (!Array.isArray(events) || events.length === 0) {
      break;
    }

    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      if (!event.created_at) continue;

      const key = toDateKey(event.created_at);
      const eventDate = new Date(`${key}T00:00:00Z`);

      if (eventDate < startDate) {
        reachedOlder = true;
        break;
      }

      commitDates.add(key);
    }

    if (reachedOlder || events.length < 100) break;
    page += 1;
  }

  const streak = calculateCurrentStreak(commitDates);
  return safeToString(streak);
}

export async function fetchYearlyStats(username) {
  const range = getCurrentYearRange();
  const toNumeric = (value) => {
    const parsed = Number.parseInt(String(value || 0).replace(/[^\d-]/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const [commitsRes, prsRes, issuesRes, eventsRes, streakRes] = await Promise.allSettled([
    fetchYearlyCommitCount(username, range),
    fetchYearlyPRCount(username, range),
    fetchYearlyIssueCount(username, range),
    fetchYearlyPublicEvents(username, range.yearKey),
    // GitHub 잔디 기반 streak 계산은 공개 push 이벤트에서 추정
    fetchYearlyStreak(username),
  ]);

  const commits = toNumeric(commitsRes.status === "fulfilled" ? commitsRes.value : "0");
  const prs = toNumeric(prsRes.status === "fulfilled" ? prsRes.value : "0");
  const issues = toNumeric(issuesRes.status === "fulfilled" ? issuesRes.value : "0");

  const eventsFallback = safeToString(commits + prs + issues);

  return {
    year: range.year,
    commits: commitsRes.status === "fulfilled" ? commitsRes.value : safeToString("-"),
    prs: prsRes.status === "fulfilled" ? prsRes.value : safeToString("-"),
    issues: issuesRes.status === "fulfilled" ? issuesRes.value : safeToString("-"),
    publicEvents: eventsRes.status === "fulfilled" ? eventsRes.value : eventsFallback,
    streak: streakRes.status === "fulfilled" ? streakRes.value : safeToString("-"),
  };
}

export async function fetchProfileMetadata(username) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
  const response = await fetch(url, API_FETCH_OPTIONS);

  const fallbackAvatar = `https://github.com/${encodeURIComponent(username)}.png?size=320`;

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub 사용자 정보를 찾을 수 없습니다.");
    }

    return {
      login: username,
      name: username,
      avatarUrl: fallbackAvatar,
      profileUrl: `https://github.com/${username}`,
      isProfileUnavailable: true,
      company: "-",
      location: "-",
    };
  }

  const profile = await response.json();
  const normalizeProfileField = (value) => {
    const raw = safeToString(value).trim();
    if (!raw || raw === "-") return "-";
    return raw.trim();
  };

  return {
    login: profile.login || username,
    name: profile.name || profile.login || username,
    avatarUrl: profile.avatar_url || "",
    profileUrl: profile.html_url || `https://github.com/${username}`,
    company: normalizeProfileField(profile.company).replace(/^@/, ""),
    location: normalizeProfileField(profile.location),
  };
}
