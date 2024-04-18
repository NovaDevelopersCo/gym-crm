import { IStuff, authApi } from '@/store'
import { createSlice } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface IAuthState {
	user: IStuff | null
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
			.addMatcher(authApi.endpoints.loginUser.matchFulfilled, () => {
				window.location.reload()
			})
			.addMatcher(
				authApi.endpoints.loginUser.matchRejected,
				(state, { payload }) => {
					// @ts-expect-error
					state.error = (payload?.data?.message as string) || null
				}
			)
			.addMatcher(
				authApi.endpoints.logoutUser.matchFulfilled,
				() => initialState
			)
	},
	selectors: {
		getAccessToken: state => state.accessToken
	}
})

export default authSlice
