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
import { useWindowDimensions } from "../../utils/customHooks";
import { MovieGenreSelector } from "./MovieGenreSelector";
import { useHistory } from "react-router";
import { registerUser } from "../../utils/apiConnector";

export default function RegisterPage(): ReactElement {
  const [regiDataInvalid, setRegiDataInvalid] = useState(true);
  const [passwordExact, setPasswordExact] = useState(true);
  const [passw, setPassw] = useState("");
  const [reapeatedPassw, setReapeatedPassw] = useState("");
  let { width } = useWindowDimensions();
  let history = useHistory();

  useEffect(() => {
    if (passw.length < 8) {
      setRegiDataInvalid(true);
      return;
    }
    /*
     * regex check if user provided password with at least
     * 2 non letter characters
     */
    const re = /.*[^a-zA-Z\n]+.*[^a-zA-Z\n]+.*/g;
    if (passw.match(re) == null) {
      setRegiDataInvalid(true);
      return;
    }
    setRegiDataInvalid(false);
  }, [passw]);

  useEffect(() => {
    setPasswordExact(reapeatedPassw === passw);
  }, [reapeatedPassw, passw]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      username: HTMLInputElement;
      mail: HTMLInputElement;
      password: HTMLInputElement;
    };

    registerUser(
      formElements.username.value,
      formElements.password.value,
      formElements.mail.value
    )
      .then(() => {
        history.push("/login/success");
      })
      .catch((e) => {
        console.log(e);
      });

  };

  const inputFormDispatcher = (
    e: React.ChangeEvent<HTMLInputElement>
  ): string => {
    return e.target.value;
  };

  const calculateColGenres = (): number => {
    return width > 900 ? 5 : width > 700 ? 4 : width > 600 ? 3 : 2;
  };

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw" }}
      bgColor="white"
      rounded="lg"
    >
      <form onSubmit={handleSubmit} style={{ width: "inherit" }}>
        <FormControl px={8} py={5}>
          <VStack justifyContent="center" spacing="4">
            <Container px={0}>
              <FormLabel width="inherit">Username</FormLabel>
              <Input id="username" type="text" isRequired />
            </Container>
            <Container px={0}>
              <FormLabel>Email</FormLabel>
              <Input id="mail" type="text" isRequired />
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
              <MovieGenreSelector cols={calculateColGenres()} />
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
