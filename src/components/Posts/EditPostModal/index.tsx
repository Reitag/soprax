import { useState, type FC } from 'react';
import { Props } from './type';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const EditPostModal: FC<Props> = ({ isOpen, onClose, onSubmit, onDelete, title, body }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  const isSaveDisabled =
    !editedTitle.trim() || !editedBody.trim() || (editedTitle === title && editedBody === body);

  const handleSubmit = () => {
    if (!editedTitle.trim() || !editedBody.trim()) return;
    onSubmit({ title: editedTitle, body: editedBody });
    setEditedTitle(editedTitle);
    setEditedBody(editedBody);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Post title"
          fullWidth
          variant="outlined"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
        />
        <TextField
          margin="dense"
          label="Post content"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={editedBody}
          onChange={(event) => setEditedBody(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onDelete} sx={{ mr: 'auto' }}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isSaveDisabled}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;
