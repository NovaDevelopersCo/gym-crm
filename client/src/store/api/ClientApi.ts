import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
	CreateClientDto,
	DeleteClientDto,
	GetClientsDto,
	TClientMutationResponse,
	TGetClientsResponse,
	authSlice
} from '..'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/`,
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

export const clientApi = createApi({
	reducerPath: 'client/api',
	baseQuery: baseQuery,
	tagTypes: ['Client'],
	endpoints: build => ({
		createClient: build.mutation<TClientMutationResponse, CreateClientDto>({
			query: client => ({
				method: 'POST',
				url: '',
				body: client
			})
		}),
		deleteClient: build.mutation<TClientMutationResponse, DeleteClientDto>({
			query: client => ({
				method: 'DELETE',
				url: '',
				body: client
			})
		}),
		getAllClients: build.query<TGetClientsResponse, GetClientsDto>({
			query: ({ page, limit }) => ({
				url: '',
				params: {
					page: page,
					limit: limit
				}
			})
		})
	})
})

export const {
	useCreateClientMutation,
	useDeleteClientMutation,
	useGetAllClientsQuery
} = clientApi
