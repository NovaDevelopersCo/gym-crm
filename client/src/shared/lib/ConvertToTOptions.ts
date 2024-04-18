export default function convertToTOptions(
	labelKey: string,
	valueKey: string,
	dataArr: unknown[]
) {
	return dataArr.map(el => ({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		key: el[labelKey] as string,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		value: el[valueKey]
	}))
}
