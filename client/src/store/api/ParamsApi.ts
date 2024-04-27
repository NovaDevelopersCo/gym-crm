import {
	CreateClubDto,
	CreateDirectionDto,
	CreateGroupDto,
	IClub,
	IDirection,
	IGroup,
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

export const paramsApi = createApi({
	reducerPath: 'params/api',
	baseQuery: baseQuery,
	tagTypes: ['GROUP', 'DIRECTION', 'CLUB'],
	endpoints: build => ({
		// Groups
		getGroupInfo: build.query<IGroup, IGroup['id']>({
			query: groupId => ({
				url: `groups/${groupId}`
			})
		}),
		getGroups: build.query<IGroup[], void>({
			query: () => ({
				url: 'groups'
			}),
			providesTags: ['GROUP']
		}),
		createGroup: build.mutation<IGroup, CreateGroupDto>({
			query: group => ({
				method: 'POST',
				url: 'groups',
				body: group
			}),
			invalidatesTags: ['GROUP']
		}),

		// Directions
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

		// Clubs
		getClubInfo: build.query<IClub, IClub['id']>({
			query: clubId => ({
				url: `club/${clubId}`
			})
		}),
		getClubs: build.query<TGetItemsResponse<IClub>, void>({
			query: () => ({
				url: 'club'
			}),
			providesTags: ['CLUB']
		}),
		createClub: build.mutation<IClub, CreateClubDto>({
			query: clubDto => ({
				method: 'POST',
				url: 'club',
				body: clubDto
			}),
			invalidatesTags: ['CLUB']
		})
	})
})

export const {
	useCreateGroupMutation,
	useCreateDirectionMutation,
	useCreateClubMutation,
	useGetGroupInfoQuery,
	useGetDirectionInfoQuery,
	useGetClubInfoQuery,
	useGetGroupsQuery,
	useGetDirectionsQuery,
	useGetClubsQuery
} = paramsApi
