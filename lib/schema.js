'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function newFetch(url) {
  return _nodeFetch(url)
    .then(res => res.json())
    .then(json => json)
}

function executeFetch(url) {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var resp, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _nodeFetch2.default)(url);

          case 2:
            resp = _context.sent;
            _context.next = 5;
            return resp.json();

          case 5:
            data = _context.sent;
            return _context.abrupt('return', data.results);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function resolve() {
    return _ref.apply(this, arguments);
  };
}

var HomeworldType = new _graphql.GraphQLObjectType({
  name: "Homeworld",
  fields: function fields() {
    return {
      name: {type: _graphql.GraphQLString}
    }
  }
})

var HomeworldType = new _graphql.GraphQLObjectType({
  name: "Homeworld",
  fields: function fields() {
    return {
      name: {type: _graphql.GraphQLString}
    }
  }
});

var PersonType = new _graphql.GraphQLObjectType({
  name: 'Person',
  fields: function fields() {
    return {
      name: { type: _graphql.GraphQLString },
      height: { type: _graphql.GraphQLInt },
      mass: { type: _graphql.GraphQLInt },
      hairColor: {
        type: _graphql.GraphQLString,
        resolve: function resolve(person) {
          return person.hair_color;
        }
      },
      birthYear: {
        type: _graphql.GraphQLString,
        resolve: function resolve(person) {
          return person.birth_year;
        }
      },
      gender: { type: _graphql.GraphQLString },
      homeworld: {
        type: HomeworldType,
        resolve: function resolve(person) {
          return newFetch(person.homeworld)
        } 
      }
    };
  }
});

var QueryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      allPeople: {
        type: new _graphql.GraphQLList(PersonType),
        resolve: executeFetch('https://swapi.co/api/people/')
      }
    };
  }
});

var schema = exports.schema = new _graphql.GraphQLSchema({
  query: QueryType
});