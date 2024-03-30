<<<<<<< HEAD
import { ListOfClients } from '@widgets/ListOfClients'

const Home = () => {
	return (
		<div>
			<ListOfClients />
		</div>
	)
=======
import { useAppSelector } from '@store/index'

const Home = () => {
	const role = useAppSelector(store => store['auth/slice'].user!.role)

	return <div>{role && <h1>Your role {role}</h1>}</div>
>>>>>>> 0b1603ceca5e3cd53a04e144366a1bb3571870e9
}

export default Home
