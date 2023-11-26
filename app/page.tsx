'use client';
import { GITHUB_REPO_QUERY } from '@/graphql/queries/githubRepoQueries';
import { useQuery } from '@apollo/client';
import EnhancedTable from '@/components/PaginatedTable';
import { useMemo, useState } from 'react';
import { parseSearchQueryData } from '@/modules/parseSearchQueryData';
import { TextField } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce';

export default function Home() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { loading, error, data } = useQuery(GITHUB_REPO_QUERY, {
    variables: {
      first: 100,
      query: debouncedQuery,
    },
  });

  const parsedData = useMemo(() => parseSearchQueryData(data), [data]);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value.trim())}
      />
      <EnhancedTable rows={parsedData} />
    </main>
  );
}
