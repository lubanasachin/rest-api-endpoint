import  validator from "validator";

const validateInputCounts = (minCount: unknown, maxCount: unknown): boolean => {
    if(!minCount || !maxCount) {
        return false;
    }
    if(
        !validator.isInt(minCount.toString()) || 
        !validator.isInt(maxCount.toString())) {
        return false;
    }
    if(minCount > maxCount) {
        return false;
    }
    return true;
};

const validateInputDates = (startDate: string, endDate: string): boolean => {
    const dateFormat = "YYYY-MM-DD";
    if(
        !validator.isDate(startDate, {format: dateFormat}) || 
        !validator.isDate(endDate, {format: dateFormat})) {
        return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if(start.getTime() > end.getTime()) {
        return false;
    }
    return true;
};

export const validateInputs = (input: any) => {
    if(
        !validateInputCounts(input.minCount, input.maxCount) || 
        !validateInputDates(input.startDate, input.endDate)) {
        return false;
    }
    return true;
};