import { Link } from 'react-router-dom';
import type { FC } from 'react';

import styles from './index.module.scss';

const Navbar: FC = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="/posts" className={styles.link}>
        Posts
      </Link>
    </nav>
  );
};

export default Navbar;
