export default function truncatedText(text, maxLength = 60) {
  if (text?.length <= maxLength) return text;

  // Truncate within allowed length of text
  const truncatedByLength = text.substr(0, maxLength).trim();

  // Truncated text till last space to avoid cut off
  const lastSpaceIndex = truncatedByLength.lastIndexOf(" ");
  const finalText = truncatedByLength.substr(0, lastSpaceIndex).trim();

  return finalText + "...";
}
