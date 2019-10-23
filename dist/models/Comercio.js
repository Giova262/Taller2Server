"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* Defino modelo de los datos */
var Comercio = _database.sequelize.define('comercio', {
  com_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  com_nombre: {
    type: _sequelize["default"].TEXT
  },
  com_direccion: {
    type: _sequelize["default"].TEXT
  },
  com_descripcion: {
    type: _sequelize["default"].TEXT
  },
  com_latitud: {
    type: _sequelize["default"].DOUBLE
  },
  com_longitud: {
    type: _sequelize["default"].DOUBLE
  },
  com_estado: {
    type: _sequelize["default"].INTEGER
  }
});

var _default = Comercio;
exports["default"] = _default;