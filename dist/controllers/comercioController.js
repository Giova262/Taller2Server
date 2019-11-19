"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOne = getOne;
exports.getAll = getAll;
exports.deleteComercio = deleteComercio;
exports.updateComercio = updateComercio;
exports.registrarComercio = registrarComercio;

var _Comercio = _interopRequireDefault(require("../models/Comercio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**Obtener un solo comercio */
function getOne(_x, _x2) {
  return _getOne.apply(this, arguments);
}
/** Obtener todos los comercios */


function _getOne() {
  _getOne = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var id, comercioFound;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.prev = 1;
            _context.next = 4;
            return _Comercio["default"].findOne({
              where: {
                com_id: id
              },
              attributes: ['com_nombre', 'com_direccion', 'com_descripcion', 'com_latitud', 'com_longitud', 'com_estado']
            });

          case 4:
            comercioFound = _context.sent;

            if (comercioFound) {
              res.json(comercioFound);
            } else {
              res.json({
                message: 'No se encuentra registrado el usuario.'
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(500).json({
              message: 'Something goes wrong ',
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
  return _getOne.apply(this, arguments);
}

function getAll(_x3, _x4) {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var comercios;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Comercio["default"].findAll();

          case 3:
            comercios = _context2.sent;

            if (comercios) {
              res.json({
                message: 'todos los comercios registrados',
                data: comercios
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros de comercios.',
                data: {}
              });
            }

            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: 'algo salio mal obteniendo los comercios',
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

function deleteComercio(_x5, _x6) {
  return _deleteComercio.apply(this, arguments);
}

function _deleteComercio() {
  _deleteComercio = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Comercio["default"].destroy({
              where: {
                com_id: id
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
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              message: 'Hubo un error',
              data: {
                error: _context3.t0
              }
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 6]]);
  }));
  return _deleteComercio.apply(this, arguments);
}

function updateComercio(_x7, _x8) {
  return _updateComercio.apply(this, arguments);
}

function _updateComercio() {
  _updateComercio = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _req$body, nombre, direccion, descrip, lat, _long, estado;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body = req.body, nombre = _req$body.nombre, direccion = _req$body.direccion, descrip = _req$body.descrip, lat = _req$body.lat, _long = _req$body["long"], estado = _req$body.estado;
            _context4.prev = 2;
            _context4.next = 5;
            return _Comercio["default"].find({
              where: {
                com_id: id
              }
            }).on('success', function (Comercio) {
              // si el registro exite
              if (Comercio) {
                Comercio.update({
                  com_nombre: nombre,
                  com_direccion: direccion,
                  com_descripcion: descrip,
                  com_latitud: lat,
                  com_longitud: _long,
                  com_estado: estado
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

          case 5:
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](2);
            res.status(500).json({
              message: 'Hubo un error',
              data: {
                error: _context4.t0
              }
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 7]]);
  }));
  return _updateComercio.apply(this, arguments);
}

function registrarComercio(_x9, _x10) {
  return _registrarComercio.apply(this, arguments);
}

function _registrarComercio() {
  _registrarComercio = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, nombre, direccion, descrip, lat, _long2, estado, nuevoComercio;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, nombre = _req$body2.nombre, direccion = _req$body2.direccion, descrip = _req$body2.descrip, lat = _req$body2.lat, _long2 = _req$body2["long"], estado = _req$body2.estado;
            _context5.prev = 1;
            _context5.next = 4;
            return _Comercio["default"].create({
              com_nombre: nombre,
              com_direccion: direccion,
              com_descripcion: descrip,
              com_latitud: lat,
              com_longitud: _long2,
              com_estado: estado
            }, {
              fields: ['com_nombre', 'com_direccion', 'com_descripcion', 'com_latitud', 'com_longitud', 'com_estado']
            });

          case 4:
            nuevoComercio = _context5.sent;

            if (!nuevoComercio) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.json({
              message: 'Producto creado.',
              data: nuevoComercio
            }));

          case 7:
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            res.status(500).json({
              message: 'Ocurrio un Error al crear comercio',
              error: _context5.t0
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 9]]);
  }));
  return _registrarComercio.apply(this, arguments);
}