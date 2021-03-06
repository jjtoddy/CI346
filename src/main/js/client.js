/**
 * Created by JT on 03/04/2017.
 */

var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var templateInterceptor = require('./api/templateInterceptor');
var errorCode = require('rest/interceptor/errorCode');
var baseRegistry = require('rest/mime/registry');

var registry = baseRegistry.child();

registry.register('text/uri-list', require('./api/listConverter'));
registry.register('application/hal+json', require('rest/mime/type/application/hal'));

module.exports = rest
    .wrap(mime, { registry: registry })
    .wrap(templateInterceptor)
    .wrap(errorCode)
    .wrap(defaultRequest, { headers: { 'Accept': 'application/hal+json' }});
