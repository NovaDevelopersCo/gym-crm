import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import {
	CreateUserDto,
	LoginUserDto,
	TLoginResponse,
	TRegistrationResponse,
	authSlice
} from '@store/index'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/auth`,
	credentials: 'same-origin',
	// Automatically use token in authorization header if it provided
	prepareHeaders: headers => {
		const token = localStorage.getItem('token')
		if (token) {
			headers.set('authorization', `Bearer ${token}`)
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
	let result = await baseQuery(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery('/refresh', api, extraOptions)
		if (refreshResult.data) {
			// api.dispatch(
			// 	authSlice.actions.setToken(refreshResult.data.accessToken)
			// )
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(authSlice.actions.logout())
		}
	}
	return result
}

export const authApi = createApi({
	reducerPath: 'auth/api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Auth'],
	endpoints: build => ({
		createUser: build.query<TRegistrationResponse, CreateUserDto>({
			query: user => ({
				method: 'POST',
				url: `registration`,
				body: user
			})
		}),
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
	useCreateUserQuery,
	useLoginUserQuery,
	useLogoutUserQuery,
	useRefreshTokenQuery
} = authApi
