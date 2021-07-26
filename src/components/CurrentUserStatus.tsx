import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

enum UserLoginStates {
  LOGGED, // shows hello message
  NOT_LOGGED, // shows buttons to ecourage user to sign up/in
}

interface Props {
  userLoginState?: UserLoginStates;
}

export const CurrentUserStatus = (props: Props) => {
  const noLoginStateDefined = "cannot define the login status of the user";
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
  } else throw noLoginStateDefined;
};

CurrentUserStatus.defaultProps = {
  userLoginState: UserLoginStates.NOT_LOGGED,
};
