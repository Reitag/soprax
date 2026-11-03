import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { title: string; body: string }) => void;
}

const ModalWindow: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;
    onSubmit({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add new post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Заголовок поста"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          margin="dense"
          label="Текст поста"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
