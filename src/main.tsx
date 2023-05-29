import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { StyledProvider } from '@team-entry/design_system';
import App from './App.tsx';
import { GlobalStyle } from './style/globalstyle.style.ts';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <StyledProvider>
      <QueryClientProvider client={queryClient}>
        <Global styles={GlobalStyle} />
        <App />
      </QueryClientProvider>
    </StyledProvider>
  </>,
);
