import { Order } from '@/types/common';
import { GithubRepositoryData } from '@/types/github';
import { TableCell, TableRow } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

type HeadCell = {
  disablePadding: boolean;
  id: keyof GithubRepositoryData;
  label: string;
  numeric: boolean;
};

type TableHeaderProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof GithubRepositoryData) => void;
  order: Order;
  orderBy: string;
};

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Repository Name',
  },
  {
    id: 'stargazerCount',
    numeric: true,
    disablePadding: false,
    label: '⭐ Stars',
  },
  {
    id: 'forkCount',
    numeric: true,
    disablePadding: false,
    label: '🍴 Forks',
  },
];

export function TableHeader(props: TableHeaderProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof GithubRepositoryData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
