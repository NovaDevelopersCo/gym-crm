import {
	CreateStaffDto,
	CreateStaffResponse,
	EditStaffDto,
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
	tagTypes: ['STAFF'],
	endpoints: build => ({
		getStaff: build.query<GetItemsResponse<IStaff>, void>({
			query: () => ({
				method: 'GET',
				url: ''
			}),
			providesTags: ['STAFF']
		}),
		createStaff: build.mutation<CreateStaffResponse, CreateStaffDto>({
			query: user => ({
				method: 'POST',
				url: '',
				body: user
			}),
			invalidatesTags: ['STAFF']
		}),
		deleteStaff: build.mutation<void, IStaff['id']>({
			query: id => ({
				method: 'DELETE',
				url: `${id}`
			}),
			invalidatesTags: ['STAFF']
		}),
		editStaff: build.mutation<IStaff, EditStaffDto>({
			query: dto => ({
				method: 'PUT',
				url: `${dto.id}`,
				body: dto
			}),
			invalidatesTags: ['STAFF']
		})
	})
})

export const {
	useGetStaffQuery,
	useCreateStaffMutation,
	useDeleteStaffMutation,
	useEditStaffMutation
} = staffApi
