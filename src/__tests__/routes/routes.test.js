const request = require("supertest");
const app = require('../../../index');

// const user = require('../routes/user')

describe("POST /register ", () => {
    it('password do not match', async() => {
        const res = await request(app)
            .post('/register')
            .send({
                "username": "john doe",
                "email": "johndoe@gmail.com",
                "password": "1234567",
                "password2": "23432523"
            });

        expect(401)
    })
});