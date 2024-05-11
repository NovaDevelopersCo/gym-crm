import { TSelectOption } from '@/shared'
import { GetItemsResponse, IDirection } from '@/store'

const directionsToParams = (directions: GetItemsResponse<IDirection>) =>
	directions?.items?.map(
		direction =>
			({
				label: direction.name,
				value: direction.id
			}) as TSelectOption
	)

export default directionsToParams
