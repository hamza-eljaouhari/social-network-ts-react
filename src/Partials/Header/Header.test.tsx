import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test("doesn't render any drawer toggling menu when user is not authenticated", () => {
  render(<Header toggleSidebar={() => {}}/>);
  const drawerToggler = screen.getByTestId("drawer-toggler");
  expect(drawerToggler).not.toBeInTheDocument();
});
