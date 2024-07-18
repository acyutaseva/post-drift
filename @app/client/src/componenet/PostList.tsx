import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, UPDATE_POST, UPDATE_POST_POSITION } from '../queries';
import Post from './Post';
import { Container, Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart, DragUpdate } from 'react-beautiful-dnd';

const PostList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [updatePostPosition] = useMutation(UPDATE_POST_POSITION);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const data = await updatePostPosition({ variables: { id: reorderedItem["id"], input:{position: result.destination.index} } });

    setPosts(data.data.updatePostPosition);
};

const onDragStart = async (result: DragStart) => {
    
};

const onDragUpdate = async (result: DragUpdate) => {
    
};
if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts List
      </Typography>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="posts">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {posts.map((post:any, index) => (
                <Draggable key={post.id} draggableId={"posts-"+post.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
    </Container>
  );
};

export default PostList;
