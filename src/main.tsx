import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

export const GlobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider manifestUrl='https://taiga-labs.github.io/dexlot.json'>{children}</TonConnectUIProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
);
