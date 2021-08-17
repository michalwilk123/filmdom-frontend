import { Checkbox, HStack, StackProps, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { getMovieGenres } from "../../utils/apiConnector";
import { arrReshape } from "../../utils/other";

interface Props extends StackProps {
  cols: number;
}

export const MovieGenreSelector = (props: Props): ReactElement => {
  const [genreList, setGenreList] = useState<string[]>([]);

  useEffect(() => {
    // NOTE: Should fetch here genre data
    getMovieGenres().then((response)=>{
      setGenreList(response.data.map((val:{id:string, name:string})=>{return val.name}));
    }).catch((error)=>{console.log(error)})
  }, []);

  return (
    <VStack {...props}>
      {arrReshape(genreList, props.cols).map((row: string[]) => {
        // TODO: this breaks with long genre names and I
        // dont know how to solve it
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
