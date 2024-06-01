import { TSelectOption } from '@/shared'
import { IClient } from '@/store'

const clientsToParams = (clients: IClient[]) =>
	clients?.map(
		client =>
			({
				label: client?.fio,
				value: client?.id
			}) as TSelectOption
	)
export default clientsToParams
