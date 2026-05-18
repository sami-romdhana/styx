"use client";

import { Fragment, useEffect, useState } from "react";
import { parseText } from "@/core/parse";
import { transformBBCode } from "@/core/transform";
import { Word } from "./Word";

import styles from "./Game.module.css";

interface GameProps {
  gameName: string;
  gameDescription: string;
}

export function Game(props: GameProps) {
  const [words, setWords] = useState(() => new Set<string>());

  useEffect(() => {
    console.log(props);
  }, []);

  const parsedGameName = parseText(props.gameName);
  const parsedGameDescription = transformBBCode(props.gameDescription).map(parseText);

  const gameIsWon = parsedGameName.filter((w) => w.type === "text").every((w) => words.has(w.key));

  return (
    <div className={styles.container}>
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

              setWords((words) => words.union(new Set([word])));
              target.value = "";
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
