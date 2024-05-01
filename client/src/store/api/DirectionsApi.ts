import {
	CreateDirectionDto,
	DeleteDirectionDto,
	GetItemsResponse,
	IDirection,
	RootState
} from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/direction`,
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

export const directionsApi = createApi({
	reducerPath: 'directions/api',
	baseQuery: baseQuery,
	tagTypes: ['DIRECTION'],
	endpoints: build => ({
		getDirectionInfo: build.query<IDirection, IDirection['name']>({
			query: directionId => ({
				url: `${directionId}`
			})
		}),
		getDirections: build.query<GetItemsResponse<IDirection>, void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['DIRECTION']
		}),
		createDirection: build.mutation<IDirection, CreateDirectionDto>({
			query: directionDto => ({
				method: 'POST',
				url: '',
				body: directionDto
			}),
			invalidatesTags: ['DIRECTION']
		}),
		deleteDirection: build.mutation<IDirection, DeleteDirectionDto>({
			query: directionId => ({
				method: 'DELETE',
				url: `${directionId}`
			}),
			invalidatesTags: ['DIRECTION']
		})
	})
})

export const {
	useGetDirectionInfoQuery,
	useGetDirectionsQuery,
	useCreateDirectionMutation,
	useDeleteDirectionMutation
} = directionsApi
