import React from 'react';
import { Outlet } from 'react-router';
import ThemeToggle from './ThemeToggle';

export default function AppLayout() {
  return (
    <div>
      <ThemeToggle />
      <Outlet />
    </div>
  );
}
