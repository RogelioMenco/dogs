import styles from "./Footer.module.css";
function Footer() {
  return (
    <span className={styles.footer}>
      <a href="https://github.com/rogeliomenco">
        {"<"}Developed by Rogelio Menco/{">"}
      </a>
    </span>
  );
}

export default Footer;