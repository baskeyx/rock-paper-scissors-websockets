import styles from './Button.module.css'; 

const Button = ({ value, name, theme, ...props }) => (
  <button className={styles[theme]} {...props} aria-label={name} data-value={name}>{value}</button>
);

export default Button;
