import { Skeleton, TableCell } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './PaginatedTable.styled';

export function TableLoadingState() {
  return (
    <StyledTableRow hover tabIndex={-1}>
      <StyledTableCell scope="row">
        <Skeleton animation="wave" height={60} />
      </StyledTableCell>
      <TableCell align="right">
        <Skeleton animation="wave" height={60} />
      </TableCell>
      <TableCell align="right">
        <Skeleton animation="wave" height={60} />
      </TableCell>
    </StyledTableRow>
  );
}
