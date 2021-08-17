export interface MovieListElement {
  id: number;
  title: string;
  thumbnail: string | null; // url or no photo
  remote_thumbnail: string;
  description: string;
  director: string;
  avgRating: number; // best/worst
  produceDate: string; // newest oldest
  genres: string[] | number[];
  actors: string[] | number[];
}

export interface UserDtoData {
  username: string;
  creationDate: string;
  thumbnail: string | null; // url or no photo
  description: string;
  numberOfComments: number;
  favouriteGenres: string[];
}

export interface GenreInterface {
  name: string;
}

export interface MovieComment {
  movieId: number;
  movieTitle: string;
  text: string | null;
  rating: number;
  creator: string;
  datePosted: string;
}

export interface UserAuthSingature {
  username: string;
}
