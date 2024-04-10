export interface APIResponse<T> {
	code: number;
	status: string;
	message: string;
	data: T;
}
