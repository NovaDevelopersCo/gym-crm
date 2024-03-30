import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import { LoginUserDto, TLoginResponse, authSlice } from '@store/index'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/auth`,
	credentials: 'include',

	// Automatically use token in authorization header if it provided
	prepareHeaders: headers => {
		const token = authSlice.getInitialState().accessToken
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})

// Request interceptor
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {

	let result = await baseQuery(
		args
			? args
			: {
				url: 'refresh',
				credentials: 'include',
				headers: {
					Authorization: `Bearer ${authSlice.getInitialState().accessToken}`,
					'Content-Type': 'application/json'
				}
			},
		api,
		extraOptions
	)

	return result
}

export const authApi = createApi({
	reducerPath: 'auth/api',
	baseQuery: baseQueryWithReauth,
	// tagTypes: ['Auth'],
	endpoints: build => ({
		// createUser: build.query<TRegistrationResponse, CreateUserDto>({
		// 	query: user => ({
		// 		method: 'POST',
		// 		url: `registration`,
		// 		body: user
		// 	})
		// }),
		loginUser: build.query<TLoginResponse, LoginUserDto>({
			query: user => ({
				method: 'POST',
				url: 'login',
				body: user
			})
		}),
		logoutUser: build.query({
			query: () => ({
				url: 'logout'
			})
		}),
		refreshToken: build.query({
			query: () => ({
				url: 'refresh'
			})
		})
	})
})

export const {
	// useCreateUserQuery,
	useLoginUserQuery,
	useLogoutUserQuery,
	useRefreshTokenQuery
} = authApi
