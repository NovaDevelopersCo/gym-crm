import { useAppSelector } from '@store/index'

const Home = () => {
	const role = useAppSelector(store => store['auth/slice'].user!.role)

	return <div>{role && <h1>Your role {role}</h1>}</div>
}

export default Home
	