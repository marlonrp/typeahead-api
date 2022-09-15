import * as http from 'http'
import request from 'supertest'

import { AllowedMethods, HttpCodeEnum, HttpStatusEnum } from '@app/core/types/response'
import Typeahead from '@app/entities/Typeahead'
import { port, hostname } from '@app/server/constants'
import setupApp from '@app/server/index'

let server: http.Server

beforeAll(() => {
  server = setupApp().listen({ port, hostname })
})

afterAll(() => {
  server.close()
})

describe('TypeaheadController', () => {
  const maris: Typeahead = {
    name: 'Maris',
    times: 992,
  }
  const marisIncreasedTimes = 993
  const xpto: Typeahead = {
    name: 'Xpto',
    times: 1,
  }

  it(`GET /typeahead/${maris.name}`, async () => {
    const response = await request(server)
      .get(`/typeahead/${maris.name}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    const body = response.body
    expect(body.length).toBeGreaterThanOrEqual(4)
    expect(body[0]).toEqual(maris)
  })

  it(`POST /typeahead - body: ${JSON.stringify(maris)}`, async () => {
    const response = await request(server)
      .post('/typeahead')
      .send(maris)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    const body = response.body
    expect(body).toStrictEqual({ name: maris.name, times: marisIncreasedTimes })
  })

  it(`GET /typeahead/${xpto.name}`, async () => {
    const response = await request(server)
      .get(`/typeahead/${xpto.name}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.length).toBeLessThan(xpto.times)
  })

  it(`POST /typeahead - body: ${JSON.stringify(xpto)}`, async () => {
    const response = await request(server)
      .post('/typeahead')
      .send(xpto)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(response.body).toStrictEqual(xpto)
  })

  it(`POST /typeahead - body: {}`, async () => {
    const response = await request(server)
      .post('/typeahead')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body.status).toEqual(HttpStatusEnum.BAD_REQUEST)
    expect(response.body.code).toEqual(HttpCodeEnum.BAD_REQUEST)
    expect(response.body.message.length).toBeGreaterThan(0)
  })

  it(`GET /typeahead`, async () => {
    const response = await request(server).get('/typeahead').set('Accept', 'application/json').expect('Content-Type', /json/).expect(405)

    expect(response.body.status).toEqual(HttpStatusEnum.METHOD_NOT_ALLOWED)
    expect(response.body.code).toEqual(HttpCodeEnum.METHOD_NOT_ALLOWED)
    expect(response.body.message).toContain(AllowedMethods.GET)
  })

  it(`POST /typeahead/${xpto.name} - body: {}`, async () => {
    const response = await request(server)
      .post(`/typeahead/${xpto.name}`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(405)

    expect(response.body.status).toEqual(HttpStatusEnum.METHOD_NOT_ALLOWED)
    expect(response.body.code).toEqual(HttpCodeEnum.METHOD_NOT_ALLOWED)
    expect(response.body.message).toContain(AllowedMethods.POST)
  })
})
