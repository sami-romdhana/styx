"use client";

import { Fragment, useEffect, useState } from "react";
import { parse } from "@bbob/parser";
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

  const parsedGameName = parseName(props.gameName);
  const parsedGameDescription = parseDescription(props.gameDescription);

  const gameIsWon = parsedGameName
    .filter((w) => w.match(/[.,;:?!()]/) === null)
    .every((w) => words.has(w.toLowerCase()));

  return (
    <div className={styles.container}>
      {gameIsWon ? (
        <div className={styles.end}>You won!</div>
      ) : (
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
      )}

      <div className={styles.gameContainer}>
        <main className={styles.description}>
          <h2>
            {parsedGameName.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <Word
                  content={word}
                  revealed={word.match(/[.,;:?!()]/) !== null || words.has(word.toLowerCase())}
                />{" "}
              </Fragment>
            ))}
          </h2>

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

function parseName(title: string) {
  return title
    .replaceAll(/[^\p{L}0-9 .,:()!?]/gu, "")
    .split(" ")
    .flatMap((word) => separatePunctuation(word));
}

function parseDescription(bbcode: string) {
  const parsed = parse(bbcode, {});

  return parsed
    .map(
      (p) =>
        typeof p.content === "string" ||
        (Array.isArray(p.content) &&
          p.content
            .filter((w): w is string => typeof w === "string" && w !== " ")
            .flatMap((w) => separatePunctuation(w))),
    )
    .filter((a) => typeof a !== "boolean" && a.length)
    .filter((a) => typeof a !== "boolean");
}

function separatePunctuation(word: string) {
  const matches = word.match(/^(?<opening>[(])?(?<word>[^\.,;:()!\?]*)(?<closing>[\.,;:!\?)])?$/);

  return [matches?.groups?.opening, matches?.groups?.word, matches?.groups?.closing].filter(
    (part) => typeof part === "string",
  );
}
