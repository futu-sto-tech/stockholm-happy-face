import Index from '../screens/login';
import React from 'react';
import { render } from '@testing-library/react';

test('renders skeleton screens correctly', () => {
  const { getAllByTestId } = render(<Index />);
  const skeletonElements = getAllByTestId('skeleton-item');
  expect(skeletonElements.length).toEqual(5);
});
