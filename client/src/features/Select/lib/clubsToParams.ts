import { TSelectOption } from '@/shared'
import { IClub } from '@/store'

const clubsToParams = (clubs: IClub[]) =>
	clubs?.map(
		club =>
			({
				label: club?.name,
				value: club?.id
			}) as TSelectOption
	)
export default clubsToParams
