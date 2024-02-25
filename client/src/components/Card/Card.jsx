import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ name, image, temperament, weight, id }) {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.card}>
        <span className={styles.title}>{name}</span>
        <img src={`${image}`} alt={`${name}`} />
        <div className={styles.foot}>
          <p>
            <span>&#128313;Peso:</span> {weight} kg
          </p>
          <p>
            <span>&#128313;Temperamento:</span> {temperament}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;