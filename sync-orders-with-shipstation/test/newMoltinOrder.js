'use strict'

// tests for newMoltinOrder
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')

const { expect } = mochaPlugin.chai
const wrapped = mochaPlugin.getWrapper('newMoltinOrder', '/handler.js', 'newMoltinOrder')

describe('newMoltinOrder', () => {
  before((done) => {
    done()
  })

  it('implement tests here', () => wrapped.run({}).then((response) => {
    expect(response).to.not.be.empty
  }))
})