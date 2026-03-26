"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// FIX: We changed the type definition here so it doesn't look for the missing folder
export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}