import { combineSlices, configureStore } from '@reduxjs/toolkit'

import {
	authApi,
	authSlice,
	clientApi,
	clientSlice,
	clubsApi,
	directionsApi,
	groupsApi,
	serviceApi,
	staffApi
} from '.'

const rootReducer = combineSlices(
	authSlice,
	authApi,
	clientApi,
	clientSlice,
	clubsApi,
	directionsApi,
	groupsApi,
	serviceApi,
	staffApi
)

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat([
				authApi.middleware,
				clubsApi.middleware,
				directionsApi.middleware,
				groupsApi.middleware,
				serviceApi.middleware,
				staffApi.middleware,
				clientApi.middleware
			])
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
