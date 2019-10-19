"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Defino modelo de los datos */
var Pedido = _database.sequelize.define('pedido', {
  ped_id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  ped_userid: {
    type: _sequelize["default"].INTEGER
  },
  ped_deliveryid: {
    type: _sequelize["default"].INTEGER
  },
  ped_total: {
    type: _sequelize["default"].INTEGER
  },
  ped_envio: {
    type: _sequelize["default"].INTEGER
  },
  ped_direccioninicio: {
    type: _sequelize["default"].TEXT
  },
  ped_direcciondestino: {
    type: _sequelize["default"].TEXT
  },
  ped_latitudinicio: {
    type: _sequelize["default"].DOUBLE
  },
  ped_longitudinicio: {
    type: _sequelize["default"].DOUBLE
  },
  ped_latituddestino: {
    type: _sequelize["default"].DOUBLE
  },
  ped_longituddestino: {
    type: _sequelize["default"].DOUBLE
  },
  ped_descripcion: {
    type: _sequelize["default"].TEXT
  },
  ped_estado: {
    type: _sequelize["default"].INTEGER
  }
});

var _default = Pedido;
exports["default"] = _default;