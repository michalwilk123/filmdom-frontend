import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useLocalStorage } from "../../utils/customHooks";

// TODO: powinno sie gdzies tutaj sprawdzać czy użytkownik już jest zalogowany
interface Props {
  fresh_register?: boolean;
}

export const LoginPage = (props: Props): ReactElement => {
  // TODO: plug this into the website
  const [, setAuthToken] = useLocalStorage("auth_token");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // NOTE: Connecting to the api! Retrieving session token
    console.log("im am logging in");
  };
  setAuthToken(null);

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
