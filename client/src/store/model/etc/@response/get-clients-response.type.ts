import { IClient } from '@/store'

type TGetClientsResponse = {
	clients: IClient[]
	pages: number
	total: number
}

export default TGetClientsResponse
