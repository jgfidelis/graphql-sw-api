'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5000;
//import { print } from 'graphql/language';

var app = new _koa2.default();

app.use((0, _koaGraphql2.default)({
  schema: _schema.schema,
  graphiql: true
  /*extensions: ({ document, variables, operationName, result }) => {
      console.log(print(document));
      console.log(variables);
      console.log(result);
  },*/
}));

app.listen(PORT, function () {
  console.log('Server listening at port ' + PORT);
});