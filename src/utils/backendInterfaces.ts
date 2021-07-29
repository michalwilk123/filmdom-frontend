export interface MovieListElement {
  id: number;
  title: string;
  thumbnail: string | null; // url or no photo
  description: string;
  director: string;
  noOfComments: number; // popularity
  avgRating: number; // best/worst
  produceDate: string; // newest oldest
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
  text: string | null;
  rating: number;
  creator: string;
  datePosted: string;
}

export interface UserAuthSingature {
  username: string;
}
