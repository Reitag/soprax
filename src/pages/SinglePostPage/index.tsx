import { useParams } from 'react-router-dom';
import { useEffect, useState, type FC } from 'react';
import Post from '@/components/Posts/Post';
import { apiFetchData } from '@/services/api';
import { API_ENDPOINTS } from '@/services/api/config';
import { type Post as PostType } from '@/services/api/types';

const SinglePostsPage: FC = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState<PostType | null>(null);

  useEffect(() => {
    apiFetchData<PostType>(API_ENDPOINTS.posts + `/${postId}`, null)
      .then((data) => {
        setPostData(data);
      })
      .catch(() => {
        setPostData(null);
      });
  }, [postId]);

  if (!postData) {
    return <div>No data</div>;
  }

  return <Post post={postData} />;
};

export default SinglePostsPage;
