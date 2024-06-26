export enum ESwaggerMessages {
	UNAUTHORIZED = 'Токен отсутствует или некорректен',
	FORBIDDEN = 'Недостаточно прав для совершения операции',
	NOT_FOUND = 'Запись не найдена',
	ERROR_VALIDATION = 'Ошибка валидации',
	NO_FOUND_DEPENDENT_OBJECTS = 'Зависимые объекты не найдены',
	BAD_REQUEST = 'Ошибка валидации | Ошибка операции',

	// * Common messages for success request
	SUCCESSFULLY_DELETE = 'Успешно удалено',
	SUCCESSFULLY_CREATE = 'Успешно создано, результат создания',
	SUCCESSFULLY_UPDATE = 'Успешно изменено, результат создания',
	SUCCESSFULLY_GET_ONE = 'Найденная сущность по id',
	SUCCESSFULLY_GET_ALL = 'Найденные сущности с пагинацией',

	GET_ALL_DESCRIPTION = 'Получить список сущностей',
	GET_BY_ID_DESCRIPTION = 'Получить сущность по id',
	CREATE_DESCRIPTION = 'Создать новую сущность',
	UPDATE_DESCRIPTION = 'Изменить сущность',
	DELETE_DESCRIPTION = 'Удалить сущность'
}
