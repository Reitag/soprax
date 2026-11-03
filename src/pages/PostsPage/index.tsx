import Posts from '@/components/Posts';
import { Typography } from '@mui/material';
import type { FC } from 'react';

const PostsPage: FC = () => {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Posts
      </Typography>
      <Posts />
    </div>
  );
};

export default PostsPage;
