/* eslint-disable  no-console */

import { isAxiosError } from 'axios';
import {call, debounce, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router';
import { 
    createMovieRequest, 
    createMovieSuccess, 
    deleteMovieRequest, 
    deleteMovieSuccess, 
    getListOfMoviesRequest, 
    getListOfMoviesSuccess, 
    getListOfMoviesWithDebounceRequest, 
    showMovieRequest, 
    showMovieSuccess, 
    updateMovieRequest, 
    updateMovieSuccess, 
    uploadFileRequest, 
    uploadFileSuccess } from "./reducer";
import { filmsAPI } from "../../../services/api/filmsApi";
import { IActor, ICreateMovieData, IFilmData, IFilmsresponse, IUpdatePayload } from './types';
import { IParams } from '../../../services/api/types';

function* importFileRequestWorker ({payload}: PayloadAction<FormData>) {
    try {
        const response: IFilmsresponse = yield call(filmsAPI.uploadFile, payload)
        yield put(uploadFileSuccess(response.data))
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

function* showMovieWorker ({payload}: PayloadAction<string>) {
    try {
        const response: ({data: IFilmData & {actors: Array<IActor>}}) = yield call(filmsAPI.showMovie, payload)
        yield put(showMovieSuccess(response.data))
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

function* addMovieWorker ({payload}: PayloadAction<{data: ICreateMovieData, navigate: NavigateFunction}>) {
    try {
        const response: {data: (IFilmData & {actors: Array<IActor>}) & {status: number}} = yield call(filmsAPI.createMovie, payload.data)
        yield put(createMovieSuccess(response.data))
        yield payload.navigate(`/movie/${response.data.id}`)
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

function* moviesListWorker ({payload}: PayloadAction<IParams>) {
    try {
        const response: {data: Array<IFilmData>, status: number, meta: {total: number}} = yield call(filmsAPI.listOfMovies, payload)
        yield put(getListOfMoviesSuccess(response))
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

function* updateMovieWorker ({payload}: PayloadAction<{data: IUpdatePayload, navigate: NavigateFunction}>) {
    try {
        const response: {data: (IFilmData & {actors: Array<IActor>}) & {status: number}} = yield call(filmsAPI.updateMovie, payload.data)
        yield put(updateMovieSuccess(response.data))
        yield payload.navigate?.(`/movie/${response.data.id}`);
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

function* deleteMovieWorker ({payload}: PayloadAction<string>) {
    try {
        const response: {data: Array<IFilmData> & {status: number}} = yield call(filmsAPI.deleteMovie, payload)
        yield put(deleteMovieSuccess(response.data))
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}


export function* filmsSaga() {
	yield takeEvery(uploadFileRequest.type, importFileRequestWorker);
    yield takeEvery(showMovieRequest.type, showMovieWorker);
    yield takeEvery(createMovieRequest.type, addMovieWorker);
    yield takeEvery(getListOfMoviesRequest.type, moviesListWorker);
    yield takeEvery(updateMovieRequest.type, updateMovieWorker);
    yield takeEvery(deleteMovieRequest.type, deleteMovieWorker);
    yield debounce(600, getListOfMoviesWithDebounceRequest.type, moviesListWorker);
}