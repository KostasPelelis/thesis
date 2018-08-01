'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _api2.default().express;

describe('Blueprint API', function () {
  describe('GET /api/v1/blueprints - get all blueprints', function () {
    // properties expected on an obj in the response
    var expectedProps = ['name', 'id', 'createdAt', 'lastUpdated', "permission", 'owner', 'content'];
    it('should return JSON array', function () {
      return (0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints').expect(200).then(function (res) {
        // check that it sends back an array
        expect(res.body).toBeInstanceOf(Array);
      });
    });
    it('should return objs w/ correct props', function () {
      return (0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints').expect(200).then(function (res) {
        // check for the expected properties
        var sampleKeys = Object.keys(res.body[0]);
        expectedProps.forEach(function (key) {
          expect(sampleKeys.includes(key)).toBe(true);
        });
      });
    });
    it('shouldn\'t return objs w/ extra props', function () {
      return (0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints').expect(200).then(function (res) {
        // check for only expected properties
        var extraProps = Object.keys(res.body[0]).filter(function (key) {
          return !expectedProps.includes(key);
        });
        expect(extraProps.length).toBe(0);
      });
    });
  });
});

describe('GET /api/v1/blueprints/:id - get blueprint by id', function () {
  it('should return an obj of type Produce', function () {
    return (0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints/1').expect(200).then(function (res) {
      var reqKeys = ['name', 'id', 'createdAt', 'lastUpdated', "permission", 'owner', 'content'];
      var item = res.body.item;
      // check it has correct keys

      reqKeys.forEach(function (key) {
        expect(Object.keys(item)).toContain(key);
      });
      // check type of each field
      expect(_typeof(item.id)).toBe('number');
      expect(_typeof(item.name)).toBe('string');
    });
  });
  it('should 404 on a request for a nonexistant id', function () {
    return Promise.all([(0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints/-32').expect(404), (0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints/99999').expect(404)]);
  });
});

describe('POST /api/v1/blueprints - create new item', function () {
  var blueprint = {
    name: 'Test Blueprint',
    content: "{\"key\":1,\"key2\":\"val\"}"
  };
  it('should accept and add a valid new item', function () {
    return (0, _supertestAsPromised2.default)(app).post('/api/v1/blueprints').send(peach).then(function (blueprint) {
      expect(res.body.status).toBe(200);
      return (0, _supertestAsPromised2.default)(app).get('/api/v1/blueprints');
    }).then(function (res) {
      var newBlueprints = res.body.find(function (blueprint) {
        return blueprint.name === 'Test Blueprint';
      });
      expect(res.status).toBe(200);
    });
  });
});
//# sourceMappingURL=Api-rntest.js.map
