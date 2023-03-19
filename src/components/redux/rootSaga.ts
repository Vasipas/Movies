import { spawn } from "@redux-saga/core/effects";
import { authSaga } from "./reducers/auth/saga";
// eslint-disable-next-line import/no-cycle
import { filmsSaga } from "./reducers/films/saga";

export default function* rootSaga() {
	yield spawn(filmsSaga);
	yield spawn(authSaga);
}