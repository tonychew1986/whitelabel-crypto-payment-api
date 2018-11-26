import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Merchant } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, merchant

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  merchant = await Merchant.create({ user })
})

test('POST /merchants 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', country: 'test', accountTier: 'test', accountStatus: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.accountTier).toEqual('test')
  expect(body.accountStatus).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /merchants 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /merchants 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /merchants 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /merchants/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${merchant.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(merchant.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /merchants/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${merchant.id}`)
  expect(status).toBe(401)
})

test('GET /merchants/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /merchants/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${merchant.id}`)
    .send({ access_token: userSession, name: 'test', country: 'test', accountTier: 'test', accountStatus: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(merchant.id)
  expect(body.name).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.accountTier).toEqual('test')
  expect(body.accountStatus).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /merchants/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${merchant.id}`)
    .send({ access_token: anotherSession, name: 'test', country: 'test', accountTier: 'test', accountStatus: 'test' })
  expect(status).toBe(401)
})

test('PUT /merchants/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${merchant.id}`)
  expect(status).toBe(401)
})

test('PUT /merchants/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', country: 'test', accountTier: 'test', accountStatus: 'test' })
  expect(status).toBe(404)
})

test('DELETE /merchants/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${merchant.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /merchants/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${merchant.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /merchants/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${merchant.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /merchants/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${merchant.id}`)
  expect(status).toBe(401)
})

test('DELETE /merchants/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
