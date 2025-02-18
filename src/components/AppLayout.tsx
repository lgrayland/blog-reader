import { Link, Outlet } from 'react-router';
import ThemeToggle from './ThemeToggle';
import ScrollToTop from './ScrollToTop';

export default function AppLayout() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-950 dark:text-gray-50 min-h-screen flex flex-col">
      <header className="flex container mx-auto p-4 justify-between items-center bg-gray-950 text-white">
        <Link to="/" className="text-2xl font-bold">
          Blog Reader
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-grow ">
        <Outlet />
      </main>
      <footer className="bg-gray-950 text-white py-4 text-center">
        <p>&copy; 2025 Blog Reader. All rights reserved.</p>
      </footer>
      <ScrollToTop />
    </div>
  );
}
