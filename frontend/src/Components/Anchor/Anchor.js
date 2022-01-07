import { Link } from 'react-router-dom';
import styles from './Anchor.module.scss';

const Anchor = ({ ...props }) => (
  <Link className={styles.anchor} {...props} />
);

export default Anchor;
