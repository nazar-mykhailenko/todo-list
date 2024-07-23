export interface Task {
	id: number;
	title: string;
	description?: string;
	status: string;
}

export interface UpsertTask {
	title: string;
	description?: string;
	status: string;
}
