"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* Defino modelo de los datos */
var Parametro = _database.sequelize.define('parametros', {
  par_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  par_nombre: {
    type: _sequelize["default"].TEXT
  },
  par_value: {
    type: _sequelize["default"].TEXT
  }
});

var _default = Parametro;
exports["default"] = _default;