import {
	CreateClubDto,
	DeleteClubDto,
	EditClubDto,
	GetItemsResponse,
	IClub,
	RootState
} from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/club`,
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

export const clubsApi = createApi({
	reducerPath: 'clubs/api',
	baseQuery: baseQuery,
	tagTypes: ['CLUB'],
	endpoints: build => ({
		getClubInfo: build.query<IClub, IClub['id']>({
			query: clubId => ({
				url: `${clubId}`
			})
		}),
		getClubs: build.query<GetItemsResponse<IClub>, void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['CLUB']
		}),
		createClub: build.mutation<IClub, CreateClubDto>({
			query: clubDto => ({
				method: 'POST',
				url: '',
				body: clubDto
			}),
			invalidatesTags: ['CLUB']
		}),
		deleteClub: build.mutation<IClub, DeleteClubDto>({
			query: clubId => ({
				method: 'DELETE',
				url: `${clubId}`
			}),
			invalidatesTags: ['CLUB']
		}),
		editClub: build.mutation<IClub, EditClubDto & { id: string }>({
			query: dto => ({
				method: 'PUT',
				url: `${dto.id}`,
				body: dto
			}),
			invalidatesTags: ['CLUB']
		})
	})
})

export const {
	useGetClubInfoQuery,
	useGetClubsQuery,
	useCreateClubMutation,
	useDeleteClubMutation,
	useEditClubMutation
} = clubsApi
