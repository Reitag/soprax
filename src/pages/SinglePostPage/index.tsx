import { useParams } from 'react-router-dom';
import { useEffect, useState, type FC } from 'react';
import Post from '@/components/Posts/Post';
import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';

export type Post = {
  id: number;
  body: string;
  reactions: { likes: number; dislikes: number };
  tags: string[];
  title: string;
  views: number;
  userId: number;
};

const SinglePostsPage: FC = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState<Post | null>(null);

  useEffect(() => {
    apiFetchData<Post>(API_ENDPOINTS.posts + `/${postId}`, null).then((data) => {
      if (data) setPostData(data);
    });
  }, []);

  if (!postData) {
    return <div>No data</div>;
  }

  return <Post post={postData} />;
};

export default SinglePostsPage;
