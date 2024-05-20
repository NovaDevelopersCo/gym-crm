import IStaff from './staff.schema'

type EditStaffDto = Omit<Partial<IStaff>, 'id'> &
	Required<Pick<IStaff, 'id'>> & {
		password?: string
	}

export default EditStaffDto
