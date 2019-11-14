"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductosPorComercio = getProductosPorComercio;
exports.getAll = getAll;
exports.getProductosPorPedido = getProductosPorPedido;
exports.deleteProducto = deleteProducto;
exports.updateProducto = updateProducto;
exports.registrarProducto = registrarProducto;

var _Producto = _interopRequireDefault(require("../models/Producto"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*todos los productos de un comercio*/
function getProductosPorComercio(_x, _x2) {
  return _getProductosPorComercio.apply(this, arguments);
}
/** Obtener todos los productos */


function _getProductosPorComercio() {
  _getProductosPorComercio = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var idcomercio, productos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idcomercio = req.params.idcomercio;
            _context.prev = 1;
            _context.next = 4;
            return _Producto["default"].findAll({
              where: {
                prod_idcomercio: idcomercio
              }
            });

          case 4:
            productos = _context.sent;

            if (productos) {
              res.json({
                message: 'todos los productos registrados del comercio',
                data: productos
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros de productos.',
                data: {}
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(500).json({
              message: 'algo salio mal obteniendo los productos',
              data: {
                error: _context.t0
              }
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _getProductosPorComercio.apply(this, arguments);
}

function getAll(_x3, _x4) {
  return _getAll.apply(this, arguments);
}
/*todos los productos de un pedido*/


function _getAll() {
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var productos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Producto["default"].findAll();

          case 3:
            productos = _context2.sent;

            if (productos) {
              res.json({
                message: 'todos los productos registrados',
                productos: productos
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros de productos.'
              });
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'no se encontro ningun producto',
              data: {
                error: _context2.t0
              }
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _getAll.apply(this, arguments);
}

function getProductosPorPedido(_x5, _x6) {
  return _getProductosPorPedido.apply(this, arguments);
}

function _getProductosPorPedido() {
  _getProductosPorPedido = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var idpedido, sqlquery, productos;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            idpedido = req.params.idpedido;
            _context3.prev = 1;
            sqlquery = 'select productos.*  from items, productos where productos.prod_id=items.item_productoid and items.item_pedidoid='.concat(idpedido);
            _context3.next = 5;
            return _database.sequelize.query(sqlquery, {
              type: _database.sequelize.QueryTypes.SELECT
            });

          case 5:
            productos = _context3.sent;

            if (productos) {
              res.json({
                message: 'todos los productos para el pedido',
                productos: productos
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros de productos.'
              });
            }

            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              message: 'surgio un error',
              data: {
                error: _context3.t0
              }
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 9]]);
  }));
  return _getProductosPorPedido.apply(this, arguments);
}

function deleteProducto(_x7, _x8) {
  return _deleteProducto.apply(this, arguments);
}

function _deleteProducto() {
  _deleteProducto = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Producto["default"].destroy({
              where: {
                prod_id: id
              }
            }).then(function (deletedRecord) {
              if (deletedRecord === 1) {
                res.status(200).json({
                  message: "Se borro correctamente"
                });
              } else {
                res.status(404).json({
                  message: "no existe registo"
                });
              }
            });

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              message: 'Hubo un error',
              data: {
                error: _context4.t0
              }
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return _deleteProducto.apply(this, arguments);
}

function updateProducto(_x9, _x10) {
  return _updateProducto.apply(this, arguments);
}

function _updateProducto() {
  _updateProducto = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body, idproducto, valor, nombre, idcomercio, descrip;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, idproducto = _req$body.idproducto, valor = _req$body.valor, nombre = _req$body.nombre, idcomercio = _req$body.idcomercio, descrip = _req$body.descrip;
            _context5.prev = 1;
            _context5.next = 4;
            return _Producto["default"].find({
              where: {
                prod_id: idproducto
              }
            }).on('success', function (Producto) {
              // si el registro exite
              if (Producto) {
                Producto.update({
                  prod_value: valor,
                  prod_nombre: nombre,
                  prod_idcomercio: idcomercio,
                  prod_descripcion: descrip
                }).success(res.status(200).json({
                  message: "Se actualizo correctamente"
                })).error(function (err) {
                  return res.status(404).json({
                    message: 'Hubo un error al actualizar',
                    data: {
                      err: err
                    }
                  });
                });
              }
            });

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](1);
            res.status(500).json({
              message: 'Hubo un error',
              data: {
                error: _context5.t0
              }
            });

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 6]]);
  }));
  return _updateProducto.apply(this, arguments);
}

function registrarProducto(_x11, _x12) {
  return _registrarProducto.apply(this, arguments);
}

function _registrarProducto() {
  _registrarProducto = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body2, valor, nombre, idcomercio, descrip, nuevoProducto;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, valor = _req$body2.valor, nombre = _req$body2.nombre, idcomercio = _req$body2.idcomercio, descrip = _req$body2.descrip;
            _context6.prev = 1;
            _context6.next = 4;
            return _Producto["default"].create({
              prod_value: valor,
              prod_nombre: nombre,
              prod_idcomercio: idcomercio,
              prod_descripcion: descrip
            }, {
              fields: ['prod_value', 'prod_nombre', 'prod_idcomercio', 'prod_descripcion']
            });

          case 4:
            nuevoProducto = _context6.sent;

            if (!nuevoProducto) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.json({
              message: 'Producto creado.',
              data: nuevoProducto
            }));

          case 7:
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            res.status(500).json({
              message: 'Ocurrio un Error al crear producto',
              error: _context6.t0
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 9]]);
  }));
  return _registrarProducto.apply(this, arguments);
}