import { useState } from 'react';
import { PostTypes } from './types';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PostComments from './PostCommetns';
import styles from './Posts.module.scss';

const Post: React.FC<{ post: PostTypes }> = ({ post }) => {
  const [visibleComments, setVisbileCommetns] = useState(false);

  const toggleCommentsVisibility = () => {
    setVisbileCommetns(!visibleComments);
  };

  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.h2Style}>{post.title}</h2>
      <p className={styles.postBodyStyle}>{post.body}</p>
      <div className={styles.iconMainDiv}>
        <div className={styles.reactionStyle}>
          <ThumbUpOutlinedIcon fontSize="small" />
          <span>{post.reactions.likes}</span>
        </div>

        <div className={styles.reactionStyle}>
          <ThumbDownOutlinedIcon fontSize="small" />
          <span>{post.reactions.dislikes}</span>
        </div>

        <div className={styles.visibilityStyle}>
          <VisibilityOutlinedIcon fontSize="small" />
          <span>{post.views}</span>
        </div>
      </div>
      <button className={styles.commentsToggleBtn} onClick={toggleCommentsVisibility}>
        {visibleComments ? 'Hide Comments' : 'View Comments'}
      </button>
      {visibleComments && (
        <div>
          <PostComments key={post.id} id={post.id} />
        </div>
      )}
    </div>
  );
};

export default Post;
