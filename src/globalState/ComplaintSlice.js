export const COMPLAINTS_TYPES = Object.freeze({
	PLUMBING: 'Plumbing',
	WASTE_DISPOSAL: 'Waste Disposal',
	ELECTRICAL: 'Electrical',
	CARPENTER: 'Carpenter',
	OTHERS: 'Others',
});
export const COMPLAINTS = 'complaints';
export const STATUS_TYPES_TEXT = Object.freeze({
	OPEN: {
		key: 'OPEN',
		value: 'Open',
		icon: 'add_circle_outline',
	},
	WORK_IN_PROGRESS: {
		key: 'WORK_IN_PROGRESS',
		value: 'Work In Progress',
		icon: 'schedule',
	},
	RESOLVED: {
		key: 'RESOLVED',
		value: 'Resolved',
		icon: 'check_circle_outline',
	},
	RE_OPEN: {
		key: 'RE_OPEN',
		value: 'Reopened',
		icon: 'refresh',
	},
});

export const STATUS_TYPES_OPEN = [
	STATUS_TYPES_TEXT.WORK_IN_PROGRESS,
	STATUS_TYPES_TEXT.RESOLVED,
];

export const STATUS_TYPES_WORK_IN_PROGRESS = [STATUS_TYPES_TEXT.RESOLVED];
export const STATUS_TYPES_RESOLVED = [STATUS_TYPES_TEXT.RE_OPEN];
export const STATUS_TYPES_RE_OPEN = [
	STATUS_TYPES_TEXT.WORK_IN_PROGRESS,
	STATUS_TYPES_TEXT.RESOLVED,
];

export const STATUS_TYPES = Object.freeze({
	OPEN: STATUS_TYPES_OPEN,
	WORK_IN_PROGRESS: STATUS_TYPES_WORK_IN_PROGRESS,
	RESOLVED: STATUS_TYPES_RESOLVED,
	RE_OPEN: STATUS_TYPES_RE_OPEN,
});
