import React from "react";
import styles from "./WrapperCard.module.css";

const WrapperCard = ({ children }) => {
  return children && <div className={styles.wrapperCard}>{children}</div>;
};

export default WrapperCard;
