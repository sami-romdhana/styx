export function parseText(text: string): SentenceNode[] {
  const result: SentenceNode[] = [];
  let previousMode: SentenceNode["type"] | null = null;
  let currentString = "";

  function push(mode: SentenceNode["type"], text: string) {
    result.push({
      type: mode,
      content: text,
      key: text.toLowerCase(),
    });
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isText = char.match(/\p{L}/u) !== null;
    const mode = isText ? "text" : "punctuation";

    if (previousMode !== null && mode !== previousMode) {
      push(previousMode, currentString);
      currentString = "";
    }

    currentString += char;
    previousMode = mode;
  }

  if (currentString.length) {
    push(previousMode!, currentString);
  }

  return result;
}

export interface SentenceNode {
  type: "text" | "punctuation";
  content: string;
  key: string;
}
