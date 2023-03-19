import { IActor, ICreateMovieData, IFilmData, IUpdatePayload } from '../../redux/reducers/films/types';
import { Endpoints } from "../endpoints";
import { http } from "../http";
import { IParams } from './types';

export const filmsAPI = {
    uploadFile: (payload: FormData) => http.post(Endpoints.UPLOAD_FILE, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }}).then((response) => response.data),
    createMovie: (payload: ICreateMovieData) => http.post(Endpoints.MOVIE.CREATE, payload).then((response) => response.data),
    deleteMovie: (payload: string) => http.delete(Endpoints.MOVIE.DELETE(payload)).then((response) => response.data),
    updateMovie: ({id, ...payload}: IUpdatePayload) => http.patch(Endpoints.MOVIE.UPDATE(id), payload).then((response) => response.data),
    showMovie: (payload: string) => http.get(Endpoints.MOVIE.SHOW(payload)).then((response) => response.data),
    listOfMovies: (payload: IParams) => http.get(Endpoints.MOVIE.LIST, {params: payload}).then((response) => response.data),
}