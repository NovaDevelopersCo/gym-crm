import { IStaff, RootState, TGetItemsResponse } from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/`,
	credentials: 'include',

	// Automatically use token in authorization header if it provided
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState)['auth/slice'].accessToken
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})
export const staffApi = createApi({
	reducerPath: 'staff/api',
	baseQuery,
	endpoints: build => ({
		getStaff: build.query<TGetItemsResponse<IStaff>, void>({
			query: () => ({
				method: 'GET',
				url: `staff`
			})
		})
	})
})

export const { useGetStaffQuery } = staffApi
