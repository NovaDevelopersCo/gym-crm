import cl from './ClientActivity.module.scss'
import ClientActivityTable from './ClientActivityTable'
import { clientActivityArr } from './clientActivity.data'

const ClientActivity = () => {
	return (
		<div className={cl.root}>
			<h1 className={cl.root__title}>Активность клиента</h1>
			<ClientActivityTable data={clientActivityArr} />
		</div>
	)
}

export default ClientActivity
