"use client";

import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { parseText } from "@/core/parse";
import { transformBBCode } from "@/core/transform";
import { Word } from "@/components/Word";

import styles from "./WordGame.module.css";
import width from "@/styles/width.module.css";

interface RisingTideGameProps {
  listOfGames: string[];
  gameName: string;
  gameDescription: string;
}

export function RisingTideGame(props: RisingTideGameProps) {
  const [guesses, setGuesses] = useState(() => new Set<string>());
  const currentLength = guesses.size + 2;

  useEffect(() => {
    console.log(props);
  }, []);

  const parsedGameName = parseText(props.gameName);
  const parsedGameDescription = transformBBCode(props.gameDescription).map(parseText);

  const gameIsWon = guesses.has(props.gameName);

  return (
    <div className={classNames(width.wrapper, styles.container)}>
      {gameIsWon ? (
        <div className={styles.end}>You won!</div>
      ) : (
        <div className={styles.input}>
          <input
            type="search"
            list="games"
            onKeyUp={(event) => {
              if (event.key !== "Enter") return;

              const target = event.target as HTMLInputElement;
              const guess = target.value;

              if (guess.length === 0) return;

              setGuesses((guesses) => guesses.union(new Set([guess])));
              target.value = "";
            }}
          />

          <datalist id="games">
            {props.listOfGames.map((game) => (
              <option value={game} key={game}></option>
            ))}
          </datalist>
        </div>
      )}

      <div className={styles.gameContainer}>
        <main className={styles.description}>
          <h2>
            {parsedGameName.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <Word content={word.content} revealed={word.type === "punctuation" || gameIsWon} />
              </Fragment>
            ))}
          </h2>

          {parsedGameDescription.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((word, wordIndex) => (
                <Fragment key={wordIndex}>
                  <Word
                    content={word.content}
                    revealed={word.type === "punctuation" || word.content.length <= currentLength}
                  />
                </Fragment>
              ))}
            </p>
          ))}
        </main>

        <aside className={styles.guesses}>
          <p>Guesses so far</p>

          {guesses.size > 0 && (
            <ul>
              {Array.from(guesses.values()).map((guess) => (
                <li key={guess}>{guess}</li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
