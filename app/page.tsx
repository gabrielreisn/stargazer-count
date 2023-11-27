'use client';
import { GITHUB_REPO_QUERY } from '@/graphql/queries/githubRepoQueries';
import { useQuery } from '@apollo/client';
import { PaginatedTable } from '@/components/Table/PaginatedTable';
import { useMemo, useState } from 'react';
import { parseSearchQueryData } from '@/modules/parseSearchQueryData';
import { TextField, styled } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce';
import { ErrorMessage } from '@/components/ErrorMessage';

const Main = styled('main')({
  padding: '8rem',
  gap: '3rem',
  display: 'flex',
  flexDirection: 'column',

  // Media query for mobile devices
  '@media (max-width: 768px)': {
    padding: 0,
    gap: '0.5rem',
  },
});

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

  return (
    <Main>
      <TextField
        fullWidth
        role="searchbox"
        type="search"
        id="search-input"
        label="Search for Github Repositories"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value.trim())}
      />
      <PaginatedTable rows={parsedData} loading={loading} />
      {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
    </Main>
  );
}
