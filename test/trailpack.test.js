'use strict'

const assert = require('assert')
const _ = require('lodash')

describe('Elasticsearh Trailpack', () => {
  let pack
  before(() => {
    pack = global.app.packs.elasticsearch
  })

  describe('#configure', () => {
    it('should load pack', () => {
      assert(pack)
    })
  })

  describe('#initialize', () => {

    it('create elasticClient', () => {
      assert(_.isObject(global.app.elasticClient))
    })

    it('should have .ping()', () => {
      assert(_.isFunction(global.app.elasticClient.ping))
    })

    it('shuold ping without problems', () => {
      return global.app.elasticClient
        .ping((err) => {
          console.log(err)
          assert(err)
        })
    })
  })
})
