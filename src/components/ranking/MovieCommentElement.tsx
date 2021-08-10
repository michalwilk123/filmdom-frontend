import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { MovieComment } from "../../utils/backendInterfaces";
import { calculateStarValue, convertRatingToStar } from "../../utils/other";

interface Props extends BoxProps {
  comment: MovieComment;
  args?: {
    showMovieTitle?: boolean;
  };
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
      minHeight={props.comment.text !== null ? "100px" : "50px"}
      width="100%"
      p="2"
    >
      <Flex mt="0" justifyContent="left" width="inherit">
        <Box width="inherit">
          {props.args?.showMovieTitle && (
            <Flex justifyContent="center">
              <Heading fontSize="xl">{props.comment.movieTitle}</Heading>
            </Flex>
          )}
          <b>From:</b> {props.comment.creator}
          <p style={{ fontSize: "xs" }}>{props.comment.datePosted}</p>
          <p>{getStarString(props.comment.rating)}</p>
        </Box>
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
