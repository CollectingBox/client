export interface ISearchComplete {
	code: number;
	status: string;
	message: string;
	data: {
		items: string[];
	};
}
