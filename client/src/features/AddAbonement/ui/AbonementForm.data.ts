export const abonementFieldsArr = [
	{
		name: 'name',
		rules: [{ required: true, message: 'Введите название абонементов!' }],
		label: 'Название',
		isNumber: false,
		placeholder: 'Название абонемента'
	},
	{
		name: 'price',
		rules: [{ required: true, message: 'Введите цену абонементов!' }],
		label: 'Цена',
		isNumber: true,
		placeholder: 'Цена абонемента'
	},
	{
		name: 'count',
		label: 'Количество',
		isNumber: true,
		placeholder: 'Количество абонементов'
	},
	{
		name: 'duration',
		label: 'Длительность',
		placeholder: 'Длительность абонемента'
	},
	{
		name: 'clubs',
		rules: [
			{
				required: true,
				message: 'Выберите клуб абонемента!'
			}
		],
		label: 'Клубы, в которых действует абонемент',
		isSelect: true
	}
]
