import { Checkbox, HStack, StackProps, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { arrReshape } from "../../utils/other";

const testGenreList = [
  "horror",
  "drama",
  "comedy",
  "action",
  "romance",
  "science-fiction",
];

interface Props extends StackProps {
  cols: number;
}

export const MovieGenreSelector = (props: Props): ReactElement => {
  const [genreList, setGenreList] = useState<string[]>(testGenreList);

  useEffect(() => {
    // NOTE: Should fetch here genre data
    setGenreList(testGenreList);
  }, []);

  return (
    <VStack {...props}>
      {arrReshape(genreList, props.cols).map((row: string[]) => {
        // TODO: this breaks with long genre names and I
        // dont know how to solve it
        // NOTE: WRAP. this would so much easier...
        return (
          <HStack key={row.toString()} spacing="5">
            {row.map((genreName) => (
              <Checkbox id={genreName} key={genreName}>
                {genreName}
              </Checkbox>
            ))}
          </HStack>
        );
      })}
    </VStack>
  );
};
