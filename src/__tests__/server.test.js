const request = require("supertest");

const app = require('../../index');


describe("GET / ", () => {
    test("It should respond with Welcome to zoomCarAPI", async() => {
        const response = await request(app).get("/");
        expect(response.body).toEqual("Welcome to zoomCarAPI");
        expect(response.statusCode).toBe(200);
    });
});