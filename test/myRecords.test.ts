import request from "supertest";

import app from "../src/app";
import { MyRecords } from "../src/models/myRecords";

// eslint-disable-next-line
const mockingoose = require("mockingoose");

describe("POST /api/fetchRecords", () => {
    it("should return 400 when no input is provided", () => {
        return request(app).post("/api/fetchRecords")
            .expect(400);
    });

    it("should return 400 when startDate or endDate is not provided", () => {
        return request(app).post("/api/fetchRecords")
        .send({
            "minCount": 1000,
            "maxCount": 1500,
        })
        .expect(400);
    });

    it("should return 400 when minCount or maxCount is not provided", () => {
        return request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-20",
            "endDate": "2020-01-25",
        })
        .expect(400);
    });

    it("should return 400 when minCount or maxCount value is not number", () => {
        return request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-20",
            "endDate": "2020-01-25",
            "minCount": "abc",
            "maxCount": 1500,
        })
        .expect(400);
    });

    it("should return 400 when minCount is greater than maxCount", () => {
        return request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-20",
            "endDate": "2020-01-25",
            "minCount": 2000,
            "maxCount": 1500,
        })
        .expect(400);
    });    

    it("should return 400 when startDate or endDate value is not proper format", () => {
        return request(app).post("/api/fetchRecords")
        .send({
            "startDate": "20-01-2021",
            "endDate": "2020-01-25",
            "minCount": 1000,
            "maxCount": 1500,
        })
        .expect(400);
    });

    it("should return 400 when startDate is in future than endDate", () => {
        return request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-26",
            "endDate": "2020-01-25",
            "minCount": 1000,
            "maxCount": 1500,
        })
        .expect(400);
    });

    it("should return 500 when aggregate query fails", async () => {
        expect.assertions(4);

        const err = new Error("failed to query");
        mockingoose(MyRecords).toReturn(err, "aggregate");
        const response = await request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-21",
            "endDate": "2020-01-25",
            "minCount": 1000,
            "maxCount": 1500,
        });
        expect(response.statusCode).toEqual(500);
        expect(response.body.code).toEqual(2);
        expect(response.body.msg).toEqual("failed to fetch matching records");
        expect(response.body.records).toBeUndefined();
    });

    it("should return 200 when aggregate query returns zero records", async () => {
        expect.assertions(4);
        mockingoose(MyRecords).toReturn([], "aggregate");

        const response = await request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-21",
            "endDate": "2020-01-25",
            "minCount": 1000,
            "maxCount": 1500,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual("no matching records found");
        expect(response.body.records).toBeUndefined();
    });    
    
    it("should return 200 when aggregate query returns records", async () => {
        expect.assertions(4);
        const _doc = [
            {
                "key": "dcJUSDLR",
                "createdAt": "2016-02-27T16:12:30.813Z",
                "totalCount": 2780
            }
        ];
      
        mockingoose(MyRecords).toReturn(_doc, "aggregate");

        const response = await request(app).post("/api/fetchRecords")
        .send({
            "startDate": "2020-01-21",
            "endDate": "2020-01-25",
            "minCount": 1000,
            "maxCount": 1500,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.code).toEqual(0);
        expect(response.body.msg).toEqual("success");
        expect(response.body.records.length).toEqual(1);
    });

});
