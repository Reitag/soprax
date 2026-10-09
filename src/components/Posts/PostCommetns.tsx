import { useEffect, useState } from 'react';
import { Comment, PostCommentsTypes } from './types';
import { apiFetchData } from '@/services/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './Posts.module.scss';

const url = `https://dummyjson.com/comments/post/`;

const PostComments: React.FC<PostCommentsTypes> = ({ id }: PostCommentsTypes) => {
  const [PostCommentsData, setPostCommentsData] = useState<Comment[] | null>(null);

  useEffect(() => {
    apiFetchData<{ comments: Comment[] }>(`${url}${id}`, { comments: [] }).then((data) => {
      if (data) setPostCommentsData(data.comments);
    });
  }, []);

  return PostCommentsData !== null ? (
    PostCommentsData.length ? (
      <div className={styles.commentsSection}>
        {PostCommentsData.map((comment) => {
          return (
            <div className={styles.commentCard} key={comment.id}>
              <div className={styles.commentHeader}>
                <span className={styles.fullName}>{comment.user.fullName}</span>
                <span className={styles.username}>@{comment.user.username}</span>
              </div>
              <div className={styles.commentBody}>{comment.body}</div>
              <div className={styles.commentFooter}>
                <FavoriteIcon fontSize="inherit" />
                <span>{comment.likes}</span>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div>Комментариев нет</div>
    )
  ) : (
    <div>Загрузка комментариев</div>
  );
};

export default PostComments;
