import { Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { InvalidAuthTokenPage } from "./components/authorizationRelated/InvalidAuthTokenPage";
import { LoginPage } from "./components/authorizationRelated/LoginPage";
import RegisterPage from "./components/authorizationRelated/RegisterPage";
import { SimpleAdminPage } from "./components/authorizationRelated/SimpleAdminPage";
import { HomePage } from "./components/HomePage";
import { RankingPage } from "./components/ranking/RankingPage";
import PageNotFound from "./components/special/PageNotFound";

interface Props {}

export const AppRouter = (props: Props) => {
  return (
    <Flex
      width="100%"
      bgColor="gray.100"
      justifyContent="center"
      p="5"
      minHeight="700px"
    >
      <Switch>
        <Route exact path={["/", "/home"]} component={HomePage} />
        <Route exact path="/login/:success" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/ranking" component={RankingPage} />
        <Route path="/ranking/:args" component={RankingPage} />
        <Route path="/admin" component={SimpleAdminPage} />
        <Route
          exact
          path="/invalid-auth-token"
          component={InvalidAuthTokenPage}
        />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Flex>
  );
};
