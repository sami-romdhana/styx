"use client";

interface WordProps {
  content: string;
  revealed: boolean;
}

export function Word(props: WordProps) {
  if (props.revealed) {
    return props.content;
  } else {
    return "█".repeat(props.content.length);
  }
}
