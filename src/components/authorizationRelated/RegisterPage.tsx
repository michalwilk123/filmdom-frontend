import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Container,
  FormHelperText,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import MovieGenreSelector from "./MovieGenreSelector";

export default function RegisterPage(): ReactElement {
  const [regiDataInvalid, setRegiDataInvalid] = useState(true);
  const [passwordExact, setPasswordExact] = useState(true);
  const [passw, setPassw] = useState("");
  const [reapeatedPassw, setReapeatedPassw] = useState("");

  useEffect(() => {
    if (passw.length < 8) {
      console.log("length too small");
      setRegiDataInvalid(true);
      return;
    }
    /*
     * regex check if user provided password with at least
     * 2 non letter characters
     */
    const re = /.*[^a-zA-Z\n]+.*[^a-zA-Z\n]+.*/g;
    if (passw.match(re) == null) {
      console.log("password invalid: " + passw + " " + passw.match(re));
      setRegiDataInvalid(true);
      return;
    }
    setRegiDataInvalid(false);
  }, [passw]);

  useEffect(() => {
    setPasswordExact(reapeatedPassw === passw);
  }, [reapeatedPassw, passw]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("i am registering");
  };

  const inputFormDispatcher = (
    e: React.ChangeEvent<HTMLInputElement>
  ): string => {
    return e.target.value;
  };

  return (
    <Flex
      width={{ base: "60vw", lg: "40vw", xl: "30vw" }}
      bgColor="white"
      rounded="lg"
    >
      <form onSubmit={handleSubmit} style={{ width: "inherit" }}>
        <FormControl px={8} py={5}>
          <VStack align="left" spacing="4">
            <Container px={0}>
              <FormLabel width="inherit">Username</FormLabel>
              <Input id="username" type="text" isRequired />
            </Container>
            <Container px={0}>
              <FormLabel>Email</FormLabel>
              <Input id="username" type="text" isRequired />
            </Container>
            <Container px={0}>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassw(inputFormDispatcher(e))}
                id="password"
                type="password"
                isRequired
              />
              <FormHelperText hidden={!regiDataInvalid} textColor="red.400">
                Password should have at least 8 characters and contain at least
                2 non letter characters
              </FormHelperText>
            </Container>
            <Container px={0}>
              <FormLabel>Repeat Password</FormLabel>
              <Input
                onChange={(e) => setReapeatedPassw(inputFormDispatcher(e))}
                id="password-repeat"
                type="password"
                isRequired
              />
              <FormHelperText hidden={passwordExact} textColor="red.400">
                Password are not the same
              </FormHelperText>
            </Container>
            <Container px={0} py={3}>
              <FormLabel fontSize="2xl" textAlign="center">
                Select your favourite genres
              </FormLabel>
              <MovieGenreSelector />
            </Container>
            <Button
              isDisabled={regiDataInvalid || !passwordExact}
              type="submit"
              colorScheme="gray"
            >
              Log in
            </Button>
          </VStack>
        </FormControl>
      </form>
    </Flex>
  );
}
