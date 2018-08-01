export type Permission = 'r' | 'w' | 'rw' | 'n';

export type RequestStatus = 'pending' | 'success' | 'fail';

export type BlueprintError = {
	lineNumber: number,
	range: number,
	errors: Array<string>
};

export type Blueprint = {
	name: string,
	id: number,
	createdAt: Date,
	lastUpdated: Date,
	owner: string,
	permission: Permission,
	content: any
};

export type BlueprintSegment = {
	start: number,
	end: number
};

export type CursorPosition = {
	row: number,
	col: number
};

export type EditorState = {
	blueprints: Array<Blueprint>,
	selectBlueprint: ?Blueprint,
	fetchBlueprintsStatus: ?RequestStatus,
	saveBlueprintStatus: ?RequestStatus,
	editorErrors: Array<BlueprintError>,
	segments: {[string]: BlueprintSegment},
	currentSegment: string
};

export type CookbookEntry = {
	name: string,
	content: string
};
