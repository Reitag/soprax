export type Post = {
  id: number;
  body: string;
  reactions: { likes: number; dislikes: number };
  tags: string[];
  title: string;
  views: number;
  userId: number;
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

export type PostsProps = {};

export type PostProps = {
  post: Post;
};

export type PostCommentsProps = {
  id: number;
};
