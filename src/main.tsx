import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';

import AppLayout from '@/components/AppLayout.tsx';
import { ThemeProvider } from './context/ThemeContext/provider';
import Post from '@/pages/Post';
import Home from './pages/Home';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="article/:postId" element={<Post />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
