const CARD_WIDTH = 1200;
const CARD_HEIGHT = 744;
const RATIO = Math.min(window.devicePixelRatio || 1, 2);

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width * RATIO;
  canvas.height = height * RATIO;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  context.scale(RATIO, RATIO);
  return { canvas, context };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toNumber(value) {
  const normalized = String(value || 0).replace(/[^\d-]/g, "");
  const num = Number.parseInt(normalized, 10);
  return Number.isFinite(num) ? num : 0;
}

function calculateRPGMetrics(commits, prs, issues, events, streak) {
  const hp = Math.max(60, Math.round(220 + commits * 10 + streak * 6 + issues * 2));
  const mp = Math.max(60, Math.round(170 + prs * 18 + commits * 2 + streak * 4));

  const rawExp = commits * 18 + prs * 45 + issues * 24 + events * 6 + streak * 3;

  let level = 1;
  let levelThreshold = 120;
  let expPool = rawExp;

  while (expPool >= levelThreshold && level < 99) {
    expPool -= levelThreshold;
    level += 1;
    levelThreshold = Math.floor(120 + level * 22);
  }

  const expForNext = Math.max(levelThreshold, 1);
  const exp = clamp(expPool, 0, expForNext);

  return {
    hp,
    mp,
    level,
    exp,
    expForNext,
    score: rawExp,
  };
}

function safeText(value) {
  return String(value || "").trim();
}

function loadImageSource(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
  });
}

function makeFallbackAvatar(username) {
  const safeName = safeText(username) || "github";
  return `https://github.com/${encodeURIComponent(safeName)}.png?size=320`;
}

function drawRoundedRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function paintCanvasBase(context) {
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
}

function paintGridOverlay(context, x, y, width, height) {
  context.save();
  context.strokeStyle = "rgba(14, 165, 233, 0.14)";
  context.lineWidth = 1;
  for (let i = 0; i < width; i += 16) {
    context.beginPath();
    context.moveTo(x + i, y);
    context.lineTo(x + i, y + height);
    context.stroke();
  }
  for (let j = 0; j < height; j += 16) {
    context.beginPath();
    context.moveTo(x, y + j);
    context.lineTo(x + width, y + j);
    context.stroke();
  }
  context.restore();
}

function paintScanline(context, x, y, width, height) {
  context.save();
  context.globalAlpha = 0.14;
  for (let i = 6; i < height; i += 6) {
    context.fillStyle = i % 12 === 0 ? "rgba(2, 6, 23, 0.06)" : "rgba(2, 6, 23, 0.03)";
    context.fillRect(x, y + i, width, 1.2);
  }
  context.restore();
}

function drawWindowShell(context, x, y, width, height) {
  drawRoundedRect(context, x, y, width, height, 28);
  const outer = context.createLinearGradient(x, y, x, y + height);
  outer.addColorStop(0, "#020617");
  outer.addColorStop(1, "#0f172a");
  context.fillStyle = outer;
  context.fill();
  context.strokeStyle = "#67e8f9";
  context.lineWidth = 2;
  context.stroke();

  drawRoundedRect(context, x + 9, y + 9, width - 18, height - 18, 22);
  context.fillStyle = "rgba(15, 23, 42, 0.96)";
  context.fill();
  context.strokeStyle = "rgba(148, 163, 184, 0.3)";
  context.lineWidth = 1;
  context.stroke();

  paintGridOverlay(context, x + 14, y + 14, width - 28, height - 28);
  paintScanline(context, x + 14, y + 14, width - 28, height - 28);
}

function drawHeader(context, username, year, streakRaw) {
  const x = 58;
  const y = 52;
  const width = CARD_WIDTH - 116;
  const centerY = y + 40;
  const streak = toNumber(streakRaw);

  context.fillStyle = "rgba(15, 23, 42, 0.95)";
  context.fillRect(x, y, width, 74);
  context.strokeStyle = "rgba(34, 211, 238, 0.55)";
  context.strokeRect(x, y, width, 74);

  context.fillStyle = "#e2e8f0";
  context.font = '700 36px "Sora", "Noto Sans KR", sans-serif';
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillText(`${username} · YEAR ${year}`, x + width / 2, centerY);
  context.textBaseline = "alphabetic";

  context.textAlign = "right";
  context.fillStyle = "#facc15";
  context.font = '700 18px "Sora", sans-serif';
  context.fillText(`streak: ${streak}  🔥`, x + width - 20, y + 34);
  context.textAlign = "left";
}

