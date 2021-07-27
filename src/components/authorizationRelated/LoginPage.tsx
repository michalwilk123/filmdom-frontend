import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { ReactElement } from "react";

// TODO: powinno sie gdzies tutaj sprawdzać czy użytkownik już jest zalogowany

export default function LoginPage(): ReactElement {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("im am logging in");
  };

  return (
    <Flex
      width={{ base: "80vw", lg: "50vw", xl: "40vw", md: "70vw"}}
      bgColor="white"
      rounded="lg"
    >
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
}
