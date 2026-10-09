import SpinnerURL from '@/icons/spinner.svg';
import styles from './Spinner.module.scss';

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <img src={SpinnerURL} alt="Loading..." className={styles.spinner} />
    </div>
  );
};

export default Spinner;
