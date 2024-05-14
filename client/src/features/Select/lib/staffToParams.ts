import { TSelectOption } from '@/shared'
import { IStaff } from '@/store'

const staffsToParams = (staffs: IStaff[]) =>
	staffs?.map(
		staff =>
			({
				label: staff.email,
				value: staff.id
			}) as TSelectOption
	)

export default staffsToParams
