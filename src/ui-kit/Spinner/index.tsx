import SpinnerURL from './assets/spinner.svg';
import styles from './index.module.scss';

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <img src={SpinnerURL} alt="Loading..." className={styles.spinner} />
    </div>
  );
};

export default Spinner;
