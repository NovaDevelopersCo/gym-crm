import {
	CreateStaffDto,
	CreateStaffResponse,
	GetItemsResponse,
	IStaff,
	RootState
} from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/staff`,
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
		getStaff: build.query<GetItemsResponse<IStaff>, void>({
			query: () => ({
				method: 'GET',
				url: ''
			})
		}),
		createStaff: build.mutation<CreateStaffResponse, CreateStaffDto>({
			query: user => ({
				method: 'POST',
				url: '',
				body: user
			})
		})
	})
})

export const { useGetStaffQuery } = staffApi
