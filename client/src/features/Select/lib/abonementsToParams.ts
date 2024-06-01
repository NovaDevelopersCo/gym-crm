import { TSelectOption } from '@/shared'
import { IAbonement } from '@/store'

const abonementsToParams = (abonements: IAbonement[]) =>
	abonements?.map(
		abonement =>
			({
				label: abonement?.name,
				value: abonement?.id
			}) as TSelectOption
	)
export default abonementsToParams
