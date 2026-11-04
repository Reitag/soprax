import { useEffect, useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';

import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';

import { type Props, type Comment } from './types';

import styles from './index.module.scss';

const PostComments: React.FC<Props> = ({ id }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    apiFetchData<{ comments: Comment[] }>(`${API_ENDPOINTS.comments}${id}`, { comments: [] }).then(
      (data) => {
        if (data) setComments(data.comments);
      }
    );
  }, []);

  if (comments === null) {
    return <div>Загрузка комментариев</div>;
  }

  if (comments.length === 0) {
    return <div>Комментариев нет</div>;
  }

  return (
    <div className={styles.list}>
      {comments.map((comment) => (
        <div className={styles.item} key={comment.id}>
          <div className={styles.header}>
            <span className={styles.fullName}>{comment.user.fullName}</span>
            <span className={styles.username}>@{comment.user.username}</span>
          </div>
          <div className={styles.text}>{comment.body}</div>
          <div className={styles.footer}>
            <FavoriteIcon fontSize="inherit" />
            <span>{comment.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
