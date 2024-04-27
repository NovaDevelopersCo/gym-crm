import { CreateGroupDto, DeleteGroupDto, IGroup, RootState } from '@/store'
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

export const groupsApi = createApi({
	reducerPath: 'groups/api',
	baseQuery: baseQuery,
	tagTypes: ['GROUP'],
	endpoints: build => ({
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
		deleteGroup: build.mutation<IGroup, DeleteGroupDto>({
			query: groupId => ({
				method: 'DELETE',
				url: `groups/${groupId}`
			}),
			invalidatesTags: ['GROUP']
		})
	})
})

export const {
	useCreateGroupMutation,
	useGetGroupInfoQuery,
	useGetGroupsQuery,
	useDeleteGroupMutation
} = groupsApi
