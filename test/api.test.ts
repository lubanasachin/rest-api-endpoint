import request from "supertest";

import app from "../src/app";

describe("POST /api/fetchCount", () => {
    it("should return 200 OK", () => {
        return request(app).post("/api/fetchCount")
            .expect(200);
    });
});
