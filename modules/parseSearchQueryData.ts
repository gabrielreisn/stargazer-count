import { SearchRepositoriesQuery } from "@/generated/graphql/graphql";
import { GithubRepositoryData } from "@/types/github";

export function parseSearchQueryData(data: SearchRepositoriesQuery | undefined): Array<GithubRepositoryData> {

  if (data == null) return []

  return data.search.edges?.map(entry => {
    if (entry?.node?.__typename === 'Repository') {
      const { id, forkCount, name, stargazerCount, url } = entry.node
      return (
        {
          id,
          forkCount,
          name, stargazerCount,
          url
        }
      )
    }
  }) as Array<GithubRepositoryData>

}