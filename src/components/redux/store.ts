import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import createRootReducer from "./reducers/rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(sagaMiddleware),
    preloadedState: {},
})

sagaMiddleware.run(rootSaga);

export {store};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;