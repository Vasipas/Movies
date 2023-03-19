/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router";
import { IActor, ICreateMovieData, IFilmData, IFilmsresponse, IFilmsState, IGetListOfMoviesResponse, IMovieActionSuccessResponse, IUpdatePayload } from "./types";
import { IParams } from '../../../services/api/types';

const initialState: IFilmsState = {
  films: null,
  oneFilm: null,
  meta: null
}


const films = createSlice({
	name: '@@films',
	initialState,
	reducers: {
		uploadFileRequest: (state, action: PayloadAction<FormData>) => {},
    uploadFileSuccess: (state, {payload}: PayloadAction<IFilmsresponse['data']>) => {
      const filmsState = state;
      filmsState.films = payload;
    },
    createMovieRequest: (state, action: PayloadAction<{data:ICreateMovieData, navigate: NavigateFunction}>) => {},
    createMovieSuccess: (state, {payload}: PayloadAction<IMovieActionSuccessResponse>) => {},
    
    deleteMovieRequest: (state, action: PayloadAction<string>) => {},
    deleteMovieSuccess: (state, {payload}: PayloadAction<{status: number}>) => {},

    updateMovieRequest: (state, action: PayloadAction<{data: IUpdatePayload, navigate: NavigateFunction}>) => {},
    updateMovieSuccess: (state, {payload}: PayloadAction<IMovieActionSuccessResponse>) => {
      const updateMoviesState = state;
      updateMoviesState.oneFilm = payload;
    },

    showMovieRequest: (state, action: PayloadAction<string>) => {},
    showMovieSuccess: (state, {payload}: PayloadAction<(IFilmData & {actors: Array<IActor>})>) => {
      const oneFilmState = state;
      oneFilmState.oneFilm = payload;
    },
    getListOfMoviesRequest: (state, action: PayloadAction<IParams>) => {},
    getListOfMoviesSuccess: (state, {payload}: PayloadAction<IGetListOfMoviesResponse>) => {
      const listState = state;
      listState.films = payload.data;
      listState.meta = payload.meta;
    },
    getListOfMoviesWithDebounceRequest: (state, action: PayloadAction<IParams>) => {},
  }
  })


 export default films.reducer;
 export const { 
  uploadFileRequest, 
  uploadFileSuccess,
  createMovieRequest,
  createMovieSuccess,
  deleteMovieRequest,
  deleteMovieSuccess,
  updateMovieRequest,
  updateMovieSuccess,
  showMovieRequest,
  showMovieSuccess,
  getListOfMoviesRequest,
  getListOfMoviesSuccess,
  getListOfMoviesWithDebounceRequest
} = films.actions;