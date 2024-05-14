'use client';
import { GITHUB_REPO_QUERY } from '@/graphql/queries/githubRepoQueries';
import { useQuery } from '@apollo/client';
import { PaginatedTable, ROWS_PER_PAGE } from '@/components/Table/PaginatedTable';
import { useCallback, useMemo, useState } from 'react';
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
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);
  const debouncedQuery = useDebounce(query, 300);
  const { loading, error, data, fetchMore } = useQuery(GITHUB_REPO_QUERY, {
    variables: {
      first: rowsPerPage * 2,
      query: debouncedQuery,
      after: null,
    },
  });

  const parsedData = useMemo(() => parseSearchQueryData(data), [data]);

  const hasNextPage = data?.search.pageInfo.hasNextPage;
  const endCursor = data?.search.pageInfo.endCursor;

  const handleFetchMore = useCallback(() => {
    if (hasNextPage === false) return;

    fetchMore({
      variables: {
        first: rowsPerPage * 2,
        query: debouncedQuery,
        after: endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const previousEdges = prevResult.search?.edges ?? [];
        const fetchMoreEdges = fetchMoreResult.search?.edges ?? [];
        return {
          search: {
            __typename: fetchMoreResult.search.__typename,
            edges: previousEdges.concat(fetchMoreEdges),
            pageInfo: fetchMoreResult.search.pageInfo,
          },
        };
      },
    });
  }, [hasNextPage, fetchMore, rowsPerPage, debouncedQuery, endCursor]);

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
      <PaginatedTable
        rows={parsedData}
        loading={loading}
        fetchMoreCallback={handleFetchMore}
        changeRowsPerPageCallback={(num) => setRowsPerPage(num)}
      />
      {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
    </Main>
  );
}
