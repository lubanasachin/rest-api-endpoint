"use strict";

import { Response, Request, NextFunction } from "express";

export const fetchCount = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({response: "OK"});
};
