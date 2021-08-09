import { MovieSortMethods } from "./commonIterfaces";

export enum STAR_VALUES {
  FULL = "★",
  HALF = "⯪", // this icon does not has the same size as the others
  EMPTY = "☆",
}

/*
 * Reshaping array of generic typed object into matrix
 * with @cols columns.
 */
export const arrReshape = (arr: readonly any[], cols: number): Array<any[]> => {
  let arr_copy = [...arr];
  let res_arr = [];
  let col_arr = [];
  let curr_len = 0;

  while (arr_copy.length) {
    if (curr_len < cols) {
      col_arr.push(arr_copy.shift());
      curr_len++;
    } else {
      res_arr.push(col_arr);
      curr_len = 0;
      col_arr = [];
    }
  }
  if (col_arr.length) {
    res_arr.push(col_arr);
  }

  return res_arr;
};

export const calculateStarValue = (rating: number): number | undefined => {
  if (rating < 0 || rating > 5) {
    return undefined;
  }
  /* we return value closest to
   * the nearest star value (implementing
   * the half stars)
   */
  return Math.round(rating << 1) / 2;
};

export const convertRatingToStar = (
  rating: number,
  upperBound: number
): string => {
  if (!Number.isInteger(upperBound)) {
    // eslint-disable-next-line no-throw-literal
    throw `Cannot create rating with non integer value: ${upperBound}`;
  }
  // can implement half star if we find proper unicode character for it
  // let starString = !Number.isInteger(rating) ? STAR_VALUES.HALF : "";
  let starString = "";

  for (let i = Math.floor(rating); i > 0; i--) {
    starString = STAR_VALUES.FULL + starString;
  }
  for (let i = upperBound - Math.floor(rating); i > 0; i--) {
    starString = starString + STAR_VALUES.EMPTY;
  }

  return starString;
};

export const sortMethodStringToEnum = (method:string):MovieSortMethods => {
  const sortMethodException = "Movie sort method not found";
  switch (method){
    case "popularity":
      return MovieSortMethods.POPULARITY_ASC;
    case "popularity (lowest)":
      return MovieSortMethods.POPULARITY_DES;
    case "rating":
      return MovieSortMethods.BEST;
    case "rating (lowest)":
      return MovieSortMethods.WORST;
    case "date":
      return MovieSortMethods.NEWEST;
    case "date (oldest)":
      return MovieSortMethods.OLDEST;
    case "random":
      return MovieSortMethods.RANDOM;
    default:
      throw sortMethodException;
  }
};