import styles from './Button.module.css'; 

const Button = ({ value }) => (
  <button className={styles.Button}>{value}</button>
);

export default Button;
