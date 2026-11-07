import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';

import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';
import Spinner from '@/ui-kit/Spinner';

import ModalWindow from '@/components/Modal';
import { type Post as PostType } from './types';

import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import PreviewPost from './PreviewPost';

const Posts: React.FC = () => {
  const [postsData, setPostData] = useState<PostType[] | null>(null);
  const [isModalWindow, setIsModalWindow] = useState(false);

  useEffect(() => {
    apiFetchData<{ posts: PostType[] }>(API_ENDPOINTS.posts, { posts: [] }).then((data) => {
      if (data) setPostData(data.posts);
    });
  }, []);

  const handleCreatePost = async (formData: { title: string; body: string }) => {
    const newPost = await apiFetchData<PostType>(`${API_ENDPOINTS.posts}/add`, null, 'POST', {
      title: formData.title,
      body: formData.body,
      userId: 5,
    });

    if (newPost) {
      setPostData((prev) => (prev ? [newPost, ...prev] : [newPost]));
      setIsModalWindow(false);
    }
  };

  if (postsData === null) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <Button className={styles.button} variant="contained" onClick={() => setIsModalWindow(true)}>
        Add new post
      </Button>

      <ModalWindow
        isOpen={isModalWindow}
        onClose={() => setIsModalWindow(false)}
        onSubmit={handleCreatePost}
      />

      {postsData.length === 0 ? (
        <div className={styles.error}>
          <span>No data</span>
          <div>
            <ErrorIcon fontSize="large" />
          </div>
        </div>
      ) : (
        postsData.map((post) => {
          return (
            <Link key={post.id} to={`${post.id}`} className={styles.link}>
              <PreviewPost post={post} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Posts;
