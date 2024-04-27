import { ClientInfo } from '@widgets/ClientInfo'
import { Sales } from '@widgets/ClientSales'
import { StagesOfCooperation } from '@widgets/ClientStages'

import { MarkClient } from '@features/MarkClient'

const ClientProfile = () => {
	return (
		<>
			<ClientInfo />
			<MarkClient />
			<StagesOfCooperation />
			<Sales />
		</>
	)
}

export default ClientProfile
