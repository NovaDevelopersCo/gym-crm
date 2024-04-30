export default function anyToString(data: unknown): string {
	if (Array.isArray(data))
		if (typeof data[0] == 'string' || typeof data[0] == 'number')
			return data.join(', ')
		else if (typeof data[0] == 'object') return JSON.stringify(data)
		else return anyToString(data[0])
	else if (typeof data == 'object')
		return JSON.stringify(data)
	return data as string
}
