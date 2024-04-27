// eslint-disable-next-line import/no-internal-modules
import { clientActivityArr } from '../data/clientActivity.data'
import cl from './ClientActivity.module.scss'
import ClientActivityTable from './ClientActivityTable'

const ClientActivity = () => {
	return (
		<div className={cl.root}>
			<h1 className={cl.root__title}>Активность клиента</h1>
			<ClientActivityTable data={clientActivityArr} />
		</div>
	)
}

export default ClientActivity
