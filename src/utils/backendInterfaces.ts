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

export interface MovieComment {
  creatorId: number;
  movieId: number;
  username: string;
  rating: number;
  text: string | null;
  publishDate: string;
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
