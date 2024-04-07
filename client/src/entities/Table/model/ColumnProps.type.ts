/**
 * The type TColumnProps defines the properties for a column in a table, including label and key.
 * @property {string} label - The `label` property in the `TColumnProps` type represents the display
 * label for a column in a table or grid. It is typically a string that describes the content or
 * purpose of the column.
 * @property {string} key - The `key` property in the `TColumnProps` type represents a unique
 * identifier for the column. It is used to uniquely identify each column in a data table or grid. This
 * key is typically used when rendering lists of components in React to help React efficiently update
 * the UI when the list changes.
 */
export type TColumnProps = {
	label: string
	key: string
}