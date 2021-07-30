import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { MovieComment } from "../../utils/backendInterfaces";
import { calculateStarValue, convertRatingToStar } from "../../utils/other";

interface Props extends BoxProps {
  comment: MovieComment;
}

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
      // borderColor="blue.100"
      // borderWidth="1px"
      // rounded="md"
      minHeight={props.comment.text !== null ? "100px" : "50px"}
      p="2"
    >
      <Flex mt="0" justifyContent="left" width="100%">
        <Text as="i">
          <b>User:</b> {props.comment.creator}
          <p style={{ fontSize: "xs" }}>{props.comment.datePosted}</p>
          <p>{getStarString(props.comment.rating)}</p>
        </Text>
      </Flex>
      <Flex mb="0">
        {props.comment.text === null ? (
          <></>
        ) : (
          <Text fontSize="sm">{props.comment.text}</Text>
        )}
      </Flex>
    </Box>
  );
};
