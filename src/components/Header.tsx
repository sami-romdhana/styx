import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1>Styx</h1>
      <p>Guess the game from its' store description</p>
    </header>
  );
}
