import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
	CreateClubDto,
	CreateDirectionDto,
	CreateGroupDto,
	IClub,
	IDirection,
	IGroup,
	RootState,
	TParamsResponse
} from '@store/index'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
	credentials: 'include',

	// Automatically use token in authorization header if it provided
	prepareHeaders: (headers, { getState }) => {
		const state = getState() as RootState
		const token = state['auth/slice'].accessToken
		if (token) {
			console.log(token)
			headers.set('Authorization', `Bearer ${token}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})

export const paramsApi = createApi({
	reducerPath: 'params/api',
	baseQuery: baseQuery,
	tagTypes: ['GROUP', 'CLUB', 'DIRECTION'],
	endpoints: build => ({
		// Groups
		getGroupInfo: build.query<IGroup, IGroup['id']>({
			query: groupId => ({
				url: `group/${groupId}`
			})
		}),
		getGroups: build.query<TParamsResponse<IGroup>, void>({
			query: () => ({
				url: 'group'
			}),
			providesTags: ['GROUP']
		}),
		createGroup: build.mutation<IGroup, CreateGroupDto>({
			query: group => ({
				method: 'POST',
				url: 'group',
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
		getDirections: build.query<TParamsResponse<IDirection>, void>({
			query: () => ({
				url: 'direction'
			}),
			providesTags: ['DIRECTION']
		}),
		createDirection: build.mutation<IDirection, CreateDirectionDto>({
			query: direction => ({
				method: 'POST',
				url: 'direction',
				body: direction
			}),
			invalidatesTags: ['DIRECTION']
		}),

		// Clubs
		getClubInfo: build.query<IClub, IClub['id']>({
			query: clubId => ({
				url: `club/${clubId}`
			})
		}),
		getClubs: build.query<TParamsResponse<IClub>, void>({
			query: () => ({
				url: 'club'
			}),
			providesTags: ['CLUB']
		}),
		createClub: build.mutation<IClub, CreateClubDto>({
			query: club => ({
				method: 'POST',
				url: 'club',
				body: club
			}),
			invalidatesTags: ['CLUB']
		})
	})
})

export const {
	useCreateGroupMutation,
	useCreateDirectionMutation,
	useCreateClubMutation,
	useGetDirectionInfoQuery,
	useGetGroupInfoQuery,
	useGetClubInfoQuery,
	useGetDirectionsQuery,
	useGetGroupsQuery,
	useGetClubsQuery
} = paramsApi
