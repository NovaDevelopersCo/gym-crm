import { PayloadAction, createSlice } from '@reduxjs/toolkit'
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
		logout: () => initialState,
		setToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
			localStorage.setItem('token', action.payload)
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		},
		checkAuth: () => {

		}
	},
	extraReducers(builder) {
		builder
			.addMatcher(
				authApi.endpoints.loginUser.matchFulfilled,
				(state, { payload }) => {
					state.accessToken = payload.accessToken
					localStorage.setItem('token', payload.accessToken as string)
					state.isAuth = true
				}
			)
			.addMatcher(
				authApi.endpoints.loginUser.matchRejected,
				(state, { payload }) => {
					if (payload?.status == 401) {
						authApi.endpoints.refreshToken.initiate()
					}
				}
			)
			.addMatcher(authApi.endpoints.logoutUser.matchFulfilled, state => {
				localStorage.removeItem('token')
				state.isAuth = false
				state.user = null
			})
			.addMatcher(authApi.endpoints.refreshToken.matchRejected, (state, action) => {
				state.isAuth = false
				state.error = action.payload?.data?.message as string
			})
			.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, payload) => {
				state.accessToken = payload.accessToken
				localStorage.setItem('token', payload.accessToken as string)
				state.user = payload.user
				state.isAuth = true
			})
	}
})

export default authSlice
