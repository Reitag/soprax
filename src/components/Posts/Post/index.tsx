import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState, type FC } from 'react';
import PostComments from '../PostComments';
import { type Props } from './types';
import { type Post as PostType } from '@/services/api/types';
import styles from './index.module.scss';
import EditPostModal from '../EditPostModal';
import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';

const Post: FC<Props> = ({ post }) => {
  const [postData, setPostData] = useState<PostType>(post);
  const [isModalOpen, setIsModalWindow] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleEditPost = async (formData: { title: string; body: string }) => {
    const editedPost = await apiFetchData<PostType>(
      `${API_ENDPOINTS.posts}/${post.id}`,
      null,
      'PUT',
      {
        title: formData.title,
        body: formData.body,
      }
    );

    setPostData((prev) => ({
      ...prev,
      title: editedPost.title,
      body: editedPost.body,
    }));
    setIsModalWindow(false);
  };

  const handleDeletePost = async () => {
    const result = await apiFetchData<{ isDeleted: boolean }>(
      `${API_ENDPOINTS.posts}/${postData.id}`,
      null,
      'DELETE'
    );
    if (result.isDeleted) {
      setIsModalWindow(false);
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2 className={styles.title}>{postData.title}</h2>
          <button className={styles.button} onClick={() => setIsModalWindow(true)}>
            <EditIcon fontSize="small" />
            <span>Edit</span>
          </button>
        </div>
        <p className={styles.content}>{postData.body}</p>
        <div className={styles.footer}>
          <div className={styles.reaction}>
            <ThumbUpOutlinedIcon fontSize="small" />
            <span>{postData.reactions?.likes}</span>
          </div>

          <div className={styles.reaction}>
            <ThumbDownOutlinedIcon fontSize="small" />
            <span>{postData.reactions?.dislikes}</span>
          </div>

          <div className={styles.views}>
            <VisibilityOutlinedIcon fontSize="small" />
            <span>{postData.views}</span>
          </div>
        </div>
        <PostComments key={postData.id} id={postData.id} />
      </div>
      {isModalOpen && (
        <EditPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalWindow(false)}
          onSubmit={handleEditPost}
          onDelete={handleDeletePost}
          title={postData.title}
          body={postData.body}
        />
      )}
    </div>
  );
};

export default Post;
