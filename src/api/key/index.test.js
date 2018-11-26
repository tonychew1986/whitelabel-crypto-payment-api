import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Key } from '.'

const app = () => express(apiRoot, routes)

let userSession, key

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  key = await Key.create({})
})

test('POST /keys 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, merchantId: 'test', keyLabel: 'test', keyId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.merchantId).toEqual('test')
  expect(body.keyLabel).toEqual('test')
  expect(body.keyId).toEqual('test')
})

test('POST /keys 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /keys 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /keys 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /keys/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${key.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(key.id)
})

test('GET /keys/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${key.id}`)
  expect(status).toBe(401)
})

test('GET /keys/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('DELETE /keys/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${key.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /keys/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${key.id}`)
  expect(status).toBe(401)
})

test('DELETE /keys/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
