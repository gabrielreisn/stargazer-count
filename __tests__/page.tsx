import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Page from '@/app/page';
import { GITHUB_REPO_QUERY } from '@/graphql/queries/githubRepoQueries';
import { rawSuccessfulResponseData } from './mocks/repositoryData';
import userEvent from '@testing-library/user-event';

describe('Page', () => {
  afterEach(() => jest.clearAllMocks());

  it('handle error state', async () => {
    const mocks = [
      {
        request: {
          query: GITHUB_REPO_QUERY,
          variables: {
            query: '',
            first: 100,
          },
        },
        error: new Error('Something went wrong'),
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <Page />
      </MockedProvider>
    );

    expect(await screen.queryByText(/Something went wrong/i)).toBeDefined();
  });
  it('handle initial success state', async () => {
    const mocks = [
      {
        request: {
          query: GITHUB_REPO_QUERY,
          variables: {
            query: '',
            first: 100,
          },
        },
        result: {},
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <Page />
      </MockedProvider>
    );

    const renderedRows = screen.queryAllByTestId('filled-row');
    expect(renderedRows).toHaveLength(0);
  });
  it('handle success state after interaction', async () => {
    const mocks = [
      {
        request: {
          query: GITHUB_REPO_QUERY,
          variables: {
            query: '',
            first: 100,
          },
        },
        result: rawSuccessfulResponseData,
      },
    ];

    const user = userEvent.setup();

    render(
      <MockedProvider mocks={mocks}>
        <Page />
      </MockedProvider>
    );

    await user.type(
      screen.getByRole('searchbox', {
        name: /search for github repositories/i,
      }),
      'redux'
    );

    const renderedRows = screen.queryAllByTestId('filled-row');
    expect(renderedRows).toHaveLength(5);
  });
});
