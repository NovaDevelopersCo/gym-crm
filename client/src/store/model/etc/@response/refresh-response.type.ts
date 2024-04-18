import { IStuff } from '@/store'

type TRefreshResponse = {
	profile: IStuff | null
	accessToken: string
}

export default TRefreshResponse
