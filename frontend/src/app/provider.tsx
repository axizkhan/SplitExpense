import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import customSystem from "./theme";

interface ProviderProps {
  children: ReactNode;
}

function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={customSystem}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}

export default Providers;
