import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, getTemps } from "../../actions/index";
import Card from "../Card/Card.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./Cards.module.css";
import Loading from "../Loading/Loading.jsx";
import saddog from "../../images/sad.png";

function Cards() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);

  const breeds = useSelector((state) =>
    state.breedsToFilter.slice(currentPage, currentPage + 8)
  );
  const totalBreedsPages = useSelector((state) =>
    Math.ceil(state.breedsToFilter.length / 8)
  );

  const nextPag = () => {
    if (breeds.length >= 8) {
      setCurrentPage(currentPage + 8);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prevPag = () => {
    // currentPage > 0
    //   ? setCurrentPage(currentPage - 8)
    //   : setCurrentPage(currentPage);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 8);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentPage(currentPage);
    }
  };

  if (currentPage !== 0) {
    if (currentPage / 8 + 1 > totalBreedsPages) {
      prevPag();
    }
  }

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemps());
  }, [dispatch]);

  if (breeds[0] === false) {
    return (
      <>
        <h1>Raza no encontrada</h1>
        <img src={saddog} alt="sad dog" />
        <Footer />
      </>
    );
  } else if (breeds[0] === "db empty") {
    return (
      <>
        <h1>Base de datos vacia!</h1>
        <img src={saddog} alt="sad dog" />
        <Footer />
      </>
    );
  } else if (breeds.length) {
    return (
      <>
        <div className={styles.cardsContainer}>
          {breeds.map((e) => (
            <Card
              name={e.name}
              weight={e.weight}
              temperament={e.temperament}
              image={e.image}
              key={e.id}
              id={e.id}
            />
          ))}
        </div>
        <div>
          <button className={styles.btn} onClick={prevPag}>
            ◄
          </button>
          <span>
            {" "}
            {currentPage / 8 + 1} / {totalBreedsPages}{" "}
          </span>
          <button className={styles.btn} onClick={nextPag}>
            ►
          </button>
        </div>
        {/* Para devolver una lista de las páginas */}

        {/* {(() => {
          const list = [];
          for (let i = 0; i < totalBreedsPages; i++) {
            list.push(<button key={i}>{i + 1}</button>);
          }
          return list;
        })()} */}
        <Footer />
      </>
    );
  } else {
    return <Loading />;
  }
}

export default Cards;