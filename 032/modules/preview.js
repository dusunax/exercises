function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function parseInlineMarkdown(value) {
  const escaped = escapeHtml(value);

  return escaped.replace(/!\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]+")?\)/g, (_, altText, imageUrl) => {
    const safeAlt = escapeAttribute(altText);
    const safeUrl = escapeAttribute(imageUrl);
    return `<img class="md-inline-image" src="${safeUrl}" alt="${safeAlt}" loading="lazy" decoding="async" />`;
  });
}

function renderListRow(line, closePreviousList) {
  const listMatch = line.match(/^-\s+(.*)$/);
  if (listMatch) {
    return {
      block: `<li>${parseInlineMarkdown(listMatch[1])}</li>`,
      shouldOpenList: closePreviousList,
      shouldStayList: true,
    };
  }

  const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
  if (headingMatch) {
    const level = Math.min(headingMatch[1].length, 6);
    const content = parseInlineMarkdown(headingMatch[2]);
    return {
      block: `<h${level} class=\"md-heading\">${content}</h${level}>`,
      shouldOpenList: false,
      shouldStayList: false,
    };
  }

  if (line.trim() === "") {
    return {
      block: "<p class=\"md-empty\"></p>",
      shouldOpenList: false,
      shouldStayList: false,
    };
  }

  return {
    block: `<p>${parseInlineMarkdown(line)}</p>`,
    shouldOpenList: false,
    shouldStayList: false,
  };
}

export function renderMarkdownToHtml(markdownText) {
  const raw = String(markdownText ?? "");
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  const rendered = [];
  let isListOpen = false;

  for (const line of lines) {
    const row = renderListRow(line, !isListOpen);

    if (row.shouldOpenList && !isListOpen) {
      rendered.push('<ul class="md-list">');
      isListOpen = true;
    }

    if (!row.shouldStayList && isListOpen) {
      rendered.push("</ul>");
      isListOpen = false;
    }

    rendered.push(row.block);
  }

  if (isListOpen) {
    rendered.push("</ul>");
  }

  const body = rendered.join("");
  return `<article class="md-card">${body}</article>`;
}
