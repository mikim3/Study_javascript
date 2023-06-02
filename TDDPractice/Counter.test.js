// Counter.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders counter component', () => {
  const { getByText, getByTestId } = render(<Counter />);

  // 초기 카운트 값은 0이어야 함
  const countElement = getByTestId('count');
  expect(countElement.textContent).toBe('Count: 0');

  // + 버튼 클릭 후 카운트 값은 1이어야 함
  const incrementButton = getByText('+');
  fireEvent.click(incrementButton);
  expect(countElement.textContent).toBe('Count: 1');

  // - 버튼 클릭 후 카운트 값은 0이어야 함
  const decrementButton = getByText('-');
  fireEvent.click(decrementButton);
  expect(countElement.textContent).toBe('Count: 0');
});
