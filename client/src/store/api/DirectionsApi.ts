import {
	CreateDirectionDto,
	DeleteDirectionDto,
	IDirection,
	RootState,
	TGetItemsResponse
} from '@/store'
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

export const directionsApi = createApi({
	reducerPath: 'directions/api',
	baseQuery: baseQuery,
	tagTypes: ['DIRECTION'],
	endpoints: build => ({
		getDirectionInfo: build.query<IDirection, IDirection['name']>({
			query: directionId => ({
				url: `direction/${directionId}`
			})
		}),
		getDirections: build.query<TGetItemsResponse<IDirection>, void>({
			query: () => ({
				url: 'direction'
			}),
			providesTags: ['DIRECTION']
		}),
		createDirection: build.mutation<IDirection, CreateDirectionDto>({
			query: directionDto => ({
				method: 'POST',
				url: 'direction',
				body: directionDto
			}),
			invalidatesTags: ['DIRECTION']
		}),
		deleteDirection: build.mutation<IDirection, DeleteDirectionDto>({
			query: directionId => ({
				method: 'DELETE',
				url: `direction/${directionId}`
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
