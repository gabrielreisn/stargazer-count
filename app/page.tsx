'use client';
import { GITHUB_REPO_QUERY } from '@/queries/githubRepoQueries';
import { useQuery } from '@apollo/client';

export default function Home() {
  const { loading, error, data } = useQuery(GITHUB_REPO_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(data)}</pre>
    </main>
  );
}
