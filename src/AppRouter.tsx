import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/authorizationRelated/LoginPage";
import RegisterPage from "./components/authorizationRelated/RegisterPage";
import { HomePage } from "./components/HomePage";
import {RankingPage} from "./components/ranking/RankingPage";
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
      <Switch>
        <Route exact path={["/", "/home"]} component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/ranking" component={RankingPage} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Flex>
  );
}