function drawPixelAvatar(context, image, x, y, size) {
  const target = 24;
  const off = document.createElement("canvas");
  off.width = target;
  off.height = target;
  const offCtx = off.getContext("2d");

  offCtx.imageSmoothingEnabled = false;
  offCtx.drawImage(image || document.createElement("canvas"), 0, 0, target, target);

  const pixels = offCtx.getImageData(0, 0, target, target);
  const bytes = pixels.data;
  for (let i = 0; i < bytes.length; i += 4) {
    if (bytes[i + 3] === 0) {
      continue;
    }
    bytes[i] = Math.round(bytes[i] / 16) * 16;
    bytes[i + 1] = Math.round(bytes[i + 1] / 16) * 16;
    bytes[i + 2] = Math.round(bytes[i + 2] / 16) * 16;
  }
  offCtx.putImageData(pixels, 0, 0);

  context.save();
  context.imageSmoothingEnabled = false;
  drawRoundedRect(context, x, y, size, size, 14);
  context.clip();
  context.drawImage(off, x, y, size, size);
  context.restore();
  context.imageSmoothingEnabled = true;
}

function drawAvatar(context, image, x, y, size) {
  const inner = size - 10;
  const inset = 5;

  drawRoundedRect(context, x, y, size, size, 16);
  context.fillStyle = "rgba(14, 165, 233, 0.2)";
  context.fill();
  context.strokeStyle = "#22d3ee";
  context.lineWidth = 2;
  context.stroke();

  if (image) {
    try {
      drawPixelAvatar(context, image, x + inset, y + inset, inner);
    } catch {
      context.fillStyle = "#334155";
      context.fillRect(x + inset, y + inset, inner, inner);
      context.fillStyle = "#f8fafc";
      context.font = '700 22px "Sora", sans-serif';
      context.fillText("GH", x + 28, y + 64);
    }
  } else {
    context.fillStyle = "#334155";
    context.fillRect(x + inset, y + inset, inner, inner);
    context.fillStyle = "#f8fafc";
    context.font = '700 30px "Sora", sans-serif';
    context.fillText("GH", x + 24, y + 64);
  }

  drawRoundedRect(context, x + 1, y + 1, size - 2, size - 2, 14);
  context.strokeStyle = "rgba(96, 165, 250, 0.7)";
  context.lineWidth = 1;
  context.stroke();
}

function renderStatBar(context, x, y, width, value, maxValue, accent) {
  const capped = clamp(value, 0, maxValue);
  const ratio = maxValue > 0 ? clamp(capped / maxValue, 0, 1) : 0;
  const barHeight = 14;

  drawRoundedRect(context, x, y, width, barHeight, barHeight / 2);
  context.fillStyle = "rgba(148, 163, 184, 0.18)";
  context.fill();
  drawRoundedRect(context, x + 2, y + 2, (width - 4) * ratio, barHeight - 4, (barHeight - 4) / 2);
  context.fillStyle = accent;
  context.fill();
}

function drawInfoGrid(context, x, y, panelWidth, stats) {
  const labelX = x + 10;
  const valueX = x + panelWidth - 12;
  const barX = labelX + 86;
  const barWidth = Math.max(180, panelWidth - (barX - x) - 86);
  const dividerX = x + panelWidth - 8;

  const rowHeight = 100;
  const rowTopOffset = 10;
  const labelY = 34;
  const barY = 24;
  const valueY = 50;
  const dividerY = 74;

  const labels = [
    { label: "COMMITS", value: toNumber(stats.commits), accent: "#4ade80", maxBase: 260 },
    { label: "PRS", value: toNumber(stats.prs), accent: "#60a5fa", maxBase: 90 },
    { label: "ISSUES", value: toNumber(stats.issues), accent: "#f97316", maxBase: 150 },
    { label: "EVENTS", value: toNumber(stats.publicEvents), accent: "#a78bfa", maxBase: 120 },
  ];

  for (let i = 0; i < labels.length; i += 1) {
    const item = labels[i];
    const rowTop = y + i * rowHeight + rowTopOffset;

    context.fillStyle = "#0ea5e9";
    context.font = '700 18px "Sora", sans-serif';
    context.fillText(item.label, labelX, rowTop + labelY);

    renderStatBar(context, barX, rowTop + barY + 8, barWidth, item.value, item.maxBase, item.accent);

    context.font = '700 22px "JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace';
    context.fillStyle = "#e2e8f0";
    context.textAlign = "right";
    context.fillText(String(item.value).padStart(4, "0"), valueX, rowTop + valueY);
    context.textAlign = "left";

    if (i < labels.length - 1) {
      context.strokeStyle = "rgba(148, 163, 184, 0.2)";
      context.beginPath();
      context.moveTo(x, rowTop + dividerY);
      context.lineTo(dividerX, rowTop + dividerY);
      context.stroke();
    }
  }
}

