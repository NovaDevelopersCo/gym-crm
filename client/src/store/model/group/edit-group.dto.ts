import { CreateGroupDto } from './'

type EditGroupDto = CreateGroupDto & { id: string }

export default EditGroupDto
