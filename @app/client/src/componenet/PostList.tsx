import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, UPDATE_POST } from '../queries';
import Post from './Post';
import { CircularProgress, Container, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import _ from 'lodash';

const PostList: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { offset: 0, limit: 10 },
  });
  const [updatePost] = useMutation(UPDATE_POST);
  const [posts, setPosts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  // Function to handle fetching more posts
  const handleFetchMore = useCallback(() => {
    if (loading || fetching) return;

    setFetching(true);
    fetchMore({
      variables: {
        offset: posts.length,
        limit: 3,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetching(false);
        if (!fetchMoreResult) return prev;
        return {
          posts: [...prev.posts, ...fetchMoreResult.posts],
        };
      },
    });
  }, [fetchMore, loading, fetching, posts.length]);

  // Function to handle drag and drop end event
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    await updatePost({
      variables: { id: reorderedItem.id, input: { position: result.destination.index } },
    });
    setPosts(items); // Update the state with reordered items
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    const handleScroll = _.debounce(() => {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight - 1) {
        handleFetchMore();
      }
    }, 300); // Debounce to 300ms

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleFetchMore]);

  if (loading && !posts.length) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts List
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="posts">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {posts.map((post, index) => (
                <Draggable key={post.id} draggableId={'posts-' + post.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Post post={post} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {loading && <CircularProgress />}
    </Container>
  );
};

export default PostList;
