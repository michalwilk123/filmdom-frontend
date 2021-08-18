import {
  Checkbox,
  HStack,
  StackProps,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { getMovieGenres } from "../../utils/apiConnector";
import { arrReshape } from "../../utils/other";

interface Props extends StackProps {
  cols: number;
}

export const MovieGenreSelector = (props: Props): ReactElement => {
  const [genreList, setGenreList] = useState<
    Array<{ id: number; name: string }>
  >([]);

  useEffect(() => {
    // NOTE: Should fetch here genre data
    getMovieGenres()
      .then((response) => {
        setGenreList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <VStack {...props}>
      <Wrap>
        {genreList.map((elem) => {
          return (
            <WrapItem>
              <Checkbox
                key={elem.id.toString()}
                id={elem.id.toString()}
                value={elem.id.toString()}
              >
                {elem.name}
              </Checkbox>
            </WrapItem>
          );
        })}
      </Wrap>
    </VStack>
  );
};
