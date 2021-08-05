// this file is interface beetween backend and components on the frontend
// it should be ONLY interface with api

import { MovieComment, MovieListElement } from "./backendInterfaces";

export const getAuthToken = async (username:string, password:string):Promise<string> => {
    return "dsadas";
}

export const getMovies = async (limit?:number):Promise<MovieListElement[]> => {
}

export const getMovie = async (id:number):MovieListElement => {
}


export const getComments = async (user?:string, user_id?:number, title:number, movie_id:number, sort_method:MovieSortMethods):Promise<MovieComment[]>=>{
}

export const getComment = async (id:number):MovieComment => {
}

export const registerUser = async (username:string, password:string, email:string):Promise<MovieComment> => {

}

export const getMovieGenres = async (username:string, password:string, email:string):Promise<MovieComment> => {

}


export const getMovieActors = async (username:string, password:string, email:string):Promise<MovieComment> => {

}

// this should use ajax or something similar. 
// will search thoughout directors, actors and movies
export const findQuery = async (username:string, password:string, email:string):Promise<MovieComment> => {

}
