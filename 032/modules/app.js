import { dom } from "./dom.js";
import { appState } from "./state.js";
import { initialText } from "./config.js";
import {
  getInitialUsernameFromQuery,
  getValidatedUsername,
} from "./utils.js";
import { buildReadmeMarkdown } from "./builder.js";
import { fetchProfileMetadata, fetchYearlyStats } from "./api.js";
import { hideError, setCopyButtonsEnabled, setLoadingButtons, setStatus, showError } from "./view.js";
import { renderMarkdownToHtml } from "./preview.js";

function extractImageUrlFromMarkdown(markdownText) {
  const text = String(markdownText || "");
  const imageMatch = text.match(/!\[[^\]]*?\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  return imageMatch?.[1] || "";
}

function parseDataUrlToBlob(dataUrl) {
  if (!dataUrl.startsWith("data:")) {
    return null;
  }

  const [metadata, encodedData = ""] = dataUrl.split(",");
  const mime = /data:([^;]+)/.exec(metadata)?.[1] ?? "image/png";

  if (!encodedData) {
    return new Blob([], { type: mime });
  }

  if (metadata.includes(";base64")) {
    const binary = atob(encodedData);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
  }

  try {
    const text = decodeURIComponent(encodedData);
    return new Blob([text], { type: mime });
  } catch {
    return new Blob([encodedData], { type: mime });
  }
}

function sanitizeFilename(value) {
  return String(value || "github")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildDownloadFilename() {
  const username = sanitizeFilename(appState.lastUsername || "github-user");
  const year = appState.lastYear || new Date().getFullYear();
  return `${username}-github-stats-${year}.png`;
}

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(objectUrl);
}

export async function renderOutput(username, year, stats, profile) {
  const output = await buildReadmeMarkdown(username, year, stats, profile);
  dom.readmeOutput.textContent = output;
  dom.readmePreview.innerHTML = renderMarkdownToHtml(output);
  appState.lastUsername = username;
  appState.lastYear = year;
  appState.hasOutput = true;
  setCopyButtonsEnabled(true);
  if (profile?.isProfileUnavailable) {
    setStatus("Image generated.");
    return;
  }
  setStatus("Image generated.");
}

export function handleValidationError(validationResult) {
  showError(validationResult.message);
  setStatus(validationResult.status);
  appState.lastUsername = "";
  appState.hasOutput = false;
  setCopyButtonsEnabled(false);
}

export async function renderReadme() {
  hideError();
  const validation = getValidatedUsername(dom.urlInput.value);

  if (!validation.ok) {
    handleValidationError(validation);
    setLoadingButtons(false);
    return;
  }

  const username = validation.username;
  appState.hasOutput = false;
  setStatus("Loading yearly stats...");
  setLoadingButtons(true);

  try {
    const [stats, profile] = await Promise.all([
      fetchYearlyStats(username),
      fetchProfileMetadata(username),
    ]);
    await renderOutput(username, stats.year, stats, profile);
  } catch (error) {
    appState.hasOutput = false;
    setCopyButtonsEnabled(false);
    showError(error instanceof Error ? error.message : "Failed to load yearly stats.");
    setStatus("Fetch failed");
  } finally {
    setLoadingButtons(false);
  }
}

export async function copyReadme() {
  if (!appState.hasOutput) {
    setStatus("Generate image before copying.");
    return;
  }

  try {
    await navigator.clipboard.writeText(dom.readmeOutput.textContent || "");
    setStatus("Copied to clipboard.");
  } catch {
    showError("Failed to copy markdown.");
    setStatus("Copy failed");
  }
}

export async function downloadReadmeImage() {
  if (!appState.hasOutput) {
    setStatus("Generate image before download.");
    return;
  }

  const markdown = dom.readmeOutput.textContent || "";
  const imageUrl = extractImageUrlFromMarkdown(markdown);

  if (!imageUrl) {
    showError("Image URL not found.");
    setStatus("Download failed");
    return;
  }

  hideError();
  setStatus("Downloading image...");
  setLoadingButtons(true);

  try {
    const extension = "png";
    let blob;

    if (imageUrl.startsWith("data:")) {
      blob = parseDataUrlToBlob(imageUrl);
    } else {
      const response = await fetch(imageUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch image file.");
      }
      blob = await response.blob();
    }

    if (!blob || blob.size === 0) {
      throw new Error("Downloaded data is empty.");
    }

    downloadBlob(blob, buildDownloadFilename());
    setStatus(`Download completed (${extension.toUpperCase()})`);
  } catch {
    showError("Failed to download image.");
    setStatus("Download failed");
  } finally {
    setLoadingButtons(false);
    setCopyButtonsEnabled(appState.hasOutput);
  }
}

export function initEvents() {
  dom.renderBtn.addEventListener("click", renderReadme);
  dom.refreshBtn.addEventListener("click", renderReadme);
  dom.floatingRefreshBtn.addEventListener("click", renderReadme);
  dom.copyBtn.addEventListener("click", copyReadme);
  dom.floatingCopyBtn.addEventListener("click", copyReadme);
  dom.downloadBtn.addEventListener("click", downloadReadmeImage);
  dom.floatingDownloadBtn.addEventListener("click", downloadReadmeImage);
  dom.urlInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") renderReadme();
  });
}

export function init() {
  dom.readmeOutput.textContent = initialText;
  dom.readmePreview.innerHTML = renderMarkdownToHtml(initialText);
  appState.hasOutput = false;
  setLoadingButtons(false);

  const presetUsername = getInitialUsernameFromQuery();
  initEvents();

  if (presetUsername) {
    dom.urlInput.value = presetUsername;
    renderReadme();
  }
}
