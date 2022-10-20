export interface ChinaTotal {
	showlocalinfeciton: number;
	local_acc_confirm: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	importedCase: number;
	showLocalConfirm: number;
	confirmAdd: number;
	nowLocalWzz: number;
	deadAdd: number;
	localConfirmAdd: number;
	heal: number;
	noInfect: number;
	mRiskTime: string;
	localWzzAdd: number;
	mediumRiskAreaNum: number;
	nowSevere: number;
	noInfectH5: number;
	localConfirmH5: number;
	highRiskAreaNum: number;
	localConfirm: number;
	dead: number;
	suspect: number;
}

export interface ChinaAdd {
	confirm: number;
	nowConfirm: number;
	nowSevere: number;
	importedCase: number;
	localConfirm: number;
	heal: number;
	dead: number;
	suspect: number;
	noInfect: number;
	noInfectH5: number;
	localConfirmH5: number;
}

export interface ShowAddSwitch {
	nowConfirm: boolean;
	localConfirm: boolean;
	all: boolean;
	suspect: boolean;
	heal: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localinfeciton: boolean;
	confirm: boolean;
	dead: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	nowConfirm: number;
	showRate: boolean;
	wzz: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	dead: number;
	showHeal: boolean;
	confirm: number;
	heal: number;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	adcode: string;
}

export interface Today {
	local_confirm_add: number;
	abroad_confirm_add?: number;
	dead_add?: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip?: string;
	wzz_add: number | string;
}

export interface Total {
	dead: number;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
	nowConfirm: number;
	showHeal: boolean;
	highRiskAreaNum: number;
	continueDayZeroConfirmAdd: number;
	confirm: number;
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroConfirm: number;
	adcode: string;
	showRate: boolean;
	heal: number;
	mediumRiskAreaNum: number;
}

// export interface Today {
// 	isUpdated: boolean;
// 	wzz_add: string;
// 	local_confirm_add: number;
// 	confirm: number;
// 	confirmCuts: number;
// }

export interface Total {
	nowConfirm: number;
	confirm: number;
	heal: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	adcode: string;
	showHeal: boolean;
	continueDayZeroLocalConfirmAdd: number;
	showRate: boolean;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	dead: number;
	wzz: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	today: Today;
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
	date: string;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Diseaseh5Shelf {
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
}

export interface LocalCityNCOVDataList {
	highRiskAreaNum: number;
	isSpecialCity: boolean;
	adcode: string;
	date: string;
	isUpdated: boolean;
	mtime: string;
	mediumRiskAreaNum: number;
	province: string;
	city: string;
	local_confirm_add: number;
	local_wzz_add: string;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	localCityNCOVDataList: LocalCityNCOVDataList[];
}