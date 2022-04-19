"use strict";

import { Response, Request, NextFunction } from "express";

import { findMatchingRecords } from "../services/myRecords";
import { validateInputs } from "../utils/validator";
import logger from "../utils/logger";

/**
 * fetches records from mongodb collection based on given input filters
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const fetchRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const inputs = {
            minCount: req.body.minCount,
            maxCount: req.body.maxCount,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        };

        if(!validateInputs(inputs)) {
            return res.status(400).send({code: 1, msg: "bad request, invalid input values"});
        }

        const results = await findMatchingRecords(inputs);
        res.status(200);
        if(!results || results.length === 0) {
            return res.send({code: 1, msg: "no matching records found"});
        }
            
        res.send({code: 0, msg: "success", records: results});
        
    } catch(err) {
        logger.debug("failed with error", err.message);
        res.status(500).send({code: 2, msg: "failed to fetch matching records"});
    }
};
