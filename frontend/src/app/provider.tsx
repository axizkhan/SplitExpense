import React from "react";
import type { ReactNode } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

interface ProviderProps {
  children: ReactNode;
}

function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}

export default Providers;
