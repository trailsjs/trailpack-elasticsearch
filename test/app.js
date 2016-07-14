'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'elasticsearch-trailpack-test'
  },
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    main: {
      packs: [
        require('trailpack-core'),
        require('../') // trailpack-elasticsearch
      ]
    },
    elasticsearch: {

      connection: {

        host: 'localhost:9200'

      }
    }
  }
}, smokesignals.FailsafeConfig)
