const request = require("supertest");
const app = require('../../../index');

// const user = require('../routes/user')

describe("POST /register ", () => {
    it('password do not match', (done) => {
        request(app)
            .post('/register')
            .send({
                "username": "john doe",
                "email": "johndoe@gmail.com",
                "password": "1234567",
                "password2": "23432523"
            })
            .end((req, res) => {
                expect(res.statusCode).to.be.equal(401);
                done();
            });
    })
});

describe("POST /logout", () => {
    it('logout from application', (done) => {
        request(app)
            .post('/logout')
            .end((req, res) => {
                expect(res.body).to.be.equal('logged out');
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    })
})