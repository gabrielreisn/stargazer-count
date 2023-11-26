import { styled } from '@mui/material';

export const ErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.dark,
  textDecoration: `${theme.palette.error.dark} wavy underline`,
}));
