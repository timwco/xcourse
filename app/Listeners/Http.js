'use strict'

const Env = use('Env')
const Ouch = use('youch')
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const ouch = new Ouch().pushHandler(
      new Ouch.handlers.PrettyPageHandler('blue', null, 'sublime')
    )
    ouch.handleException(error, request.request, response.response, (output) => {
      console.error(error.stack)
    })
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  const status = error.status || 500
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {

  const View = use('View')

  View.filter('uppercase', string => {
    return string.toUpperCase();
  })

  View.filter('classmap', abrv => {
    let className = abrv;
    switch (abrv) {
      case 'rb':
        className = 'Ruby';
      break;
      case 'js':
        className = 'JavaScript';
      break;
      case 'de':
        className = 'Design';
      break;
      case 'ios':
        className = 'iOS';
      break;
      case 'java':
        className = 'Java';
      break;
      case 'net':
        className = '.NET';
      break;
      default:
        className = abrv;
      break;
    }

    return className;
  })

}
