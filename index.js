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

    this.app.elasticClient = new elasticsearch.Client(this.app.config.elasticsearch.connection)

    // If no need to validate connection - exit
    if (!this.app.config.elasticsearch.validateConnection)
      return Promise.resolve()

    // validating connection using ping command
    return new Promise((resolve, reject) => {
      this.app.elasticClient.ping({
        requestTimeout: 3000
      }, function(err) {
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
