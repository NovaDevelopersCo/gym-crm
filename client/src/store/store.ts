import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { authApi, authSlice, paramsApi } from '.'

const rootReducer = combineSlices(authSlice, authApi, paramsApi)

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat([authApi.middleware, paramsApi.middleware])
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
