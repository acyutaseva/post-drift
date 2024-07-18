import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query posts {
    posts {
      id
      title
      content
      order
    }
  }
`;

export const UPDATE_POST_ORDER = gql`
  mutation UpdatePostOrder($ids: [ID!]!) {
    updatePostOrder(ids: $ids) {
      success
    }
  }
`;
