import { buildVisualCardMarkdown } from "./graphics.js";

export async function buildReadmeMarkdown(username, year, stats, profile) {
  return buildVisualCardMarkdown(username, year, stats, profile || {});
}
