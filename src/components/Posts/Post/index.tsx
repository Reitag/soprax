import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import PostComments from '../PostComments';
import { type Props } from './types';

import styles from './index.module.scss';

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.content}>{post.body}</p>
        <div className={styles.footer}>
          <div className={styles.reaction}>
            <ThumbUpOutlinedIcon fontSize="small" />
            <span>{post.reactions?.likes}</span>
          </div>

          <div className={styles.reaction}>
            <ThumbDownOutlinedIcon fontSize="small" />
            <span>{post.reactions?.dislikes}</span>
          </div>

          <div className={styles.views}>
            <VisibilityOutlinedIcon fontSize="small" />
            <span>{post.views}</span>
          </div>
        </div>
        {post.id > 251 ? <div>No comments</div> : <PostComments key={post.id} id={post.id} />}
      </div>
    </div>
  );
};

export default Post;
