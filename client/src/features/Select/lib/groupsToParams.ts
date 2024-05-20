import { TSelectOption } from '@/shared'
import { IGroup } from '@/store'

const groupsToParams = (groups: IGroup[]) =>
	groups?.map(
		group =>
			({
				label: group.name,
				value: group.id
			}) as TSelectOption
	)

export default groupsToParams
