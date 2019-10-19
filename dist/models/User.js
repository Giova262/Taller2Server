"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Defino modelo de los datos */
var Test = _database.sequelize.define('users', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  nombre: {
    type: _sequelize["default"].TEXT
  },
  pass: {
    type: _sequelize["default"].TEXT
  },
  mail: {
    type: _sequelize["default"].TEXT
  },
  rol: {
    type: _sequelize["default"].INTEGER
  },
  puntaje: {
    type: _sequelize["default"].INTEGER
  },
  nivel: {
    type: _sequelize["default"].INTEGER
  },
  foto: {
    type: _sequelize["default"].TEXT
  },
  cantEnvios: {
    type: _sequelize["default"].INTEGER
  },
  redsocial: {
    type: _sequelize["default"].TEXT
  },
  uidfirebase: {
    type: _sequelize["default"].TEXT
  }
});

var _default = Test;
exports["default"] = _default;