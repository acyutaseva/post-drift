import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query posts {
    posts {
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

