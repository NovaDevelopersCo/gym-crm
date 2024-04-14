import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
	CreateAreaDto,
	CreateGroupDto,
	CreateLocationDto,
	IArea,
	IGroup,
	ILocation,
	authSlice
} from '@store/index'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/`,
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

export const paramsApi = createApi({
	reducerPath: 'params/api',
	baseQuery: baseQuery,
	tagTypes: ['GROUP', 'AREA', 'LOCATION'],
	endpoints: build => ({
		// Groups
		getGroupInfo: build.query<IGroup['id'], IGroup>({
			query: groupId => ({
				url: `groups/${groupId}`
			})
		}),
		getGroups: build.query<unknown, IGroup[]>({
			query: () => ({
				url: 'groups'
			}),
			providesTags: ['GROUP']
		}),
		createGroup: build.mutation<CreateGroupDto, IGroup>({
			query: group => ({
				method: 'POST',
				url: 'groups',
				body: group
			}),
			invalidatesTags: ['GROUP']
		}),

		// Areas
		getAreaInfo: build.query<IArea['name'], IArea>({
			query: areaId => ({
				url: `area/${areaId}`
			})
		}),
		getAreas: build.query<unknown, IArea[]>({
			query: () => ({
				url: 'areas'
			}),
			providesTags: ['AREA']
		}),
		createArea: build.mutation<CreateAreaDto, IArea>({
			query: area => ({
				method: 'POST',
				url: 'area',
				body: area
			}),
			invalidatesTags: ['AREA']
		}),

		// Locations
		getLocationInfo: build.query<ILocation['id'], ILocation>({
			query: locationId => ({
				url: `location/${locationId}`
			})
		}),
		getLocations: build.query<unknown, ILocation[]>({
			query: () => ({
				url: 'locations'
			}),
			providesTags: ['LOCATION']
		}),
		createLocation: build.mutation<CreateLocationDto, ILocation>({
			query: location => ({
				method: 'POST',
				url: 'locations',
				body: location
			}),
			invalidatesTags: ['LOCATION']
		})
	})
})

export const {
	useCreateGroupMutation,
	useCreateAreaMutation,
	useCreateLocationMutation,
	useGetAreaInfoQuery,
	useGetGroupInfoQuery,
	useGetLocationInfoQuery,
	useGetAreasQuery,
	useGetGroupsQuery,
	useGetLocationsQuery
} = paramsApi
