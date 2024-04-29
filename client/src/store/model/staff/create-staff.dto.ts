import { IStaff } from './'

interface CreateStaffDto extends Omit<IStaff, 'id' | 'lastActivity'> {}

export default CreateStaffDto
