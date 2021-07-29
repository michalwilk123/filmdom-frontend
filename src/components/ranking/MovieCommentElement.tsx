import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";
import { MovieComment } from "../../utils/backendInterfaces";
import { calculateStarValue, convertRatingToStar } from "../../utils/other";

interface Props extends MovieComment, BoxProps {}

export const MovieCommentElement = (props: Props) => {
  const getStarString = (rating: number): string => {
    let val = calculateStarValue(rating);
    if (val === undefined) {
      return "None";
    }
    return convertRatingToStar(val, 5);
  };

  return (
    <Box
      {...props}
      borderColor="blue.100"
      borderWidth="1px"
      rounded="md"
      minHeight={props.text !== null ? "100px" : "50px"}
      my="2"
      p="2"
    >
      <Text as="i">
        <b>User:</b> {props.creator}
        <Box>
          <Box justifyContent="left" height="inherit">
            {props.datePosted}
          </Box>
          <Box height="inherit" alignSelf="right">
            {getStarString(props.rating)}
          </Box>
        </Box>
      </Text>
      <Text>
        {props.text === null ? <></> : <Text fontSize="sm">{props.text}</Text>}
      </Text>
    </Box>
  );
};
