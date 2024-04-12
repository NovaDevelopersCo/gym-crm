import { ChangeEvent, useState } from 'react'

function useInput(initialValue: string) {
	const [defaultValue, setValue] = useState(initialValue)
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	}
	return [defaultValue, handleChange]
}

export default useInput
