"use client";

import { Fragment, useState } from "react";
import { parse } from "@bbob/parser";
import { Word } from "./Word";

import styles from "./Game.module.css";

interface GameProps {
  gameDescription: string;
}

export function Game(props: GameProps) {
  const [words, setWords] = useState(() => new Set<string>());
  const parsedGameDescription = parseDescription(props.gameDescription);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input
          type="text"
          onKeyUp={(event) => {
            if (event.key !== "Enter") return;

            const target = event.target as HTMLInputElement;
            const word = target.value.trim().toLowerCase();

            setWords((words) => words.union(new Set([word])));
            target.value = "";
          }}
        />
      </div>

      <div className={styles.gameContainer}>
        <main className={styles.description}>
          {parsedGameDescription.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((word, wordIndex) => (
                <Fragment key={wordIndex}>
                  <Word
                    content={word}
                    revealed={word.match(/[.,;:?!()]/) !== null || words.has(word.toLowerCase())}
                  />{" "}
                </Fragment>
              ))}
            </p>
          ))}
        </main>

        <aside className={styles.guesses}>
          <p>Guesses so far</p>

          {words.size > 0 && (
            <ul>
              {Array.from(words.values()).map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}

function parseDescription(bbcode: string) {
  const parsed = parse(bbcode, {
    onlyAllowTags: ["p"],
  });

  return parsed
    .map(
      (p) =>
        Array.isArray(p.content) &&
        p.content
          .filter((w): w is string => typeof w === "string" && w !== " ")
          .flatMap((w) => separatePunctuation(w)),
    )
    .filter((a) => Array.isArray(a) && a.length)
    .filter((a) => a !== false);
}

function separatePunctuation(word: string) {
  const matches = word.match(/^(?<opening>[(])?(?<word>[^\.,;:()!\?]*)(?<closing>[\.,;:!\?)])?$/);

  return [matches?.groups?.opening, matches?.groups?.word, matches?.groups?.closing].filter(
    (part) => typeof part === "string",
  );
}
