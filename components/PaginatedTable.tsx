import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { GithubRepositoryData } from '@/types/github';
import { useEffect } from 'react';
import Link from 'next/link';
import { TableHeader } from './TableHeader';
import { Order } from '@/types/common';
import { StyledEmptyTableRow, StyledTableCell, StyledTableRow } from './PaginatedTable.styled';

type TableProps = {
  rows: Array<GithubRepositoryData>;
};

const ROWS_PER_PAGE = [5, 10, 25];

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

export function EnhancedTable({ rows }: TableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof GithubRepositoryData>('stargazerCount');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(
    function syncPageOnDataUpdate() {
      setPage(0);
    },
    [rows]
  );

  function handleRequestSort(_event: React.MouseEvent<unknown>, property: keyof GithubRepositoryData) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  function handleChangePage(_event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
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
          <Table sx={{ minWidth: 750, minHeight: 400 }} aria-labelledby="tableTitle" size="medium">
            <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `table-${index}`;

                return (
                  <StyledTableRow hover tabIndex={-1} key={row.id}>
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
                <StyledEmptyTableRow emptyRows={emptyRows}>
                  <TableCell colSpan={3} />
                </StyledEmptyTableRow>
              )}
            </TableBody>
          </Table>
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
