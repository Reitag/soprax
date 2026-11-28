import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Post as PostType } from '@/services/api/types';
import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';
import EditPostModal from '../EditPostModal';
import PostComments from '../PostComments';
import { type Props } from './types';
import styles from './index.module.scss';

const Post: FC<Props> = ({ post }) => {
  const [postData, setPostData] = useState<PostType>(post);
  const [isModalOpen, setIsModalWindow] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditPost = async (formData: { title: string; body: string }): Promise<void> => {
    const editedPost = await apiFetchData<PostType>(
      `${API_ENDPOINTS.posts}/${post.id}`,
      null,
      'PUT',
      {
        title: formData.title,
        body: formData.body,
      }
    );

    if (editedPost) {
      setPostData((prev) => ({
        ...prev,
        title: editedPost.title,
        body: editedPost.body,
      }));
      setIsModalWindow(false);
    }
  };

  const handleDeletePost = (): void => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDeletePost = async (): Promise<void> => {
    const result = await apiFetchData<{ isDeleted: boolean }>(
      `${API_ENDPOINTS.posts}/${postData.id}`,
      null,
      'DELETE'
    );
    if (result?.isDeleted) {
      setIsConfirmOpen(false);
      setIsModalWindow(false);
      navigate('/posts');
    }
  };

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
      <EditPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalWindow(false)}
        onSubmit={handleEditPost}
        onDelete={handleDeletePost}
        title={postData.title}
        body={postData.body}
      />
      <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <DialogTitle>Delete post?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDeletePost} color="error" variant="contained">
            Yes, delete it!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Post;
