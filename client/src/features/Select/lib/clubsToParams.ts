import { TSelectOption } from '@/shared'
import { GetItemsResponse, IClub } from '@/store'

const clubsToParams = (clubs: GetItemsResponse<IClub>) =>
	clubs?.items?.map(
		club =>
			({
				label: club.name,
				value: club.id
			}) as TSelectOption
	)
export default clubsToParams
