import axios, { AxiosResponse } from "axios";
import { CommentSortMethods, MovieSortMethods } from "./commonIterfaces";

// this file is interface beetween backend and components on the frontend
// it should be ONLY interface with api

export const getAuthToken = async (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_DOMAIN}api-token-auth/`, {
    username: username,
    password: password,
  });
};

export const registerUser = async (
  username: string,
  password: string,
  email: string
): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_DOMAIN}users/`, {
    username: username,
    email: email,
    password: password,
  });
};

interface GetMovieParams {
  sortMethod?: MovieSortMethods | string;
  limit?: number;
  searchPhrase?: string;
  page?: number;
}

export const getMovies = async (
  params?: GetMovieParams
): Promise<AxiosResponse> => {
  let data: {
    sort_method?: string;
    limit?: number;
    title_like?: string;
    page?: number;
  } = {};

  params && params.page && (data.page = params.page);
  params && params.limit && (data.limit = params.limit);
  if (params && params.sortMethod) {
    switch (params.sortMethod) {
      case MovieSortMethods.POPULARITY_ASC:
        data.sort_method = "most_popular";
        break;
      case MovieSortMethods.POPULARITY_DES:
        data.sort_method = "least_popular";
        break;
      case MovieSortMethods.BEST:
        data.sort_method = "best";
        break;
      case MovieSortMethods.WORST:
        data.sort_method = "worst";
        break;
      case MovieSortMethods.NEWEST:
        data.sort_method = "newest";
        break;
      case MovieSortMethods.OLDEST:
        data.sort_method = "oldest";
        break;
      case MovieSortMethods.RANDOM:
        data.sort_method = "random";
        break;
    }
  }
  params && params.searchPhrase && (data.title_like = params.searchPhrase);

  return axios.get(`${process.env.REACT_APP_DOMAIN}movies/`, { params: data });
};

export const getMovie = async (id: number): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}movies/${id}`);
};

interface GetCommentParams {
  limit?: number;
  user?: string;
  user_id?: number;
  sort_method?: CommentSortMethods | string;
  movie_id?: number;
  title?: string;
  title_like?: string;
}

export const getComments = async (
  params?: GetCommentParams
): Promise<AxiosResponse> => {
  let data: GetCommentParams = {};
  if (params) {
    params.limit && (data.limit = params.limit);
    params.user && (data.user = params.user);
    params.user_id && (data.user_id = params.user_id);

    if (params.sort_method) {
      switch (params.sort_method) {
        case CommentSortMethods.NEWEST:
          data.sort_method = "newest";
          break;
        case CommentSortMethods.OLDEST:
          data.sort_method = "oldest";
          break;
      }
    }

    params.movie_id && (data.movie_id = params.movie_id);
    params.title && (data.title = params.title);
    params.title_like && (data.title_like = params.title_like);
  }
  return axios.get(`${process.env.REACT_APP_DOMAIN}comments/`, {
    params: data,
  });
};

export const getComment = async (id: number): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}comments/${id}`);
};

interface SendCommentArgs {
  movieId: number;
  userId: number;
  rating: number;
  authToken: string;
  text?: string;
}

export const sendComment = async (
  args: SendCommentArgs
): Promise<AxiosResponse> => {
  let data: any = {
    commented_movie: args.movieId,
    rating: args.rating,
    creator: args.userId,
  };
  args.text && (data.text = args.text);

  return axios.post(`${process.env.REACT_APP_DOMAIN}comments/`, data, {
    headers: {
      Authorization: `Token ${args.authToken}`,
    },
  });
};

export const getMovieGenres = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}genres/`);
};

export const getMovieActors = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}actors/`);
};

export const getMovieDirectors = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}directors/`);
};

// very important endpoint
// this should use ajax or something similar.
// will search thoughout directors, actors and movies
export const findQuery = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}search-phrase/`);
};

// ADMIN ONLY OPERATIONS
export const createMovieGenres = async (name:string, adminToken:string): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_DOMAIN}genres/`, {name:name});
};

export const createMovieActors = async (name:string, adminToken:string): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_DOMAIN}actors/`, {name:name});
};

export const createMovieDirectors = async (name:string, adminToken:string): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_DOMAIN}directors/`, {name:name});
};


interface CreateMovieParams {
  title: string;
  thumbnail?: string;
  remote_thumbnail?: string;
  description?: string;
  director?: string;
  produceDate: string; 
  genres: number[];
  actors: number[];
}

export const createMovie = async (movie:CreateMovieParams, adminToken:string): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_DOMAIN}movies/`, {});
};
