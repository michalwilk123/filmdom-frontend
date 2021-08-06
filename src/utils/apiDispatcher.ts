import { MovieListElement } from "./backendInterfaces";
import { ResponseListElement } from "./commonIterfaces";

export const dispatchMovie = (movieData: any): MovieListElement => {
  return {
    id: movieData.id,
    title: movieData.title,
    thumbnail: movieData.thumbnail,
    description: movieData.text,
    director: movieData.director_name,
    avgRating: movieData.average_rating,
    produceDate: movieData.produce_date,
    genres: movieData.genres,
    actors: movieData.actors,
  };
};

export const dispatchMovieGenres = (
  movieElement: MovieListElement,
  genreList:string []
): MovieListElement => {
  movieElement.genres.map((g) => {
    if (typeof g === "string") {
      // eslint-disable-next-line no-throw-literal
      throw "error";
    }
    return genreList[g - 1];
  });
  return movieElement;
};

export const dispatchMovieActors = (
  movieElement: MovieListElement,
  actorList: string[]
): MovieListElement => {
  movieElement.genres.map((g) => {
    if (typeof g === "string") {
      // eslint-disable-next-line no-throw-literal
      throw "error";
    }
    return actorList[g - 1];
  });
  return movieElement;
};
