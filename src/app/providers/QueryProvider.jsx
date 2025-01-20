'use client';

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from 'react';

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // Always refetch when language changes
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}