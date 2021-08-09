import { Flex, Heading, Select, Spacer } from "@chakra-ui/react";
import axios from "axios";
import React, { ReactElement, useEffect} from "react";
import { getMovieActors, getMovieGenres, getMovies } from "../../utils/apiConnector";
import { dispatchMovie, dispatchMovieGenres, dispatchMovieActors } from "../../utils/apiDispatcher";
import { MovieListElement } from "../../utils/backendInterfaces";
import { MovieSortMethods } from "../../utils/commonIterfaces";
import { sortMethodStringToEnum } from "../../utils/other";


interface Props {
  rankingStateFunc: React.Dispatch<React.SetStateAction<MovieListElement[]>>;
}

export const MovieFilterFeed = (props: Props): ReactElement => {
  useEffect(() => {
    fetchRanking(MovieSortMethods.POPULARITY_DES);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRanking = (sort_method:MovieSortMethods): MovieListElement[] => {
    let movieGenres: string[];
    let movieActors: string[];
    let movieList: MovieListElement[] = [];
    console.log(`method: ${sort_method}`);

    axios
      .all([
        getMovieGenres(),
        getMovieActors(),
        getMovies({limit:5, sortMethod: sort_method }),
      ])
      .then(
        axios.spread((genreRes, actorRes, movieRes) => {
          movieGenres = genreRes.data;
          movieActors = actorRes.data;
          movieList = movieRes.data.map((x: any) => dispatchMovie(x));
          movieList
            .map((e) => dispatchMovieGenres(e, movieGenres))
            .map((e) => dispatchMovieActors(e, movieActors));
        props.rankingStateFunc(movieList);
        })
      )
      .catch((errors) => console.log(errors));
  
    return movieList;
  };

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetchRanking(sortMethodStringToEnum(e.target.value));
  };

  return (
    <Flex py="3" px="6" width="inherit">
      <Heading>Ranking</Heading>
      <Spacer />
      <Select
        _hover={{ cursor: "pointer" }}
        onChange={onSortTypeChange}
        width="250px"
      >
        {Object.values(MovieSortMethods).map((method) => (
          <option key={method}>{method}</option>
        ))}
      </Select>
    </Flex>
  );
};
