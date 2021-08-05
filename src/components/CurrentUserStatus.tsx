import { Button, ButtonGroup } from "@chakra-ui/react";
import { useLocalStorage } from "@rehooks/local-storage";
import React from "react";
import { useHistory } from "react-router";
interface Props {}

export const CurrentUserStatus = (props: Props) => {
  let history = useHistory();
  const [authToken,,deleteToken] = useLocalStorage<string>("auth_token");
  console.log(authToken);

  if (!authToken) {
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
        deleteToken();
        console.log("dadas");
      }}
    >
      Log out
    </Button>
  );
};
