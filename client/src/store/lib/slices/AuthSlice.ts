import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '../model'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
}

const initialState: IAuthState = {
	user: null,
	accessToken: null
}

const authSlice = createSlice({
	name: 'auth/slice',
	initialState,
	reducers: {
		logout: () => initialState,
		setToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
		}
	}
})

export default authSlice
