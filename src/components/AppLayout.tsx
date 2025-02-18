import React from 'react';
import { Outlet } from 'react-router';
import ThemeToggle from './ThemeToggle';

export default function AppLayout() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50">
      <ThemeToggle />
      <Outlet />
    </div>
  );
}
