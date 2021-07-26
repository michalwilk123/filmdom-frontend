import { Checkbox, HStack, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { arr_reshape } from "../../utils/other";

const testGenreList = [
  "horror",
  "drama",
  "comedy",
  "action",
  "romance",
  "science-fiction",
];

export default function MovieGenreSelector(): ReactElement {
  const [genreList, setGenreList] = useState<string[]>(testGenreList);

  useEffect(() => {
    // TODO: Should fetch here genre data
    setGenreList(testGenreList);
  }, []);

  return (
    <VStack>
      {arr_reshape(genreList, 4).map((row: string[]) => {
        // TODO: this breaks with long genre names and I
        // dont know how to solve it
        return (
          <HStack spacing="5">
            {row.map((genreName) => (
              <Checkbox id={genreName}>{genreName}</Checkbox>
            ))}
          </HStack>
        );
      })}
    </VStack>
  );
}
