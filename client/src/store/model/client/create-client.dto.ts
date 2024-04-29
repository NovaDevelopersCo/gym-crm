import { IClient } from './'

type CreateClientDto = Pick<
	IClient,
	| 'fio'
	| 'phone'
	| 'email'
	| 'instagram'
	| 'birthday'
	| 'howKnow'
	| 'club'
	| 'groups'
>

export default CreateClientDto