function drawVitalPanel(context, x, y, width, height, stats, profile) {
  drawRoundedRect(context, x, y, width, height, 14);
  context.fillStyle = "rgba(15, 23, 42, 0.86)";
  context.fill();
  context.strokeStyle = "rgba(96, 165, 250, 0.35)";
  context.stroke();

  const title = "CHARACTER INFO";
  context.fillStyle = "#67e8f9";
  context.font = '700 18px "Sora", sans-serif';
  context.fillText(`[ ${title} ]`, x + 16, y + 30);

  const avatarX = x + 20;
  const avatarY = y + 52;
  const avatarSize = 142;
  drawAvatar(context, profile.avatarImage, avatarX, avatarY, avatarSize);
  const profileTextY = y + 102;
  const profileGap = 8;
  const textY = profileTextY + profileGap;

  const name = safeText(profile.name) || safeText(profile.login) || safeText(profile.handle) || "GitHub User";
  const handle = safeText(profile.login) ? `@${safeText(profile.login)}` : "unknown";
  const location = safeText(profile.location) || "-";
  const company = safeText(profile.company) || "-";

  const lineX = avatarX + avatarSize + 18;
  context.fillStyle = "#f8fafc";
  context.font = '700 36px "Sora", "Noto Sans KR", sans-serif';
  context.fillText(name, lineX, textY);
  context.fillStyle = "#38bdf8";
  context.font = '600 22px "Noto Sans KR", sans-serif';
  context.fillText(handle, lineX, textY + 27);
  context.fillStyle = "#94a3b8";
  context.font = '500 16px "Noto Sans KR", sans-serif';
  context.fillText(`CLASS: ${company}`, lineX, textY + 54);
  context.fillText(`ZONE: ${location}`, lineX, textY + 76);

  const hpMax = 1600;
  const mpMax = 1100;
  const commits = toNumber(stats.commits);
  const prs = toNumber(stats.prs);
  const streak = toNumber(stats.streak);
  const issues = toNumber(stats.issues);
  const events = toNumber(stats.publicEvents);

  const metrics = calculateRPGMetrics(commits, prs, issues, events, streak);
  const hp = clamp(metrics.hp, 60, hpMax);
  const mp = clamp(metrics.mp, 60, mpMax);

  context.fillStyle = "#cbd5e1";
  context.font = '600 16px "Sora", sans-serif';
  context.fillText("HP", x + 20, y + 276);
  renderStatBar(context, x + 52, y + 264, 268, hp, hpMax, "#4ade80");
  context.fillText(`${Math.floor(hp)}`, x + 332, y + 276);

  context.fillText("MP", x + 20, y + 314);
  renderStatBar(context, x + 52, y + 302, 268, mp, mpMax, "#3b82f6");
  context.fillText(`${Math.floor(mp)}`, x + 332, y + 314);

  context.fillText("EXP", x + 20, y + 352);
  renderStatBar(context, x + 52, y + 340, 268, metrics.exp, metrics.expForNext, "#f59e0b");
  context.fillText(`${Math.floor(metrics.exp)}/${Math.floor(metrics.expForNext)}`, x + 332, y + 352);

  context.fillStyle = "#f8fafc";
  context.font = '800 28px "Sora", sans-serif';
  context.fillText(`Lv. ${metrics.level}`, x + 20, y + 240);
}

async function drawStatusWindow(context, stats, profile) {
  const panelX = 56;
  const panelY = 152;
  const panelW = CARD_WIDTH - 112;
  const panelH = 538;

  drawRoundedRect(context, panelX, panelY, panelW, panelH, 18);
  context.fillStyle = "rgba(15, 23, 42, 0.66)";
  context.fill();
  context.strokeStyle = "rgba(148, 163, 184, 0.25)";
  context.stroke();

  const leftX = panelX + 22;
  const leftY = panelY + 18;
  const leftW = 500;
  const leftH = panelH - 52;

  const rightX = panelX + leftW + 44;
  const rightW = panelW - leftW - 66;

  await drawInfoGrid(context, rightX, panelY + 38, rightW, stats);
  await drawVitalPanel(context, leftX, leftY, leftW, leftH, stats, profile);

}

async function renderStatsCard(username, year, stats, profile, skipAvatar = false) {
  const { canvas, context } = createCanvas(CARD_WIDTH, CARD_HEIGHT);
  const profileInfo = profile || {};
  if (!skipAvatar) {
    const avatarCandidates = [
      profileInfo.avatarUrl,
      makeFallbackAvatar(profileInfo.login || username),
      `https://avatars.githubusercontent.com/${encodeURIComponent(profileInfo.login || username)}?v=4`,
    ];
    for (const candidate of avatarCandidates) {
      if (!candidate) continue;
      const loadedAvatar = await loadImageSource(candidate);
      if (loadedAvatar) {
        profileInfo.avatarImage = loadedAvatar;
        break;
      }
    }
  } else {
    profileInfo.avatarImage = null;
  }

  paintCanvasBase(context);
  drawWindowShell(context, 20, 20, CARD_WIDTH - 40, CARD_HEIGHT - 40);
  drawHeader(context, username, year, stats?.streak);
  await drawStatusWindow(context, stats, profileInfo);

  try {
    return canvas.toDataURL("image/png");
  } catch {
    if (!skipAvatar) {
      return renderStatsCard(username, year, stats, profile, true);
    }
    throw new Error("Image rendering failed.");
  }
}

export async function buildVisualCardMarkdown(username, year, stats, profile) {
  const cardDataUrl = await renderStatsCard(username, year, stats, profile || {});
  return `![${username} ${year} GitHub Status Card](${cardDataUrl})`;
}
