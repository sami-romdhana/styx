"use client";

import classNames from "classnames";
import styles from "./Word.module.css";

interface WordProps {
  content: string;
  revealed: boolean;
  highlighted?: boolean;
}

export function Word(props: WordProps) {
  if (props.revealed) {
    return (
      <span
        className={classNames({
          [styles.highlighted]: props.highlighted,
        })}
      >
        {props.content}
      </span>
    );
  }

  return (
    <span className={styles.overlay} data-count={props.content.length}>
      {"█".repeat(props.content.length)}
    </span>
  );
}
