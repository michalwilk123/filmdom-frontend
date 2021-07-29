import { Box, HStack, StackProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { STAR_VALUES } from "../../utils/other";

interface Props extends StackProps {
  maxRating: number;
  initialRating?: number;
  onRatingSelect: (rating: number) => any;
}

const getDummyArray = (n: number): null[] => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(null);
  }
  return arr;
};

export const StarsRatingComponent = (props: Props) => {
  const dummyArray = getDummyArray(props.maxRating);
  const [currentRating, setCurrentRating] = useState(
    props.initialRating === undefined ? 0 : props.initialRating
  );

  return (
    <HStack
      spacing="0"
      onClick={(e) => {
        if (props.onRatingSelect !== undefined) {
          return props.onRatingSelect(currentRating);
        }
      }}
      _hover={{ cursor: "pointer" }}
    >
      <>
        {dummyArray.map((star: null, index: number) => {
          return (
            <Box
              key={index}
              px="0"
              onMouseOver={(e) => setCurrentRating(index + 1)}
            >
              {index < currentRating ? STAR_VALUES.FULL : STAR_VALUES.EMPTY}
            </Box>
          );
        })}
      </>
    </HStack>
  );
};
