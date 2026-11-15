import { Outlet, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styles from './index.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
