import Posts from '@/components/Posts';
import type { FC } from 'react';

import styles from './index.module.scss';

const PostsPage: FC = () => {
  return (
    <>
      <h2 className={styles.title}>Posts</h2>
      <Posts />
    </>
  );
};

export default PostsPage;
