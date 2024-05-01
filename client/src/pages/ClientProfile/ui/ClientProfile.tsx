import { ClientInfo } from '@widgets/ClientInfo'
import { ClientSales } from '@widgets/ClientSales'
import { ClientStagesOfCooperation } from '@widgets/ClientStages'
import { ClientVisits } from '@widgets/ClientVisits'

import { MarkClient } from '@features/MarkClient'

const ClientProfile = () => {
	return (
		<>
			<ClientInfo />
			<MarkClient />
			<ClientStagesOfCooperation />
			<ClientSales />
			<ClientVisits />
		</>
	)
}

export default ClientProfile
