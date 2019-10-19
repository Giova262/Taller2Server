"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* Defino modelo de los datos */
var Item = _database.sequelize.define('item', {
  item_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  item_pedidoid: {
    type: _sequelize["default"].INTEGER
  },
  item_productoid: {
    type: _sequelize["default"].INTEGER
  },
  item_cantidad: {
    type: _sequelize["default"].INTEGER
  },
  item_descripcion: {
    type: _sequelize["default"].TEXT
  }
});

var _default = Item;
exports["default"] = _default;