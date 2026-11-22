export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { title: string; body: string }) => void;
  onDelete: () => void;
  title: string;
  body: string;
};
