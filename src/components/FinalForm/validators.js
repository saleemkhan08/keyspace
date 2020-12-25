export const isEmpty = (value) =>
	!value || !value?.length || !Object.keys(value)?.length;

// TODO find a way to vaidate the date
export const isValidDate = (value) => !value || !value.length;
