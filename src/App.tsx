import { ChakraProvider, Spacer, theme, VStack } from "@chakra-ui/react";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import React from "react";
import AppRouter from "./AppRouter";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack minHeight="100vh" spacing="0">
        <AppHeader />
        <AppRouter />
        <Spacer bgColor="gray.100" />
        <AppFooter />
      </VStack>
    </ChakraProvider>
  );
};
