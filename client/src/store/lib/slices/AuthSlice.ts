import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { authApi, IUser } from '@store/index'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
	isAuth: boolean
}

const initialState: IAuthState = {
	user: null,
	accessToken: null,
	isAuth: false
}

const authSlice = createSlice({
	name: 'auth/slice',
	initialState,
	reducers: {
		logout: () => initialState,
		setToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
			localStorage.setItem('token', action.payload)
		}
	},
	extraReducers(builder) {
		builder.addMatcher(
			authApi.endpoints.loginUser.matchFulfilled,
			(state, { payload }) => {
				state.accessToken = payload.accessToken
				state.user = payload.user
				state.isAuth = true
			}
		)
	}
})

export default authSlice
