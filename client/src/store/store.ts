import { combineSlices, configureStore } from '@reduxjs/toolkit'

import {
	abonementsApi,
	authApi,
	authSlice,
	clientApi,
	clientSlice,
	clubsApi,
	directionsApi,
	groupsApi,
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
	staffApi,
	abonementsApi
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
				staffApi.middleware,
				clientApi.middleware,
				abonementsApi.middleware
			])
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
