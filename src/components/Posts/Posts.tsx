import { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { PostTypes } from './types';
import { apiFetchData } from '@/services/api';
import Spinner from '@/ui-kit/Spinner/Spinner';
import styles from './Posts.module.scss';
import Post from './Post';

const url = 'https://dummyjson.com/posts';
//const url = 'https://dummyjson.com/bad_url';

const Posts: React.FC = () => {
  const [postsData, setPostData] = useState<PostTypes[] | null>(null);

  useEffect(() => {
    apiFetchData<{ posts: PostTypes[] }>(url, { posts: [] }).then((data) => {
      if (data) setPostData(data.posts);
    });
  }, []);

  return postsData !== null ? (
    postsData.length ? (
      postsData.map((post) => <Post key={post.id} post={post} />)
    ) : (
      <div className={styles.errorStyle}>
        <span>Что-то пошло не так!</span>
        <div>
          <ErrorIcon fontSize="large" />
        </div>
      </div>
    )
  ) : (
    <Spinner />
  );
};

export default Posts;
