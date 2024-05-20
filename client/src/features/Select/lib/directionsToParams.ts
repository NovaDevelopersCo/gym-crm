import { TSelectOption } from '@/shared'
import { IDirection } from '@/store'

const directionsToParams = (directions: IDirection[]) =>
	directions?.map(
		direction =>
			({
				label: direction.name,
				value: direction.id
			}) as TSelectOption
	)

export default directionsToParams
