import Anchor from '../../Components/Anchor';
import styles from './Home.module.scss';

const Home = () => (
  <nav className={styles.navigation}>
    <Anchor to='/single'>Single Player</Anchor>
    <Anchor to='/multiplayer'>Multiplayer</Anchor>
  </nav>
);

export default Home;
