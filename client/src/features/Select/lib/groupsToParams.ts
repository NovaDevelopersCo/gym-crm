import { TSelectOption } from '@/shared'
import { GetItemsResponse, IGroup } from '@/store'

const groupsToParams = (groups: GetItemsResponse<IGroup>) =>
	groups?.items?.map(
		group =>
			({
				label: group.name,
				value: group.id
			}) as TSelectOption
	)

export default groupsToParams
