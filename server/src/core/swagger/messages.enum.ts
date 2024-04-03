export enum ESwaggerMessages {
	UNAUTHORIZED = 'Токен отсутствует, либо некорректен',
	PROFILE_NOT_FOUND = 'Профиль не найден',
	INVALID_PASSWORD = 'Неверный пароль',
	FORBIDDEN = 'Недостаточно прав для совершения операции',
	LOGIN_ERROR = 'Ошибка логина',
	STAFF_CREATE = 'Ошибка создания профиля управляющего',
	DIRECTION_DELETE = 'Ошибка удаления направления',
	DIRECTION_CREATE = 'Ошибка создания направления',
	DIRECTION_UPDATE = 'Ошибка изменения направления',
	DIRECTION_GET_BY_ID = 'Ошибка получения направления по id',
	CLUB_GET_BY_ID = 'Ошибка получения клуба по id',
	CLUB_CREATE = 'Ошибка создания клуба',
	CLUB_DELETE = 'Ошибка удаления клуба',
	CLUB_UPDATE = 'Ошибка изменения клуба'
}
