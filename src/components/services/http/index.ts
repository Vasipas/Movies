/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any
 */
import axios, { AxiosInstance } from 'axios'
import { store } from '../../redux/store'

declare const window: any

const API_URL = window._env_.API_URL

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || store.getState().auth.token
  if (token) {
    config.headers.Authorization = token
  }

  return config
})

export { http }
