"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ flow

var _blueprints = require("../data/blueprints");

var _blueprints2 = _interopRequireDefault(_blueprints);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(_blueprints2.default);

var BlueprintsRouter = function () {

  // take the mount path as the constructor argument

  // these fields must be type annotated, or Flow will complain!
  function BlueprintsRouter() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/api/v1/blueprints";

    _classCallCheck(this, BlueprintsRouter);

    // instantiate the express.Router
    this.router = (0, _express.Router)();
    this.path = path;
    // glue it all together
    this.init();
  }

  /**
   * Return all items in the inventory
   */


  _createClass(BlueprintsRouter, [{
    key: "getAll",
    value: function getAll(req, res) {
      res.status(200).json(_blueprints2.default);
    }
  }, {
    key: "getById",
    value: function getById(req, res) {
      var id = parseInt(req.params.id, 10);
      var blueprint = _blueprints2.default.find(function (item) {
        return item.id === id;
      });
      if (blueprint) {
        res.status(200).json({
          blueprint: blueprint
        });
      } else {
        res.status(404).json({});
      }
    }
  }, {
    key: "addBlueprint",
    value: function addBlueprint(req, res) {
      var received = parseProduce(req.body);
      var newProduce = received ? req.body : null;
    }
    /**
     * Attach route handlers to their endpoints.
     */

  }, {
    key: "init",
    value: function init() {
      this.router.get("/", this.getAll);
      this.router.get("/:id", this.getById);
    }
  }]);

  return BlueprintsRouter;
}();

exports.default = BlueprintsRouter;
//# sourceMappingURL=BlueprintsRouter.js.map
