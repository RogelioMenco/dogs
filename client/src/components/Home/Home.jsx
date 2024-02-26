import Nav from '../Nav/Nav.jsx';
import Cards from '../Cards/Cards.jsx';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.maindiv}>
      <Nav />
      <Cards />
    </div>
  );
}

export default Home;
