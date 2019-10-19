"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* Defino modelo de los datos */
var Producto = _database.sequelize.define('productos', {
  prod_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  prod_value: {
    type: _sequelize["default"].INTEGER
  },
  prod_nombre: {
    type: _sequelize["default"].TEXT
  },
  prod_idcomercio: {
    type: _sequelize["default"].INTEGER
  },
  prod_descripcion: {
    type: _sequelize["default"].TEXT
  }
});

var _default = Producto;
exports["default"] = _default;