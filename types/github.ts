import { Repository } from "@/generated/graphql/graphql";

export type GithubRepositoryData = {} & Pick<Repository, 'id' | 'stargazerCount' | 'url' | 'name' | 'forkCount'>