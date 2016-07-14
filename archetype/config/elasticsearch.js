'use strict'

/**
 * Base configuration for elasticsearch
 */
module.exports = {

  connection: {
    /*
    // Elastic hosts configs
    hosts: [],
    */

    /**
     * Elasticsearch host
     */
    host: 'localhost:9200',

    /**
     * Log level
     */
    log: 'trace'
  },

  /**
   * If true trailpack will validate connection to elasticsearch
   * @type {Boolean}
   */
  validateConnection: false

}
