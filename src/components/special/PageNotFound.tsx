import { Flex, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";

export default function PageNotFound(): ReactElement {
  return (
    <Flex justifyContent="center">
      <Text fontSize="5xl" as="b">
        404 Page not found
      </Text>
    </Flex>
  );
}
