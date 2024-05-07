export interface APIResponse<T> {
	code: number;
	status: number;
	message: string;
	data: T;
}
