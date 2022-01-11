import Typist from 'react-typist';
import styles from './Type.module.scss';

const Type = ({ commentary }) => (
  <Typist className={styles.type} cursor={{ show: false }} key={commentary.id}>
    {commentary.copy}
  </Typist>
);

export default Type;
