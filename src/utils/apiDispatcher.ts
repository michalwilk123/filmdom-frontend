import { MovieComment, MovieListElement } from "./backendInterfaces";

export const dispatchMovie = (movieData: any): MovieListElement => {
  return {
    id: movieData.id,
    title: movieData.title,
    thumbnail: movieData.thumbnail,
    remote_thumbnail: movieData.remote_thumbnail,
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
  genreList: { [key: string]: string }
): MovieListElement => {
  let genres = movieElement.genres.map((g) => {
    return genreList[g];
  });
  movieElement.genres = genres;
  return movieElement;
};

export const dispatchMovieActors = (
  movieElement: MovieListElement,
  actorList: string[]
): MovieListElement => {
  movieElement.actors.map((g) => {
    if (typeof g === "string") {
      // eslint-disable-next-line no-throw-literal
      throw "error";
    }
    return actorList[g - 1];
  });
  return movieElement;
};

export const dispatchMovieComment = (commentData: any): MovieComment => {
  return {
    text: commentData.text,
    rating: commentData.rating,
    creator: commentData.creator_name,
    datePosted: commentData.created,
    movieId: commentData.commented_movie,
    movieTitle: commentData.movie_title,
  };
};
