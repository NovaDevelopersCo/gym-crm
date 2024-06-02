import {
	BuyAbonementDto,
	BuyAbonementResponse,
	CreateAbonementDto,
	GetItemsResponse,
	IAbonement,
	RootState
} from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/abonement`,
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

export const abonementApi = createApi({
	reducerPath: 'abonement/api',
	baseQuery: baseQuery,
	tagTypes: ['ABONEMENT'],
	endpoints: build => ({
		createAbonement: build.mutation<IAbonement, CreateAbonementDto>({
			query: abonementDto => ({
				method: 'POST',
				url: '',
				body: abonementDto
			}),
			invalidatesTags: ['ABONEMENT']
		}),
		getAbonements: build.query<GetItemsResponse<IAbonement>, void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['ABONEMENT']
		}),
		buyAbonement: build.mutation<BuyAbonementResponse, BuyAbonementDto>({
			query: abonementDto => ({
				method: 'POST',
				url: '/user',
				body: abonementDto
			}),
			invalidatesTags: ['ABONEMENT']
		})
	})
})

export const {
	useCreateAbonementMutation,
	useGetAbonementsQuery,
	useBuyAbonementMutation
} = abonementApi
