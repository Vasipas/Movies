import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";


const getFilmsState = (state: RootState) => state.films;

export const getFilms = createSelector([getFilmsState], (films) => films.films);

export const getOneFilm = createSelector([getFilmsState], (films) => films.oneFilm);

export const getMeta = createSelector([getFilmsState], (films) => films.meta);