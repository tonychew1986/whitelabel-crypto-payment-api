import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Statistic } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, statistic

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  statistic = await Statistic.create({})
})

test('POST /statistics 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, walletGenerationNumber: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.walletGenerationNumber).toEqual('test')
})

test('POST /statistics 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /statistics 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /statistics 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /statistics 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /statistics 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /statistics/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${statistic.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(statistic.id)
})

test('GET /statistics/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${statistic.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /statistics/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${statistic.id}`)
  expect(status).toBe(401)
})

test('GET /statistics/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /statistics/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${statistic.id}`)
    .send({ access_token: adminSession, walletGenerationNumber: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(statistic.id)
  expect(body.walletGenerationNumber).toEqual('test')
})

test('PUT /statistics/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${statistic.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /statistics/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${statistic.id}`)
  expect(status).toBe(401)
})

test('PUT /statistics/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, walletGenerationNumber: 'test' })
  expect(status).toBe(404)
})

test('DELETE /statistics/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${statistic.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /statistics/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${statistic.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /statistics/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${statistic.id}`)
  expect(status).toBe(401)
})

test('DELETE /statistics/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
