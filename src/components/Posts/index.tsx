import { useEffect, useState } from 'react';

import ErrorIcon from '@mui/icons-material/Error';

import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';
import Spinner from '@/ui-kit/Spinner';

import Post from './Post';
import { type Post as PostType } from './types';

import styles from './index.module.scss';

const Posts: React.FC = () => {
  const [postsData, setPostData] = useState<PostType[] | null>(null);

  useEffect(() => {
    apiFetchData<{ posts: PostType[] }>(API_ENDPOINTS.posts, { posts: [] }).then((data) => {
      if (data) setPostData(data.posts);
    });
  }, []);

  if (postsData === null) {
    return <Spinner />;
  }

  if (postsData.length === 0) {
    return (
      <div className={styles.error}>
        <span>Данных нет</span>
        <div>
          <ErrorIcon fontSize="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {postsData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
