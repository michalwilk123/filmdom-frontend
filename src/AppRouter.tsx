import { Flex } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppBody } from "./components/AppBody";
import LoginPage from "./components/authorizationRelated/LoginPage";
import RegisterPage from "./components/authorizationRelated/RegisterPage";
import PageNotFound from "./components/special/PageNotFound";

export default function AppRouter() {
  return (
    <Flex
      width="100vw"
      bgColor="gray.100"
      justifyContent="center"
      p="5"
      minHeight="700"
    >
      <BrowserRouter>
        <Switch>
          <Route exact path={["/", "home"]} component={AppBody} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Flex>
  );
}
