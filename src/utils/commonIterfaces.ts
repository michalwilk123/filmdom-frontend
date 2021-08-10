export enum MovieSortMethods {
  POPULARITY_DES = "popularity",
  POPULARITY_ASC = "popularity (lowest)",
  BEST = "rating",
  WORST = "rating (lowest)",
  NEWEST = "date",
  OLDEST = "date (oldest)",
  RANDOM = "random",
}

export enum CommentSortMethods {
  NEWEST = "date",
  OLDEST = "date (oldest)",
}

export interface ResponseListElement {
  id: number;
  name: string;
}
