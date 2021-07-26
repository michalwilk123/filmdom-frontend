import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { MovieListElement } from "../../utils/backendInterfaces";

interface Props extends FlexProps {
  showTumbnail?: boolean;
  movie: MovieListElement;
}

export const MovieCard = (props: Props) => {
  return <Flex {...props}></Flex>;
};
