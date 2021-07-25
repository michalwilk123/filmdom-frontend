import { Button, ButtonGroup, Container } from "@chakra-ui/react";
import React from "react";

enum UserLoginStates {
  LOGGED, // shows hello message
  NOT_LOGGED, // shows buttons to ecourage user to sign up/in
  CURRENTY_LOGGING, // empty container
}

interface Props {
  userLoginState?: UserLoginStates;
}

export const CurrentUserStatus = (props: Props) => {
  if (props.userLoginState === UserLoginStates.NOT_LOGGED) {
    return (
      <ButtonGroup>
        <Button variant="outline" bgColor="gray.200">
          Log in
        </Button>
        <Button colorScheme="red">Sign in</Button>
      </ButtonGroup>
    );
  } else if (props.userLoginState === UserLoginStates.LOGGED) {
    return <div></div>;
  } else if (props.userLoginState === UserLoginStates.CURRENTY_LOGGING) {
    return <div></div>;
  } else throw "cannot define the login status of the user";
};

CurrentUserStatus.defaultProps = {
  userLoginState: UserLoginStates.NOT_LOGGED,
};
