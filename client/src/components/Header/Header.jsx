import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.head}>
      <Link to="/home">
        <span className={styles.title}>Dogs</span>
      </Link>
      <Link to="/home">
        <button className={styles.button}>Back to Home</button>
      </Link>
    </div>
  );
}

export default Header;