import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useLocalStorage } from "@rehooks/local-storage";
import React, { ReactElement, useEffect } from "react";
import { getAuthToken } from "../../utils/apiConnector";

interface Props {
  fresh_register?: boolean;
}

export const LoginPage = (props: Props): ReactElement => {
  const [, setToken, deleteToken] = useLocalStorage("auth_token");
  // TODO: plug this into the website
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };
    // NOTE: Connecting to the api! Retrieving session token

    getAuthToken(formElements.username.value, formElements.password.value)
      .then((response) => {
        setToken(response.data.token);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              console.log("400 error");
              break;
            case 401:
              console.log("401 error");
              break;
            default:
              console.log(`${error.response.status} error`);
          }
        }
      });
  };
  useEffect(() => {
    deleteToken();
  }, [deleteToken]);

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
      flexDirection="column"
    >
      {props.fresh_register && (
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Registration was successful!
        </Alert>
      )}
      <form onSubmit={handleSubmit} style={{ width: "inherit" }}>
        <FormControl px={8} py={4}>
          <FormLabel>Username</FormLabel>
          <Input id="username" type="text" isRequired />
          <FormLabel pt={5}>Password</FormLabel>
          <Input id="password" type="password" isRequired />
          <Button type="submit" colorScheme="gray" marginY={5}>
            Log in
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};
