import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce', () => {

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('initialValue'));
    expect(result.current).toBe('initialValue');
  });

  test('should update debounced value after the delay', async () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initialValue', delay: 1000 },
      }
    );

    expect(result.current).toBe('initialValue');

    rerender({ value: 'updatedValue', delay: 1000 });

    expect(result.current).toBe('initialValue');

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current).toBe('updatedValue');

    jest.useRealTimers();
  });
});
