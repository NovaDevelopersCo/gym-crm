type TStagesOfCooperationFields =
	| 'clientInBase'
	| 'clientRegistrated'
	| 'clientVisited'
	| 'clientBuyAbonement'
	| 'clientRenewedAbonement'
	| 'clientDoNotSkipTrainings'

type TStagesOfCooperationTasks =
	| 'clientInBaseTask'
	| 'clientRegistratedTask'
	| 'clientVisitedTask'
	| 'clientBuyAbonementTask'
	| 'clientRenewedAbonementTask'
	| 'clientDoNotSkipTrainingsTask'

interface IStagesOfCooperation {
	label: string
	name: TStagesOfCooperationFields
	commentary?: string
	task: TStagesOfCooperationTasks
}

export const stagesOfCooperationArr: IStagesOfCooperation[] = [
	{
		label: 'Клиент внесён в базу',
		name: 'clientInBase',
		commentary: 'Комментарий',
		task: 'clientInBaseTask'
	},
	{
		label: 'Клиент записан на пробную тренировку',
		name: 'clientRegistrated',
		commentary: 'Комментарий',
		task: 'clientRegistratedTask'
	},
	{
		label: 'Клиент посетил пробную тренировку',
		name: 'clientVisited',
		commentary: 'Комментарий',
		task: 'clientVisitedTask'
	},
	{
		label: 'Клиент купил абонемент',
		name: 'clientBuyAbonement',
		commentary: 'Комментарий',
		task: 'clientBuyAbonementTask'
	},
	{
		label: 'Клиент продлил абонемент',
		name: 'clientRenewedAbonement',
		commentary: 'Комментарий',
		task: 'clientRenewedAbonementTask'
	},
	{
		label: 'Клиент не пропускает тренировки',
		name: 'clientDoNotSkipTrainings',
		commentary: 'Комментарий',
		task: 'clientDoNotSkipTrainingsTask'
	}
]
