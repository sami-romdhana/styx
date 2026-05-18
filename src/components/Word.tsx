"use client";

import styles from "./Word.module.css";

interface WordProps {
  content: string;
  revealed: boolean;
}

export function Word(props: WordProps) {
  if (props.revealed) return props.content;

  return (
    <span className={styles.overlay} data-count={props.content.length}>
      {"█".repeat(props.content.length)}
    </span>
  );
}
