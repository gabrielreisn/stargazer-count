import { gql } from "@apollo/client";


export const GITHUB_REPO_QUERY = gql`
{
  search(query: "react", type: REPOSITORY, first: 10) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on Repository {
          name
          stargazerCount
          forkCount
          url
        }
      }
    }
  }
}

`