import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearDetail, searchBreedDetail } from '../../actions';
import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import Loading from '../Loading/Loading';
import styles from './Detail.module.css';

function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(searchBreedDetail(id));
  }, [dispatch, id]);

  const breedDetail = useSelector((state) => state.breedDetail);

  if (Object.keys(breedDetail).length === 0)
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  else {
    return (
      <>
        <Header />
        <div className={styles.card}>
          <h1>{breedDetail.name}</h1>
          <div className={styles.imageContainer}>
            <img src={breedDetail.image} alt={breedDetail.name} width="700" />
          </div>
          <div className={styles.foot}>
            <p>
              <span>Altura:</span> {breedDetail.height} cm
            </p>
            <p>
              <span>Peso:</span> {breedDetail.weight} kg
            </p>
            <p>
              <span>Temperamentos:</span> {breedDetail.temperament}
            </p>
            <p>
              <span>Esperanza de vida:</span> {breedDetail.life_span}
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Detail;
