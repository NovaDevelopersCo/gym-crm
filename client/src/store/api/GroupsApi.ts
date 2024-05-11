import {
	CreateGroupDto,
	DeleteGroupDto,
	EditGroupDto,
	GetItemsResponse,
	IGroup,
	RootState
} from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/group`,
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
				url: `${groupId}`
			})
		}),
		getGroups: build.query<GetItemsResponse<IGroup>, void>({
			query: () => ({
				url: ''
			}),
			providesTags: ['GROUP']
		}),
		createGroup: build.mutation<IGroup, CreateGroupDto>({
			query: group => ({
				method: 'POST',
				url: '',
				body: group
			}),
			invalidatesTags: ['GROUP']
		}),
		deleteGroup: build.mutation<IGroup, DeleteGroupDto>({
			query: groupId => ({
				method: 'DELETE',
				url: `${groupId}`
			}),
			invalidatesTags: ['GROUP']
		}),
		editGroup: build.mutation<IGroup, EditGroupDto>({
			query: dto => {
				const { id, ...dtoBody } = dto
				return {
					method: 'PUT',
					url: `${id}`,
					body: dtoBody
				}
			},
			invalidatesTags: ['GROUP']
		})
	})
})

export const {
	useCreateGroupMutation,
	useGetGroupInfoQuery,
	useGetGroupsQuery,
	useDeleteGroupMutation,
	useEditGroupMutation
} = groupsApi
