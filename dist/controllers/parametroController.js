"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.deleteParametro = deleteParametro;
exports.updateParametro = updateParametro;
exports.registrarParametro = registrarParametro;

var _Parametro = _interopRequireDefault(require("../models/Parametro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/** Obtener todos los comercios */
function getAll(_x, _x2) {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var parametros;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Parametro["default"].findAll();

          case 3:
            parametros = _context.sent;

            if (parametros) {
              res.json({
                message: 'todos los parametros registrados',
                parametros: parametros
              }); //res.json(['John', 'Betty', 'Hal']);
            } else {
              res.status(500).json({
                message: 'No se encontro registros de parametros.'
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'algo salio mal obteniendo los parametros',
              data: {
                error: _context.t0
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getAll.apply(this, arguments);
}

function deleteParametro(_x3, _x4) {
  return _deleteParametro.apply(this, arguments);
}

function _deleteParametro() {
  _deleteParametro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var nombre;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nombre = req.params.nombre;
            _context2.prev = 1;
            _context2.next = 4;
            return _Parametro["default"].destroy({
              where: {
                par_nombre: nombre
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
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json({
              message: 'Hubo un error',
              data: {
                error: _context2.t0
              }
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return _deleteParametro.apply(this, arguments);
}

function updateParametro(_x5, _x6) {
  return _updateParametro.apply(this, arguments);
}

function _updateParametro() {
  _updateParametro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, nombre, value;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, value = _req$body.value;
            _context3.prev = 1;
            _context3.next = 4;
            return _Parametro["default"].findOne({
              where: {
                par_nombre: nombre
              }
            }).on('success', function (Parametro) {
              // si el registro exite
              if (Parametro) {
                Parametro.update({
                  par_value: value
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
  return _updateParametro.apply(this, arguments);
}

function registrarParametro(_x7, _x8) {
  return _registrarParametro.apply(this, arguments);
}

function _registrarParametro() {
  _registrarParametro = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, nombre, value, nuevoParametro;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, nombre = _req$body2.nombre, value = _req$body2.value;
            _context4.prev = 1;
            _context4.next = 4;
            return _Parametro["default"].create({
              par_nombre: nombre,
              par_value: value
            }, {
              fields: ['par_nombre', 'par_value']
            });

          case 4:
            nuevoParametro = _context4.sent;

            if (!nuevoParametro) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: 'Parametro creado.',
              data: nuevoParametro
            }));

          case 7:
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              message: 'Ocurrio un Error al crear parametro',
              error: _context4.t0
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));
  return _registrarParametro.apply(this, arguments);
}