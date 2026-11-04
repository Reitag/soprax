export type Props = {
  id: number;
};

type User = {
  id: number;
  username: string;
  fullName: string;
};

export type Comment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
};
