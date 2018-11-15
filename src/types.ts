
export interface INameObject {
	[key: string]: string;
}

export interface INameArray {
	0: string;
	1?: string;
}

export type IName = string;

export type INames = IName|INameObject|INameArray;
