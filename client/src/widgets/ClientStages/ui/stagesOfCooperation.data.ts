type TStagesOfCooperationFields =
	| 'clientInBase'
	| 'clientRegistrated'
	| 'clientVisited'
	| 'clientBuyAbonement'
	| 'clientRenewedAbonement'

interface IStagesOfCooperation {
	label: string
	name: TStagesOfCooperationFields
	commentary?: string
}

export const stagesOfCooperationArr: IStagesOfCooperation[] = [
	{
		label: 'Клиент внесён в базу',
		name: 'clientInBase',
		commentary: 'Комментарий'
	},
	{
		label: 'Клиент записан на пробную тренировку',
		name: 'clientRegistrated',
		commentary: 'Комментарий'
	},
	{
		label: 'Клиент посетил пробную тренировку',
		name: 'clientVisited',
		commentary: 'Комментарий'
	},
	{
		label: 'Клиент купил абонемент',
		name: 'clientBuyAbonement',
		commentary: 'Комментарий'
	},
	{
		label: 'Клиент продлил абонемент',
		name: 'clientRenewedAbonement',
		commentary: 'Комментарий'
	}
]
