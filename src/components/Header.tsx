"use client";

import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import width from "@/styles/width.module.css";
import classNames from "classnames";

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={width.wrapper}>
          <h1>Styx</h1>
          <p>Guess the game from its' store description</p>

          <span />

          <a href="/about">Help</a>
        </div>
      </div>

      <nav className={styles.middleRow}>
        <div className={width.wrapper}>
          <a href="/" className={classNames(pathname === "/" && styles.active)}>
            Daily
          </a>
          <a
            href="/rising-tide"
            className={classNames(pathname === "/rising-tide" && styles.active)}
          >
            Rising Tide
          </a>
        </div>
      </nav>
    </header>
  );
}
