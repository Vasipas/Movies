export interface IFilmsState {
    films: null | Array<IFilmData>;
    oneFilm: null | (IFilmData & {actors: Array<IActor>});
    meta: null | {total: number}
}

export interface IFilmsresponse {
    data: Array<IFilmData>
}

export interface IFilmData {
    "id": number,
    "title": string,
    "year": string,
    "format": EFilmFormat,
    "createdAt": string,
    "updatedAt": string
  }

  export enum EFilmFormat {
    'VHS'='VHS',
    'DVD'='DVD',
    'Blu-ray'='Blu-ray'
  }

export interface ICreateMovieData {
  "title": string,
  "year": number,
  "format": EFilmFormat,
  "actors": Array<string>
}

export interface IActor {
  id: number, 
  name: string, 
  createdAt: string, 
  updatedAt: string
}

export interface IUpdatePayload extends ICreateMovieData {
    id: string;
}

export interface IGetListOfMoviesResponse {
  data: Array<IFilmData>, 
  status: number, 
  meta: {total: number}}

export interface IMovieActionSuccessResponse extends IFilmData {
  actors: Array<IActor>
  status: number
}
