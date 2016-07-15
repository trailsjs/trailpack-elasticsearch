# trailpack-elasticsearch
:package: Elasticsearch Trailpack [https://www.elastic.co/products/elasticsearch](https://www.elastic.co/products/elasticsearch)

[npm-image]: https://img.shields.io/npm/v/trailpack-elasticsearch.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-elasticsearch
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-elasticsearch/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-elasticsearch
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-elasticsearch.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-elasticsearch
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-elasticsearch.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-elasticsearch
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Provides a simple integration with elasticseach

## Usage

###Configure

```js
// config/main.js

module.exports = {

  // ...
  packs: [
    require('trailpack-elasticsearch')
  ]  
}
```

### Configure connection

Configuration file for Elasticsearch trailpack is: `config/elasticsearch.js`
Otherwise you could use `config/env/{env}.js` files with `elasticsearch` property

```js

// config/elasticsearch.js

module.exports = {

  connection: {
    // List of hosts for elastic cluster
    // hosts: [],

    // One elastic instance host
    host: 'localhost:9200',
    // Log level
    log: 'trace'
  },

  // Will validate if elastic connection is alive on Trails app start
  validateConnection: true
}
```

### Using Elasticsearch API

This trailpack creates an app propertry with elasticseach client. `app.elasticClient`
So you could use it whatever you want

```js
// api/controller/SomeController.js
const Controller = require('trails-controller')

module.exports = class CommunicationController extends Controller {

  someAction (request, reply) {
    // Perform an action
    this.app.elasticClient
      .search({
        q: 'something'
      })
      .then(function (body) {
        const hits = body.hits.hits;
      }, function (error) {
        console.trace(error.message);
      })
  }
}
```

More information about Elasticsearch client could be found here: https://github.com/elastic/elasticsearch-js

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.


## License
[MIT](https://github.com/trailsjs/trailpack-elasticsearch/blob/master/LICENSE)
