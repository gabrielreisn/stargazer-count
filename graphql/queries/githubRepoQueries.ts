import { gql } from "@/generated/graphql/gql";


export const GITHUB_REPO_QUERY = gql(`
  query SearchRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      pageInfo{
        hasNextPage
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            url
            stargazerCount
            forkCount
          }
        }
      }
    }
  }
`)