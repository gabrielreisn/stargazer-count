import { gql } from "@/generated/graphql/gql";


export const GITHUB_REPO_QUERY = gql(`
  query SearchRepositories($query: String!, $first: Int!) {
    search(query: $query, type: REPOSITORY, first: $first) {
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