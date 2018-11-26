import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Transaction } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, transaction

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  transaction = await Transaction.create({})
})

test('POST /transactions 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ transactionStatus: 'test', paymentDollarValue: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', paymentCurrency: 'test', network: 'test', addressReceiver: 'test', addressSender: 'test', paymentType: 'test', cryptocurrencyPrice: 'test', transactionId: 'test', shippingName: 'test', shippingEmail: 'test', shippingMobile: 'test', shippingCountry: 'test', shippingAddress: 'test', shippingPostal: 'test', transactionHash: 'test', rewardAwarded: 'test', userId: 'test', merchantType: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.transactionStatus).toEqual('test')
  expect(body.paymentDollarValue).toEqual('test')
  expect(body.merchantId).toEqual('test')
  expect(body.cryptocurrencyType).toEqual('test')
  expect(body.cryptocurrencyPaid).toEqual('test')
  expect(body.paymentCurrency).toEqual('test')
  expect(body.network).toEqual('test')
  expect(body.addressReceiver).toEqual('test')
  expect(body.addressSender).toEqual('test')
  expect(body.paymentType).toEqual('test')
  expect(body.cryptocurrencyPrice).toEqual('test')
  expect(body.transactionId).toEqual('test')
  expect(body.shippingName).toEqual('test')
  expect(body.shippingEmail).toEqual('test')
  expect(body.shippingMobile).toEqual('test')
  expect(body.shippingCountry).toEqual('test')
  expect(body.shippingAddress).toEqual('test')
  expect(body.shippingPostal).toEqual('test')
  expect(body.transactionHash).toEqual('test')
  expect(body.rewardAwarded).toEqual('test')
  expect(body.userId).toEqual('test')
  expect(body.merchantType).toEqual('test')
})

test('GET /transactions 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /transactions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /transactions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${transaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaction.id)
})

test('GET /transactions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${transaction.id}`)
  expect(status).toBe(401)
})

test('GET /transactions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /transactions/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${transaction.id}`)
    .send({ access_token: adminSession, transactionStatus: 'test', paymentDollarValue: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', paymentCurrency: 'test', network: 'test', addressReceiver: 'test', addressSender: 'test', paymentType: 'test', cryptocurrencyPrice: 'test', transactionId: 'test', shippingName: 'test', shippingEmail: 'test', shippingMobile: 'test', shippingCountry: 'test', shippingAddress: 'test', shippingPostal: 'test', transactionHash: 'test', rewardAwarded: 'test', userId: 'test', merchantType: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(transaction.id)
  expect(body.transactionStatus).toEqual('test')
  expect(body.paymentDollarValue).toEqual('test')
  expect(body.merchantId).toEqual('test')
  expect(body.cryptocurrencyType).toEqual('test')
  expect(body.cryptocurrencyPaid).toEqual('test')
  expect(body.paymentCurrency).toEqual('test')
  expect(body.network).toEqual('test')
  expect(body.addressReceiver).toEqual('test')
  expect(body.addressSender).toEqual('test')
  expect(body.paymentType).toEqual('test')
  expect(body.cryptocurrencyPrice).toEqual('test')
  expect(body.transactionId).toEqual('test')
  expect(body.shippingName).toEqual('test')
  expect(body.shippingEmail).toEqual('test')
  expect(body.shippingMobile).toEqual('test')
  expect(body.shippingCountry).toEqual('test')
  expect(body.shippingAddress).toEqual('test')
  expect(body.shippingPostal).toEqual('test')
  expect(body.transactionHash).toEqual('test')
  expect(body.rewardAwarded).toEqual('test')
  expect(body.userId).toEqual('test')
  expect(body.merchantType).toEqual('test')
})

test('PUT /transactions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transaction.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /transactions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${transaction.id}`)
  expect(status).toBe(401)
})

test('PUT /transactions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, transactionStatus: 'test', paymentDollarValue: 'test', merchantId: 'test', cryptocurrencyType: 'test', cryptocurrencyPaid: 'test', paymentCurrency: 'test', network: 'test', addressReceiver: 'test', addressSender: 'test', paymentType: 'test', cryptocurrencyPrice: 'test', transactionId: 'test', shippingName: 'test', shippingEmail: 'test', shippingMobile: 'test', shippingCountry: 'test', shippingAddress: 'test', shippingPostal: 'test', transactionHash: 'test', rewardAwarded: 'test', userId: 'test', merchantType: 'test' })
  expect(status).toBe(404)
})

test('DELETE /transactions/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaction.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /transactions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaction.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /transactions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${transaction.id}`)
  expect(status).toBe(401)
})

test('DELETE /transactions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
