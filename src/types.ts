export type InputFilters = {
    minCount: number;
    maxCount: number;
    startDate: string;
    endDate: string;
}

export type MyRecord = {
    key: string;
    value: string;
    createdAt: Date;
    counts: Array<number>;
}

