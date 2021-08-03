import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import { useLocalStorage } from "../utils/customHooks";

interface Props {}

export const CurrentUserStatus = (props: Props) => {
  let history = useHistory();
  const [authToken, , clearAuthToken] = useLocalStorage("auth_token");
  console.log(typeof authToken);

  if (authToken === null) {
    return (
      <ButtonGroup>
        <Button
          variant="outline"
          bgColor="gray.200"
          onClick={() => history.push("/login")}
        >
          Log in
        </Button>
        <Button colorScheme="red" onClick={() => history.push("/register")}>
          Sign up
        </Button>
      </ButtonGroup>
    );
  }
  return (
    <Button
      colorScheme="red"
      onClick={() => {
        clearAuthToken();
        window.location.reload();
      }}
    >
      Log out
    </Button>
  );
};
