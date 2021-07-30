import { ChakraProvider, Spacer, theme, VStack } from "@chakra-ui/react";
import { AppHeader } from "./components/AppHeader";
import React from "react";
import AppRouter from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { AppFooter } from "./components/AppFooter";

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
