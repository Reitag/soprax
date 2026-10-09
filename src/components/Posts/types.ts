export interface PostTypes {
  id: number;
  body: string;
  reactions: { likes: number; dislikes: number };
  tags: string[];
  title: string;
  views: number;
  userId: number;
}

export interface PostCommentsTypes {
  id: number;
}

interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}
