'use strict'

const _ = require('lodash')
const lib = require('./lib')
const Trailpack = require('trailpack')
/**
 * ElasticSearch integration for Trails.js
 */
module.exports = class ElasticsearchTrailpack extends Trailpack {

  /**
   * Ensure that this trailpack supports the configured migration
   */
  validate () {
    if (!this.app.config.elasticsearch) {
      return Promise.reject(new Error('No configuration found at config.elasticsearch !'))
    }
  }

  configure () {
  }

  initialize () {
    super.initialize()

    return Promise.resolve()
  }

  /**
   * Close connection to Elasticsearch
   */
  unload () {
    return Promise.resolve()
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

}
