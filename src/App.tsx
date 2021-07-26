import { ChakraProvider, Spacer, theme, VStack } from "@chakra-ui/react";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import React from "react";
import AppRouter from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <VStack minHeight="100vh" spacing="0">
          <AppHeader />
          <AppRouter />
          <Spacer bgColor="gray.100" />
          <AppFooter />
        </VStack>
      </Router>
    </ChakraProvider>
  );
};
