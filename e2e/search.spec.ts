import { test, expect } from '@playwright/test';

test('should render with empty state and load elements after typing', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('search-table-body')).toBeEmpty();

  await page.getByLabel(/Search for Github Repositories/).fill('redux');

  await expect(page.getByTestId('search-table-body').getByRole('row')).toHaveCount(5);
});

test('cleaning the input after searching should clear the table', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('search-table-body')).toBeEmpty();

  await page.getByLabel(/Search for Github Repositories/).fill('redux');

  await expect(page.getByTestId('search-table-body').getByRole('row')).toHaveCount(5);

  await page.getByLabel(/Search for Github Repositories/).fill('');

  await expect(page.getByTestId('search-table-body')).toBeEmpty();
});

