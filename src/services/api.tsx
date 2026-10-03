import { useEffect, useState } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const url = 'https://dummyjson.com/posts';

interface Post {
  id: number;
  body: string;
  reactions: { likes: number; dislikes: number };
  tags: string[];
  title: string;
  views: number;
  userId: number;
}

interface Posts {
  posts: Post[];
}

export default function loadData(): React.ReactNode {
  const [data, setData] = useState<Posts | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return data ? (
    data.posts.map((post) => {
      return (
        <div style={{ fontFamily: 'sans-serif', padding: '16px', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#333' }}>
            {post.title}
          </h2>

          <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555', marginBottom: '20px' }}>
            {post.body}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: '14px',
              color: '#666',
              borderTop: '1px solid #eee',
              paddingTop: '12px',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ThumbUpOutlinedIcon fontSize="small" />
              <span>{post.reactions.likes}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ThumbDownOutlinedIcon fontSize="small" />
              <span>{post.reactions.dislikes}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
              <VisibilityOutlinedIcon fontSize="small" />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>Loading...</div>
  );
}
