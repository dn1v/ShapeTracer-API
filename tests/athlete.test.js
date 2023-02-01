const request = require('supertest')
const app = require('../src/app')
const Athlete = require('../src/models/athlete')
const {userId, user, setupDB} = require('./fixtures/db')


beforeEach(setupDB)

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
 
    const athlete = await Athlete.findById(response.body.athlete._id)
    expect(athlete).not.toBeNull()

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

    const ath = await Athlete.findById(userId)
    expect(ath).toBeNull()
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

    const ath = await Athlete.findById(userId)
    expect(ath.profilePhoto).toEqual(expect.any(Buffer))
})

test('Should update valid athlete fields', async () => {
    await request(app)
        .patch('/athletes/me')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            firstName: 'Mika'
        }).expect(200)

    const ath = await Athlete.findById(userId)
    
    expect(ath.firstName).toEqual('Mika')
})

test('Should not update invalid fields', async () => {
    await request(app)
        .patch('/athletes/me')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            location: 'somewhere'
        }).expect(400)
})