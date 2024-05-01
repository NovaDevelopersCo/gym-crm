import { CreateClubDto } from './'

type EditClubDto = CreateClubDto & { id: string }

export default EditClubDto
