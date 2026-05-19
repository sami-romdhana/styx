import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.container}>
      <h2>Not found.</h2>
      <p>This page does not exist!</p>
    </div>
  );
}
