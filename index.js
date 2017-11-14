'use strict'

const _ = require('lodash')
const Trailpack = require('trailpack')
const elasticsearch = require('elasticsearch')

/**
 * ElasticSearch integration for Trails.js
 */
module.exports = class ElasticsearchTrailpack extends Trailpack {

  /**
   * Ensure that this trailpack supports the configured migration
   */
  validate() {
    if (!_.isObject(this.app.config.elasticsearch))
      return Promise.reject(new Error('No configuration found at config.elasticsearch !'))

    if (!_.isObject(this.app.config.elasticsearch.connection))
      return Promise.reject(new Error('No connection configuration defined !'))
  }

  configure() {
    // setup default log level to warning
    if (!this.app.config.elasticsearch.connection.log) {
      this.app.config.elasticsearch.connection.log = 'warning'
    }
  }

  initialize() {
    super.initialize()

    // Notice !!!
    // Elastic try to change given config onject. So do not remove `_.clone`
    // Otherwise Trails will pass readonly object and Elasticsearch wouldn't
    // be able to connect
    this.client = new elasticsearch.Client(_.clone(this.app.config.elasticsearch.connection))
    this.app.elasticClient = this.client

    // If no need to validate connection - exit
    if (!this.app.config.elasticsearch.validateConnection)
      return Promise.resolve()

    // validating connection using ping command
    return new Promise((resolve, reject) => {
      this.client.ping((err) => {
        if (err)
          return reject(err)

        resolve()
      })
    })
  }

  /**
   * Close connection to Elasticsearch
   */
  unload() {
    if (!this.app.elasticClient || !_.isFunction(this.app.elasticClient.close))
      return

    // Closing elasticsearch connection
    this.app.elasticClient.close()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

}
