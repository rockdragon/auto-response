global.print = console.log
global.error = console.error
global.env = process.env.NODE_ENV || 'development'

global.fs = require('fs')
global.path = require('path')
global.debug = require('debug')
global.moment = require('moment')
global.debugInfo = debug('app')
global.printWithTime = (text) => print(moment().format('YYYY-MM-DD HH:mm:ss'), text)

global.config = require(`./${env}`)
try {
  global.config.site = require('./siteInfo') // eslint-disable-line global-require
} catch (err) {
  error('siteInfo.js have not exists!!!', err)
}
debugInfo('Current ENV is: ', config.env)

