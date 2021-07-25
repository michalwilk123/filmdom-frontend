import { ChakraProvider, Spacer, theme, VStack } from "@chakra-ui/react";
import { AppHeader } from "./components/AppHeader";
import { AppBody } from "./components/AppBody";
import { AppFooter } from "./components/AppFooter";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AppRouter from "./AppRouter";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack minHeight="100vh" spacing="0">
        <AppHeader />
        <AppRouter/>
        <Spacer bgColor="gray.100" />
        <AppFooter />
      </VStack>
      {/* <Heading fontSize="12">hello</Heading> */}
    </ChakraProvider>
  );
};
