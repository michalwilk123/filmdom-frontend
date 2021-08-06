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
}

export const getMovies = async (
  params?: GetMovieParams
): Promise<AxiosResponse> => {
  let data: GetMovieParams = {};

  params && params.limit && (data.limit = params.limit);
  if (params && params.sortMethod) {
    switch (params.sortMethod) {
      case MovieSortMethods.POPULARITY_ASC:
        data.sortMethod = "most_popular";
        break;
      case MovieSortMethods.POPULARITY_DES:
        data.sortMethod = "least_popular";
        break;
      case MovieSortMethods.BEST:
        data.sortMethod = "best";
        break;
      case MovieSortMethods.WORST:
        data.sortMethod = "worst";
        break;
      case MovieSortMethods.NEWEST:
        data.sortMethod = "newest";
        break;
      case MovieSortMethods.OLDEST:
        data.sortMethod = "oldest";
        break;
      case MovieSortMethods.RANDOM:
        data.sortMethod = "random";
        break;
    }
  }

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

export const getMovieGenres = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}genres/`);
};

export const getMovieActors = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}actors/`);
};

export const getMovieDirectors = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}actors/`);
};

// very important endpoint
// this should use ajax or something similar.
// will search thoughout directors, actors and movies
export const findQuery = async (): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_DOMAIN}search-phrase/`);
};
