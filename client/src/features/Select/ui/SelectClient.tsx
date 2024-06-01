import { FC, useState } from 'react'

import { Select, Spinner, TSelectProps } from '@/shared'
import { GetItemsParams, IClient, useGetAllClientsQuery } from '@/store'

import { clientsToParams } from '../lib'

const SelectClient: FC<Omit<TSelectProps, 'options'>> = props => {
	const [params] = useState<GetItemsParams<IClient>>({
		page: 1,
		count: 20,
		searchBy: undefined,
		sortBy: undefined,
		sortOrder: undefined
	})

	const { data: clients, isLoading } = useGetAllClientsQuery(params)
	if (isLoading) return <Spinner />
	return <Select {...props} options={clientsToParams(clients!.items)} />
}
export default SelectClient
