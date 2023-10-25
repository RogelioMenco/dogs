import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.title}>Welcome to Dogs!</h1>
      <div className={styles.dogimg}>
        <Link to="/home">
          <img src="https://i.imgur.com/mOiSapI.png" alt="dog face" />
        </Link>
      </div>
      <Link to="/home">
        <button className={styles.button}>Enter to site</button>
      </Link>
    </div>
  );
}

export default LandingPage;