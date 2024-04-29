import {
	LoginErrorResponse,
	LoginStaffDto,
	RefreshResponse,
	RootState,
	authSlice
} from '@/store'
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/auth`,
	credentials: 'include',

	// Automatically use token in authorization header if it provided
	prepareHeaders: (headers, { getState }) => {
		const state = getState() as RootState
		const token = state['auth/slice'].accessToken
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
	FetchBaseQueryError | LoginErrorResponse
> = async (args, api, extraOptions) => {
	const result = await baseQuery(
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
	endpoints: build => ({
		loginUser: build.query<void, LoginStaffDto>({
			query: user => ({
				method: 'POST',
				url: 'login',
				body: user
			})
		}),
		logoutUser: build.query<void, void>({
			query: () => ({
				url: 'logout'
			})
		}),
		refreshToken: build.query<RefreshResponse, void>({
			query: () => ({
				url: 'refresh'
			})
		})
	})
})

export const { useLoginUserQuery, useLogoutUserQuery, useRefreshTokenQuery } =
	authApi
