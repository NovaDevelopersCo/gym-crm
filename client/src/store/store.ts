import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { authApi, authSlice, clientApi, clientSlice } from '.'

const rootReducer = combineSlices(authSlice, authApi, clientApi, clientSlice)

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat([
				authApi.middleware,
				clientApi.middleware
			])
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
