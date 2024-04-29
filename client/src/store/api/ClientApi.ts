import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
	ClientMutationResponse,
	CreateClientDto,
	DeleteClientDto,
	GetItemsParams,
	GetItemsResponse,
	IClient,
	RootState,
} from '..'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/user`,
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

export const clientApi = createApi({
	reducerPath: 'client/api',
	baseQuery: baseQuery,
	tagTypes: ['Client'],
	endpoints: build => ({
		createClient: build.mutation<ClientMutationResponse, CreateClientDto>({
			query: client => ({
				method: 'POST',
				url: '',
				body: client
			})
		}),
		deleteClient: build.mutation<ClientMutationResponse, DeleteClientDto>({
			query: client => ({
				method: 'DELETE',
				url: '',
				body: client
			})
		}),
		getAllClients: build.query<GetItemsResponse<IClient>, GetItemsParams>({
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
