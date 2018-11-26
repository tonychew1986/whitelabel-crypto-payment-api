import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Invoice } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, invoice

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  invoice = await Invoice.create({ user })
})

test('POST /invoices 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, merchantId: 'test', merchantName: 'test', amount: 'test', currency: 'test', productReference: 'test', network: 'test', urlCallback: 'test', urlCancel: 'test', urlComplete: 'test', customerName: 'test', customerEmail: 'test', customerMobile: 'test', customerCountry: 'test', customerAddress: 'test', customerCity: 'test', customerState: 'test', customerPostal: 'test', invoiceId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.merchantId).toEqual('test')
  expect(body.merchantName).toEqual('test')
  expect(body.amount).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.productReference).toEqual('test')
  expect(body.network).toEqual('test')
  expect(body.urlCallback).toEqual('test')
  expect(body.urlCancel).toEqual('test')
  expect(body.urlComplete).toEqual('test')
  expect(body.customerName).toEqual('test')
  expect(body.customerEmail).toEqual('test')
  expect(body.customerMobile).toEqual('test')
  expect(body.customerCountry).toEqual('test')
  expect(body.customerAddress).toEqual('test')
  expect(body.customerCity).toEqual('test')
  expect(body.customerState).toEqual('test')
  expect(body.customerPostal).toEqual('test')
  expect(body.invoiceId).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /invoices 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /invoices 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /invoices 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /invoices 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /invoices/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /invoices/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('GET /invoices/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('DELETE /invoices/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /invoices/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(401)
})

test('DELETE /invoices/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
