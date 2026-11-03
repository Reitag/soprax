import { Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import HomePage from './pages/HomePage';
import Layout from './pages/PageLayout';

export default function App(): React.ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Route>
    </Routes>
  );
}
