/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLoginData } from "../../../login";
import { TRegistrationData } from "../../../registration";

import { IAuthState, ISessionResponse } from "./types";

const initialState: IAuthState = {
  token: null,
  status: null,
}


const auth = createSlice({
	name: '@@auth',
	initialState,
	reducers: {
    signUpUserRequest: (state, action: PayloadAction<TRegistrationData>) => {},
    signInRequest: (state, action: PayloadAction<TLoginData>) => {},
    signInSuccess: (state, {payload}: PayloadAction<ISessionResponse>) => {
      const signState = state;
      signState.status = payload.status;
      signState.token = payload.token;
      localStorage.setItem('token', payload.token);
    }
  }
  })


 export default auth.reducer;
 export const { signUpUserRequest, signInRequest, signInSuccess } = auth.actions;