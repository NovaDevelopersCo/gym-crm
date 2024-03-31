import { IClient } from "@store/model"

type TGetClientsResponse = {
	clients: IClient[]
	pages: number
	total: number
}

export default TGetClientsResponse
