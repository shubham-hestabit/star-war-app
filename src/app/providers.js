'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChakraProvider as CP } from '@chakra-ui/react'

export function ChakraProvider({ children }) {
    return <CP>{children}</CP>
}

export function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};