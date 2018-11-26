import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Financial } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, financial

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  financial = await Financial.create({})
})

test('POST /financials 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, accountType: 'test', accountOwner: 'test', balance: 'test', transactionHistory: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.accountType).toEqual('test')
  expect(body.accountOwner).toEqual('test')
  expect(body.balance).toEqual('test')
  expect(body.transactionHistory).toEqual('test')
})

test('POST /financials 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /financials 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /financials 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /financials 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /financials 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /financials 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /financials/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${financial.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(financial.id)
})

test('GET /financials/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${financial.id}`)
  expect(status).toBe(401)
})

test('GET /financials/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /financials/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${financial.id}`)
    .send({ access_token: adminSession, accountType: 'test', accountOwner: 'test', balance: 'test', transactionHistory: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(financial.id)
  expect(body.accountType).toEqual('test')
  expect(body.accountOwner).toEqual('test')
  expect(body.balance).toEqual('test')
  expect(body.transactionHistory).toEqual('test')
})

test('PUT /financials/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${financial.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /financials/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${financial.id}`)
  expect(status).toBe(401)
})

test('PUT /financials/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, accountType: 'test', accountOwner: 'test', balance: 'test', transactionHistory: 'test' })
  expect(status).toBe(404)
})

test('DELETE /financials/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${financial.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /financials/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${financial.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /financials/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${financial.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /financials/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${financial.id}`)
  expect(status).toBe(401)
})

test('DELETE /financials/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
