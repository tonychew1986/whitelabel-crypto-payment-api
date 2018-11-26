import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Settlement } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, settlement

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  settlement = await Settlement.create({})
})

test('POST /settlements 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, transactionId: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', cryptocurrencyPriceQuoted: 'test', paymentCurrency: 'test', paymentAmount: 'test', cryptocurrencyPriceSettled: 'test', exchangeSettled: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.transactionId).toEqual('test')
  expect(body.merchantId).toEqual('test')
  expect(body.cryptocurrencyType).toEqual('test')
  expect(body.cryptocurrencyPaid).toEqual('test')
  expect(body.cryptocurrencyPriceQuoted).toEqual('test')
  expect(body.paymentCurrency).toEqual('test')
  expect(body.paymentAmount).toEqual('test')
  expect(body.cryptocurrencyPriceSettled).toEqual('test')
  expect(body.exchangeSettled).toEqual('test')
})

test('POST /settlements 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /settlements 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /settlements 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /settlements 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /settlements 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /settlements/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${settlement.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(settlement.id)
})

test('GET /settlements/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${settlement.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /settlements/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${settlement.id}`)
  expect(status).toBe(401)
})

test('GET /settlements/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /settlements/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${settlement.id}`)
    .send({ access_token: adminSession, transactionId: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', cryptocurrencyPriceQuoted: 'test', paymentCurrency: 'test', paymentAmount: 'test', cryptocurrencyPriceSettled: 'test', exchangeSettled: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(settlement.id)
  expect(body.transactionId).toEqual('test')
  expect(body.merchantId).toEqual('test')
  expect(body.cryptocurrencyType).toEqual('test')
  expect(body.cryptocurrencyPaid).toEqual('test')
  expect(body.cryptocurrencyPriceQuoted).toEqual('test')
  expect(body.paymentCurrency).toEqual('test')
  expect(body.paymentAmount).toEqual('test')
  expect(body.cryptocurrencyPriceSettled).toEqual('test')
  expect(body.exchangeSettled).toEqual('test')
})

test('PUT /settlements/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${settlement.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /settlements/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${settlement.id}`)
  expect(status).toBe(401)
})

test('PUT /settlements/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, transactionId: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', cryptocurrencyPriceQuoted: 'test', paymentCurrency: 'test', paymentAmount: 'test', cryptocurrencyPriceSettled: 'test', exchangeSettled: 'test' })
  expect(status).toBe(404)
})

test('DELETE /settlements/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${settlement.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /settlements/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${settlement.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /settlements/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${settlement.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /settlements/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${settlement.id}`)
  expect(status).toBe(401)
})

test('DELETE /settlements/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
