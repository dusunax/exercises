import { appState } from "./state.js";
import { dom } from "./dom.js";

export function setStatus(message) {
  if (dom.statusText) {
    dom.statusText.textContent = message;
  }
}

export function showError(message) {
  dom.errorBox.textContent = message;
  dom.errorBox.hidden = false;
}

export function hideError() {
  dom.errorBox.hidden = true;
  dom.errorBox.textContent = "";
}

export function setCopyButtonsEnabled(enabled) {
  dom.copyBtn.disabled = !enabled;
  dom.floatingCopyBtn.disabled = !enabled;
  dom.downloadBtn.disabled = !enabled;
  dom.floatingDownloadBtn.disabled = !enabled;
}

export function setLoadingButtons(isLoading) {
  dom.renderBtn.disabled = isLoading;
  dom.refreshBtn.disabled = isLoading;
  dom.floatingRefreshBtn.disabled = isLoading;
  setCopyButtonsEnabled(!isLoading && appState.hasOutput);
}
