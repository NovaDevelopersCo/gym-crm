import { createSlice } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { IUser, authApi } from '@store/index'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
	isAuth: boolean
	error: string | null | FetchBaseQueryError
}

const initialState: IAuthState = {
	user: null,
	accessToken: null,
	isAuth: false,
	error: null
}

const authSlice = createSlice({
	name: 'auth/slice',
	initialState,
	reducers: {
		logout: () => initialState
	},
	extraReducers(builder) {
		builder
			.addMatcher(
				authApi.endpoints.refreshToken.matchFulfilled,
				(state, { payload }) => {
					state.accessToken = payload.accessToken
					state.user = payload.profile
					state.isAuth = true
				}
			)
			.addMatcher(
				authApi.endpoints.logoutUser.matchFulfilled,
				() => initialState
			)
	}
})

export default authSlice
