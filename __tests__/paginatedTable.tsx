import { render, screen } from '@testing-library/react';
import { PaginatedTable } from '@/components/Table/PaginatedTable';
import { successfulParsedResponseData } from './mocks/repositoryData';
import userEvent from '@testing-library/user-event';

describe('PaginatedTable', () => {
  it('renders a heading', () => {
    render(<PaginatedTable rows={successfulParsedResponseData} />);
    const renderedRows = screen.getAllByTestId('filled-row');
    expect(renderedRows).toHaveLength(5);
  });

  it('renders the skeleton rows during load', () => {
    render(<PaginatedTable rows={[]} loading />);
    const skeletonRows = screen.getAllByTestId('skeleton-row');

    expect(skeletonRows).toHaveLength(5);
  });

  it('should change the amount of items per page', async () => {
    const user = userEvent.setup();
    render(<PaginatedTable rows={successfulParsedResponseData} />);
    const renderedRows = screen.getAllByTestId('filled-row');
    expect(renderedRows).toHaveLength(5);

    await user.click(
      screen.getByRole('combobox', {
        name: /rows per page:/i,
      })
    );

    await user.click(
      screen.getByRole('option', {
        name: /25/i,
      })
    );

    expect(screen.getAllByTestId('filled-row')).toHaveLength(25);
  });

  it('should change list based on the pagination', async () => {
    const user = userEvent.setup();
    render(<PaginatedTable rows={successfulParsedResponseData} />);
    expect(screen.getByText(/1–5 of 100/i)).toBeDefined();

    await user.click(
      screen.getByRole('button', {
        name: /go to next page/i,
      })
    );

    expect(screen.getByText(/6–10 of 100/i)).toBeDefined();
  });
});
