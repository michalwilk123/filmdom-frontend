import { Container, Heading } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { MovieListElement } from "../../utils/backendInterfaces";
import {MovieGenreSelector} from "../authorizationRelated/MovieGenreSelector";


/* NOTE: I chose that we really like the user and sort and filter the data
* in  backend. I do not know if this approach is correct. We can save up some
* cpu time on backend if we leave the data unsorted
*/

const testFilmList:MovieListElement[] = [
  {
    title:"Django Unchained",
    thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiM2ek2bgWMbQGeqTnArHy9RoEGS_z_RYUvlDrRxgBCXL0LzUD",
    description:"very cool movie",
    director:"Quentin Tarantino",
    no_of_comments:2,
    rating:4
  },
  {
    title:"Forrest Gump",
    thumbnail:"https://fwcdn.pl/fpo/09/98/998/7314731.3.jpg",
    description:"nice movie",
    director:"Robert Zemeckis",
    no_of_comments:10,
    rating:4.2
  },
  {
    title:"Lorem Ipsum",
    thumbnail:null,
    description:"w/e movie",
    director:"John Doe",
    no_of_comments:0,
    rating:0
  }
];

const fetchRanking = ():MovieListElement[] => {
  return testFilmList;
};


interface Props{
  rankingStateFunc:React.Dispatch<React.SetStateAction<MovieListElement[]>>
}


export const MovieFilterFeed = (props:Props): ReactElement => {
  const handleRankingListRequest = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const movieList = fetchRanking();
    props.rankingStateFunc(movieList);
  };

  return (<Container py="7">
    <Heading>Ranking</Heading>
    <form onSubmit={handleRankingListRequest}>
    </form>
    <MovieGenreSelector py={10}/>
  </Container>);
}
