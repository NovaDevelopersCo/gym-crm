interface DataType {
	key: React.Key
	name: string
	dateOfSale: string
	validity: string
	status: string
}

export const salesDataArr: DataType[] = [
	{
		key: '1',
		name: 'Клюшки',
		dateOfSale: '20-02-2024',
		validity: '20-03-2024',
		status: 'неактивная'
	},
	{
		key: '2',
		name: 'Боксёрские перчатки',
		dateOfSale: '20-02-2024',
		validity: '20-03-2024',
		status: 'неактивная'
	},
	{
		key: '3',
		name: 'Футбольный мяч',
		dateOfSale: '20-03-2024',
		validity: '20-09-2024',
		status: 'активнен'
	},
	{
		key: '4',
		name: 'Боксерская груша',
		dateOfSale: '20-02-2024',
		validity: '20-03-2024',
		status: 'неактивная'
	},
	{
		key: '5',
		name: 'Коврик',
		dateOfSale: '20-04-2024',
		validity: '20-06-2024',
		status: 'активнен'
	},
	{
		key: '6',
		name: 'Спортивный мат',
		dateOfSale: '20-03-2024',
		validity: '20-05-2024',
		status: 'активнен'
	}
]
