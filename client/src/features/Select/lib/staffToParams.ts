import { TSelectOption } from '@/shared'
import { GetItemsResponse, IStaff } from '@/store'

const staffsToParams = (staffs: GetItemsResponse<IStaff>) =>
	staffs?.items?.map(
		staff =>
			({
				label: staff.email,
				value: staff.id
			}) as TSelectOption
	)

export default staffsToParams
