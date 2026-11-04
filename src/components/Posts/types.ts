export type Post = {
  id: number;
  body: string;
  reactions: { likes: number; dislikes: number };
  tags: string[];
  title: string;
  views: number;
  userId: number;
};
