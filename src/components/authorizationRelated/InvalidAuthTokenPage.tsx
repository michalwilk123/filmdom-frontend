import { Center, Flex } from "@chakra-ui/react";
import { deleteFromStorage } from "@rehooks/local-storage";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const SEC_TO_REDIRECT = 4;
interface Props {}

export const InvalidAuthTokenPage = (props: Props) => {
  const [timeLeft, setTimeLeft] = useState(SEC_TO_REDIRECT);
  let history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft === SEC_TO_REDIRECT) {
        deleteFromStorage("auth_token")
      } else if (timeLeft <= 0) {
        history.push("/home");
        return;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [history, timeLeft]);

  return (
    <Flex bgColor="white" minWidth="70vw">
      <Center mx="auto">
        <p>Your authentication token was invalid!</p>
        <p>You will be redirected to the home page </p>
        <p>after {timeLeft} seconds.</p>
      </Center>
    </Flex>
  );
};
