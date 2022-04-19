import { MyRecords } from "../models/myRecords";
import { InputFilters, MyRecord } from "../types";

export const findMatchingRecords = async (input: InputFilters): Promise<Array<MyRecord>> => {
    const aggregate = MyRecords.aggregate([
        {
            "$project": {
                "_id": 0,
                createdAt: 1,
                key: 1,
                totalCount: {
                    "$sum": "$counts"
                }
            }
        },
        {
            "$match": {
            totalCount: {
                "$gte": input.minCount,
                "$lte": input.maxCount
            },
            createdAt: {
                $gte: new Date(input.startDate), 
                $lt: new Date(input.endDate),
                },
            }
        }
    ]);

    const data = await aggregate.exec();
    return data;
};