
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <>
      {(
        <div className={styles.loadingSpinnerOverlay}>
          <div className={styles.loadingSpinnerContainer}>
            <i class="fas fa-spinner fa-pulse" style={{fontSize: "50px", color: "#158163" }}></i>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingSpinner;

