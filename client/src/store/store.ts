import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { authSlice, authApi } from '.'

const rootReducer = combineSlices(authSlice, authApi)

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
			authApi.middleware
		])
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
