import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { darkTheme } from "./themeConfig";
import { Toaster } from "@/components/ui/toaster";

interface ProviderProps {
  children: ReactNode;
}

function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={darkTheme}>
        {children}
        <Toaster />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default Providers;
