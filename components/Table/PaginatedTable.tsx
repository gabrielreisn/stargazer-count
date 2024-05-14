'use client';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { GithubRepositoryData } from '@/types/github';
import { ChangeEvent, useEffect, useMemo, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { TableHeader } from './TableHeader';
import { Order } from '@/types/common';
import { StyledEmptyTableRow, StyledTable, StyledTableCell, StyledTableRow } from './PaginatedTable.styled';
import { TableLoadingState } from './LoadingState';

type TableProps = {
  rows: Array<GithubRepositoryData>;
  loading?: boolean;
  fetchMoreCallback?: () => void;
  changeRowsPerPageCallback?: (rows: number) => void;
};

export const ROWS_PER_PAGE = [5, 10, 25];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof GithubRepositoryData>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function PaginatedTable({ rows, loading = false, fetchMoreCallback, changeRowsPerPageCallback }: TableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof GithubRepositoryData>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(rows.length / rowsPerPage);

  useEffect(
    function fetchMoreDataBeforeTwoPagesToEnd() {
      if (page > 0 && page + 2 >= pages) {
        fetchMoreCallback?.();
      }
    },
    [fetchMoreCallback, page, pages]
  );

  useEffect(
    function syncPageOnDataUpdate() {
      if (rows.length === 0) {
        setPage(0);
      }
    },
    [rows]
  );

  function handleRequestSort(_event: MouseEvent<unknown>, property: keyof GithubRepositoryData) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
  }

  function handleChangePage(_event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    changeRowsPerPageCallback?.(parseInt(event.target.value, 10));
    setPage(0);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows, rowsPerPage]
  );

  return (
    <Box>
      <Paper>
        <TableContainer>
          <StyledTable aria-labelledby="search-table" size="medium" role="table">
            <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody data-testid="search-table-body">
              {visibleRows.map((row, index) => {
                const labelId = `table-${index}`;

                return (
                  <StyledTableRow hover tabIndex={-1} key={row.id} data-testid="filled-row">
                    <StyledTableCell component="th" id={labelId} scope="row">
                      <Link href={row.url} target="_blank" rel="noopener noreferrer">
                        {row.name}
                      </Link>
                    </StyledTableCell>
                    <TableCell align="right">{row.stargazerCount}</TableCell>
                    <TableCell align="right">{row.forkCount}</TableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <StyledEmptyTableRow emptyRows={emptyRows} data-testid="empty-row">
                  <TableCell colSpan={3} />
                </StyledEmptyTableRow>
              )}
              {loading &&
                Array.from({ length: rowsPerPage }, (_, index) => index + 1).map((_row, index) => (
                  <TableLoadingState key={index} />
                ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ROWS_PER_PAGE}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
