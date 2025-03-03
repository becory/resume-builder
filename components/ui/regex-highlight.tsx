"use client";

export function RegexHighlight(pattern: string | RegExp, text: string) {
  if (!pattern) return text;
  // Function to highlight matched text
  const regex = new RegExp(pattern, "gi");

  return text.replace(regex, (match) => {
    // Wrap the matched text in a span with a background color
    return `<span class="font-bold">${match}</span>`;
  });
}
