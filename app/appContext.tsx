"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from "./context/Globalcontext";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>{children}</GlobalProvider>
    </QueryClientProvider>
  );
}
