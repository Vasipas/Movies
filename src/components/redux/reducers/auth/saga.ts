/* eslint-disable  no-console */
/* eslint-disable consistent-return */

import { isAxiosError } from 'axios';
import {call, put, throttle} from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import { signInRequest, signInSuccess, signUpUserRequest } from "./reducer";
import { AuthAPI } from "../../../services/api/authApi";

import { ISessionErrorResponse, ISessionResponse } from './types';
import { TRegistrationData } from '../../../registration';
import { TLoginData } from '../../../login';

function* signUpWorker ({payload}: PayloadAction<TRegistrationData>) {
    try {
        const response: ISessionResponse = yield call(AuthAPI.signUpUser, payload)
        yield put(signInSuccess(response))
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

function* signInWorker ({payload}: PayloadAction<TLoginData>) {
    try {
        const response: ISessionResponse | ISessionErrorResponse = yield call(AuthAPI.signInUser, payload)
        if (response.status === 0) {
            return console.error('Wrong credentails')
        }
        yield put(signInSuccess(response as ISessionResponse))
    }
    catch(error) {
        if (isAxiosError(error)) {
        console.error(error)
        }
    }
}

export function* authSaga() {
    yield throttle(2000, signUpUserRequest.type, signUpWorker);
    yield throttle(2000, signInRequest.type, signInWorker);
}