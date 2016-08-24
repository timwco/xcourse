'use strict' 

class StatsController {

  * index (request, response) {
    yield response.sendView('stats');
  }

}

module.exports = StatsController
