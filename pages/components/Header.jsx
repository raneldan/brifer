import styles from "./Header.module.css";

function Header(props) {
  const { icon, title } = props;

  return (
    <header className={styles.header}>
      <img className={styles.headerIcon} src={icon}/>
      <h3 className={styles.headerTitle}>{title}</h3>
    </header>
  );
}

export default Header;
