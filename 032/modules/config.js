export const QUERY_KEYS = ["user", "username", "u"];
export const MAX_EVENT_PAGES = 10;
export const initialText = "No output yet.";

export const API_HEADERS = {
  Accept: "application/vnd.github+json",
};

export const SEARCH_HEADERS = {
  ...API_HEADERS,
  Accept: "application/vnd.github.cloak-preview+json",
};

export const API_FETCH_OPTIONS = {
  headers: API_HEADERS,
  cache: "no-store",
};

export const SEARCH_FETCH_OPTIONS = {
  headers: SEARCH_HEADERS,
  cache: "no-store",
};
