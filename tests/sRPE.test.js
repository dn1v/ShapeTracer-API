const request = require('supertest')
const sRPE = require('../src/models/sRPE')
const app = require('../src/app')
const { userId, user, setupDB } = require('./fixtures/db')


beforeEach(setupDB)

test('Should create sRPE for athlete', async () => {
   const res = await request(app)
        .post('/sessionRPE')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send({
            trainingType: 'Strength',
            duration: 45,
            sRPE: 8
        }).expect(201)

    const task = await sRPE.findById(res.body._id)
    expect(task).not.toBeNull()


})