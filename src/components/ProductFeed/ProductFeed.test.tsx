import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductFeed from './ProductFeed';

describe('<ProductFeed />', () => {
  test('it should mount', () => {
    render(<ProductFeed />);
    
    const productFeed = screen.getByTestId('ProductFeed');

    expect(productFeed).toBeInTheDocument();
  });
});