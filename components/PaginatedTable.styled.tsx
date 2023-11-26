import { TableCell, TableRow, styled } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: 300,
  a: {
    color: theme.palette.common.black,
    textDecoration: 'none',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const StyledEmptyTableRow = styled(TableRow)((props: { emptyRows: number }) => ({
  height: 53 * props.emptyRows,
}));
