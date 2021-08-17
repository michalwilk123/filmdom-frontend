import {
  Flex,
  Text,
  Link,
  Center,
  VStack,
  HStack,
  Box,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { useLocalStorage } from "@rehooks/local-storage";

export const AppFooter = () => {
  const [ displayUnsafe, setDisplayUnsafe] = useLocalStorage("display_unsafe");

  const toggleImageUnsafeMode = (event: ChangeEvent<HTMLInputElement>):void => {
    setDisplayUnsafe(event.target.checked.toString());
  };

  return (
    <Flex bgColor="gray.400" width="100%" justifyContent="center" py="5">
      <Center width={{ base: "100%", md: "90%", lg: "80%" }}>
        <VStack spacing="0">
          <Text as="b">Contact Info</Text>
          <HStack>
            <Link color="blue.600" href="https://github.com/michalwilk123">
              Github
            </Link>
            <Link color="blue.600">Blog</Link>
          </HStack>
          <Text>
            Created by Michał Wilk 2021 for{" "}
            <Link color="blue.600" href="https://idego-group.com/">
              Idego Group
            </Link>
          </Text>
          <Flex>
            <Link to="/">Return to the main page</Link>
            <Tooltip
              aria-label="tooltip"
              label="When on, non filtered images will be displayed inside the 
                    application. Some of them could be NSFW material. Be careful."
              bg="red.300"
              color="black"
              hasArrow
            >
              <Box pl="6">
                <Text as="b">Unsafe mode</Text>
                <Switch defaultChecked={displayUnsafe === "true"} colorScheme="red" pl="3" onChange={toggleImageUnsafeMode}/>
              </Box>
            </Tooltip>
          </Flex>
        </VStack>
      </Center>
    </Flex>
  );
};
