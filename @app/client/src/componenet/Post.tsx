import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => (
  <Card style={{ marginBottom: '10px' }} sx={{ transform: 'scale(0.8)' }}>
    <CardContent>
      <Typography variant="h5">{post.title}</Typography>
      <Typography variant="body2">{post.content}</Typography>
    </CardContent>
  </Card>
);

export default Post;
