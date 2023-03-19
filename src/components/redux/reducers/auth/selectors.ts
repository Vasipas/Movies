/* eslint-disable import/no-cycle */

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const getAuthState = (state: RootState) => state.auth;

export const getAuthStatus = createSelector([getAuthState], (auth) => auth.status);

export const getAuthToken = createSelector([getAuthState], (auth) => localStorage.getItem('token') || auth.token);