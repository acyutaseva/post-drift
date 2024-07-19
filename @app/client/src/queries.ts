import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($offset: Int!, $limit: Int!) {
    posts(offset: $offset, limit: $limit) {
      id
      title
      content
      position
    }
  }
`;

export const UPDATE_POST_POSITION = gql`
  mutation UpdatePostPosition($id: Int!, $input: UpdatePostInput!) {
    updatePostPosition(id: $id, input: $input) {
      id
      title
      content
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      content
    }
  }
`;

export const POST_POSITION_CHANGED = gql`
  subscription {
    postPositionChanged {
      id
      title
      content
      position
    }
  }
`;
