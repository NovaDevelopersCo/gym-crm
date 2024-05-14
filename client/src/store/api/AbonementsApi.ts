import { GetItemsResponse, IAbonement, RootState } from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/abonement`,
	credentials: 'include',

	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState)['auth/slice'].accessToken
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})

export const abonementsApi = createApi({
	reducerPath: 'abonements/api',
	baseQuery: baseQuery,
	tagTypes: ['SUBSCRIPTION'],
	endpoints: build => ({
		getAbonements: build.query<GetItemsResponse<IAbonement>, void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['SUBSCRIPTION']
		})
	})
})

export const { useGetAbonementsQuery } = abonementsApi
