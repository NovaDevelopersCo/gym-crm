import { FC, Dispatch, SetStateAction } from 'react'
import CreatableSelectAntd from 'react-select/creatable'

interface Option {
	readonly label: string;
	readonly value: string;
}

type TCustomCreatableSelectProps = {
	label: string,
	options?: Option[],
	onCreateOption?: (inputValue: string) => void,
	value: unknown,
	setValue: Dispatch<SetStateAction<unknown>>
}

// const formatGroupLabel = (potion: Option) => (
// 	<div>
// 		<span>{data.label}</span>
// 		{/* <span>{data.options.length}</span> */}
// 	</div>
// );

const CreatableSelect: FC<TCustomCreatableSelectProps> = ({ options, label, onCreateOption, value, setValue }) => (
	<CreatableSelectAntd
		isClearable
		formatCreateLabel={(inputValue: string) => `${label}: ${inputValue}`}
		loadingMessage={() => <p>Loading...</p>}

		createOptionPosition='first'

		options={options}

		onCreateOption={onCreateOption}
		value={value}
		onChange={(newValue) => setValue(newValue)}
	/>
)

export default CreatableSelect