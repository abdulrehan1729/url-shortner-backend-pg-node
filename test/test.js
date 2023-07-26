require('dotenv').config()
const request = require('supertest')
const shortid = require('shortid')

const randomTestEmail = `${shortid.generate()}@test.com`

const baseUrl = process.env.BASE_URL || `http://localhost:8000`
let token



describe('User endpoint', () => {
    it('should return a 201 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/register').send({
                "firstName": "admin",
                "lastName": "admin",
                "email": randomTestEmail,
                "password": "12345"
            })
        if (response.error) console.error(response.error)
        expect(response.statusCode).toBe(201);
    });
    it('should return a 403 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/register').send({
                "firstName": "admin",
                "lastName": "admin",
                "email": "admin1@local.com",
                "password": "12345"
            })
        expect(response.statusCode).toBe(403);
    });
    it('should return a 403 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/register').send({
                "firstName": "admin",
                "lastName": "admin",
                "email": "admin1@local.com",
                "password": "12345"
            })
        expect(response.statusCode).toBe(403);
    });
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/register').send({
                "lastName": "admin",
                "email": "admin1@local.com",
                "password": "12345"
            })
        expect(response.text).toBe("{\"message\":\"\\\"firstName\\\" is required\"}")
        expect(response.statusCode).toBe(400);
    });
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/register').send({
                "firstName": "admin",
                "lastName": "admin",
                "password": "12345"
            })
        expect(response.text).toBe("{\"message\":\"\\\"email\\\" is required\"}")
        expect(response.statusCode).toBe(400);
    });
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/register').send({
                "firstName": "admin",
                "lastName": "admin",
                "email": "admin1@local.com",
            })
        expect(response.text).toBe("{\"message\":\"\\\"password\\\" is required\"}")
        expect(response.statusCode).toBe(400);
    });
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/login').send({
                "email": "admin1@local.com",
                "password": "12345"
            })
        token = response.body.token
        expect(response.statusCode).toBe(200);
    });
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/login').send({
                "email": "admin1@local.com",
                "password": "1234"
            })
        expect(response.text).toBe('{"error":"Invalid Credentials"}')
        expect(response.statusCode).toBe(400);
    });
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/login').send({
                "password": "12345"
            })
        expect(response.text).toBe("{\"message\":\"\\\"email\\\" is required\"}")
        expect(response.statusCode).toBe(400);
    });
    it('should return a 400 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/user/login').send({
                "email": "admin1@local.com",
            })
        expect(response.text).toBe("{\"message\":\"\\\"password\\\" is required\"}")
        expect(response.statusCode).toBe(400);
    });
});

describe('Url endpoint', () => {
    it('should return a 200 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/shorten').send({
                "longUrl": "https://formulae.brew.sh/formula/redis"
            }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200);
    });
    it('should return a 401 status code', async () => {
        const response = await request(baseUrl)
            .post('/api/shorten').send({
                "longUrl": "formulae.brew.sh/formula/redis"
            }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(401);
    });
    it('should return a 404 status code', async () => {
        const response = await request(baseUrl)
            .get('/api/redirect/12345678').send()
        expect(response.statusCode).toBe(404);
    });
});