import { useAppSelector } from '@store/index'
import { NewClient } from '@widgets/Client'
import { ListOfClients } from './../../../widgets/ListOfClients/index';

const ClientsPage = () => {
	const user = useAppSelector(state => state['auth/slice'].user!)
	return <>
		{user.role != 'trainer' && <NewClient />}
		<ListOfClients />
	</>
}

export default ClientsPage
