import { useState } from 'react';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import PostComments from '../PostComments/PostComments';
import { type PostProps } from '../types';

import styles from './Post.module.scss';

const Post: React.FC<PostProps> = ({ post }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const handleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className={styles.item}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{post.body}</p>
      <div className={styles.footer}>
        <div className={styles.reaction}>
          <ThumbUpOutlinedIcon fontSize="small" />
          <span>{post.reactions.likes}</span>
        </div>

        <div className={styles.reaction}>
          <ThumbDownOutlinedIcon fontSize="small" />
          <span>{post.reactions.dislikes}</span>
        </div>

        <div className={styles.views}>
          <VisibilityOutlinedIcon fontSize="small" />
          <span>{post.views}</span>
        </div>
      </div>
      <button className={styles.button} onClick={handleCommentsVisibility}>
        {isCommentsVisible ? 'Hide Comments' : 'View Comments'}
      </button>
      {isCommentsVisible && <PostComments key={post.id} id={post.id} />}
    </div>
  );
};

export default Post;
