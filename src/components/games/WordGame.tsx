"use client";

import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { parseText } from "@/core/parse";
import { transformBBCode } from "@/core/transform";
import { Word } from "@/components/Word";

import styles from "./WordGame.module.css";
import width from "@/styles/width.module.css";

interface WordGameProps {
  gameName: string;
  gameDescription: string;
}

export function WordGame(props: WordGameProps) {
  const [words, setWords] = useState(() => new Set<string>());
  const [lastWord, setLastWord] = useState<string | null>(null);

  useEffect(() => {
    console.log(props);
  }, []);

  const parsedGameName = parseText(props.gameName);
  const parsedGameDescription = transformBBCode(props.gameDescription).map(parseText);

  const gameIsWon = parsedGameName.filter((w) => w.type === "text").every((w) => words.has(w.key));

  return (
    <div className={classNames(width.wrapper, styles.container)}>
      {gameIsWon ? (
        <div className={styles.end}>You won!</div>
      ) : (
        <div className={styles.input}>
          <input
            type="text"
            onKeyDown={(event) => {
              if (event.key.length === 1 && event.key.match(/\p{L}/u) === null)
                event.preventDefault();
            }}
            onKeyUp={(event) => {
              if (event.key !== "Enter") return;

              const target = event.target as HTMLInputElement;
              const word = target.value.trim().toLowerCase();

              target.value = "";

              if (word.length === 0) return;

              setWords((words) => words.union(new Set([word])));
              setLastWord(word);
            }}
          />
        </div>
      )}

      <div className={styles.gameContainer}>
        <main className={styles.description}>
          <h2>
            {parsedGameName.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <Word
                  content={word.content}
                  revealed={word.type === "punctuation" || words.has(word.key)}
                  highlighted={word.type === "text" && word.key === lastWord}
                />
              </Fragment>
            ))}
          </h2>

          {parsedGameDescription.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((word, wordIndex) => (
                <Fragment key={wordIndex}>
                  <Word
                    content={word.content}
                    revealed={word.type === "punctuation" || words.has(word.key)}
                    highlighted={word.type === "text" && word.key === lastWord}
                  />
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
