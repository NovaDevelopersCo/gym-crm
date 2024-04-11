import { IStuff } from '@store/index'

type TRefreshResponse = {
	profile: IStuff | null
	accessToken: string
}

export default TRefreshResponse
