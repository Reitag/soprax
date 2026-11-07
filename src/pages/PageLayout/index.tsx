import { Outlet, Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/posts" className={styles.link}>
            Posts
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
