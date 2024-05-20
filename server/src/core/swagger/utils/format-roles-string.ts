export const formatRolesString = (roles: string[]) => {
	return roles.reduce(
		(acc, item, index) => acc + item + (index + 1 < roles.length ? ', ' : ''),
		'Только с ролью '
	)
}
