import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import test from 'node:test';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement);
});

function expect(linkElement: any) {
  throw new Error('Function not implemented.');
}
