const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Athlete = require('../src/models/athlete')
const { Attachment } = require('@sendgrid/helpers/classes')

const userId = new mongoose.Types.ObjectId()

const user = {
    _id: userId,
    firstName: "Pera",
    lastName: 'Peric',
    email: "pera.peric@gmail.com",
    password: 'peraperic',
    tokens: [{
        token: jwt.sign({_id: userId, }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await Athlete.deleteMany()
    await new Athlete(user).save()
})

test('Should signup a new athlete', async () => {
   const response = await request(app)
        .post('/athletes')
        .send({
        firstName: 'Zika',
        lastName: 'Zikic',
        age: 29,
        weight: 60,
        height: 164,
        email: 'zikic.zika@gmail.com',
        password: 'zikazikic'
    }).expect(201)
})

test('Should login existing athlete.', async () => {
    await request(app)
        .post('/athletes/login').send({
        email: user.email,
        password: user.password
    }).expect(200)
})

test('Should not login nonexisting athlete', async () => {
    await request(app)
        .post('/athletes/login')
        .send({
            email: user.email,
            password: 'notmypass'
        }).expect(400)
})

test('Should get profile for athlete.', async () => {
    await request(app)
        .get('/athletes/me')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated athlete', async () => {
    await request(app)
        .get('/athletes/me')
        .send()
        .expect(401)
})

test('Should delete athlete account', async () => {
    await request(app)
        .delete('/athletes/me')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete unautheticated athlete account', async () => {
    await request(app)
        .delete('/athletes/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/athletes/me/profilePic')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .attach('photo', 'tests/fixtures/GitHub-Mark.png')
        .expect(200)
})

