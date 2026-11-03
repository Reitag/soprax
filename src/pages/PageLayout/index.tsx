import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/settings">Настройки</Link>
      </nav>
      <main>
        <Outlet /> {/* здесь рендерится дочерний маршрут (Home / Dashboard / Settings) */}
      </main>
    </div>
  );
}
