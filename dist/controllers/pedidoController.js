"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePedido = updatePedido;
exports.all = all;
exports.getPedidosUsuario = getPedidosUsuario;
exports.getPedidosDelivery = getPedidosDelivery;
exports.getPedidosHistorialDelivery = getPedidosHistorialDelivery;
exports.registrarPedido = registrarPedido;
exports.getPedidosPendientesParaDelivery = getPedidosPendientesParaDelivery;
exports.asignarPedidoADelivery = asignarPedidoADelivery;
exports.getPrecioEnvio = getPrecioEnvio;
exports.getPorcentajeDelivery = getPorcentajeDelivery;
exports.deletePedido = deletePedido;

var _Pedido = _interopRequireDefault(require("../models/Pedido"));

var _Producto = _interopRequireDefault(require("../models/Producto"));

var _User = _interopRequireDefault(require("../models/User"));

var _Item = _interopRequireDefault(require("../models/Item"));

var _Parametro = _interopRequireDefault(require("../models/Parametro"));

var _Service = require("../service/Service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function updatePedido(_x, _x2) {
  return _updatePedido.apply(this, arguments);
} // todos los pedidos sin ningun filtro.


function _updatePedido() {
  _updatePedido = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, ped_id, ped_userid, estado;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, ped_id = _req$body.ped_id, ped_userid = _req$body.ped_userid, estado = _req$body.estado;
            _context3.prev = 1;
            _context3.next = 4;
            return _Pedido["default"].findOne({
              where: {
                ped_id: ped_id,
                ped_userid: ped_userid
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            }).then(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(pedido) {
                var pedidoChanged;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return pedido.update({
                          ped_estado: 3
                        });

                      case 2:
                        pedidoChanged = _context2.sent;
                        _context2.prev = 3;
                        _context2.next = 6;
                        return _User["default"].findOne({
                          where: {
                            id: pedido.ped_deliveryid
                          },
                          attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
                        }).then(
                        /*#__PURE__*/
                        function () {
                          var _ref2 = _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee(user) {
                            var nuevoPuntaje, nuevoLevel, userChanged;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    nuevoPuntaje = user.puntaje + 100;
                                    nuevoLevel = user.nivel;

                                    if (nuevoPuntaje >= 1000) {
                                      nuevoLevel = nuevoLevel + 1;
                                      nuevoPuntaje = 0;
                                    }

                                    _context.next = 5;
                                    return user.update({
                                      puntaje: nuevoPuntaje,
                                      nivel: nuevoLevel
                                    });

                                  case 5:
                                    userChanged = _context.sent;
                                    res.json({
                                      message: 'Usuario Cambiado Success.'
                                    });

                                  case 7:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));

                          return function (_x24) {
                            return _ref2.apply(this, arguments);
                          };
                        }());

                      case 6:
                        _context2.next = 12;
                        break;

                      case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2["catch"](3);
                        console.log(_context2.t0);
                        res.status(500).json({
                          message: 'No pudo actualizar al deliery',
                          data: {
                            error: _context2.t0
                          }
                        });

                      case 12:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[3, 8]]);
              }));

              return function (_x23) {
                return _ref.apply(this, arguments);
              };
            }());

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              message: 'Something goes wrong on getAll patch',
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
  return _updatePedido.apply(this, arguments);
}

function all(_x3, _x4) {
  return _all.apply(this, arguments);
} //obtengo los pedidos de un usuario en especifico


function _all() {
  _all = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var pedidos;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Pedido["default"].findAll({
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid']
            });

          case 3:
            pedidos = _context4.sent;

            if (pedidos) {
              res.json({
                message: 'todos los pedidos registrados',
                pedidos: pedidos
              });
            }

            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: 'no se pudo obtener los pedidos',
              data: _context4.t0
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _all.apply(this, arguments);
}

function getPedidosUsuario(_x5, _x6) {
  return _getPedidosUsuario.apply(this, arguments);
} //obtengo los pedidos de usuario  delivery


function _getPedidosUsuario() {
  _getPedidosUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var idUsuario, pedidos;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            idUsuario = req.params.idUsuario;
            _context5.prev = 1;
            _context5.next = 4;
            return _Pedido["default"].findAll({
              where: {
                ped_userid: idUsuario
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 4:
            pedidos = _context5.sent;

            if (pedidos) {
              res.json({
                message: 'pedidos del usuario',
                pedidos: pedidos
              });
            } else {
              res.json({
                message: 'No se encontro registros de pedidos.'
              });
            }

            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.status(500).json({
              message: 'algo no funciono 1',
              data: idusuario
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return _getPedidosUsuario.apply(this, arguments);
}

function getPedidosDelivery(_x7, _x8) {
  return _getPedidosDelivery.apply(this, arguments);
} //Historial de pedidos entregados por un delivery en especifico


function _getPedidosDelivery() {
  _getPedidosDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var idDelivery, pedidos;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            idDelivery = req.params.idDelivery;
            _context6.prev = 1;
            _context6.next = 4;
            return _Pedido["default"].findAll({
              where: {
                ped_deliveryid: idDelivery,
                ped_estado: 2
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 4:
            pedidos = _context6.sent;

            if (pedidos) {
              res.json({
                message: 'pedidos del delivery',
                pedidos: pedidos
              });
            } else {
              res.json({
                message: 'No se encontro registros de pedidos.'
              });
            }

            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            res.status(500).json({
              message: 'algo no funciono',
              data: idDelivery
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return _getPedidosDelivery.apply(this, arguments);
}

function getPedidosHistorialDelivery(_x9, _x10) {
  return _getPedidosHistorialDelivery.apply(this, arguments);
} //registro el pedido pendiente


function _getPedidosHistorialDelivery() {
  _getPedidosHistorialDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var idDelivery, pedidos;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            idDelivery = req.params.idDelivery;
            _context7.prev = 1;
            _context7.next = 4;
            return _Pedido["default"].findAll({
              where: {
                ped_deliveryid: idDelivery,
                ped_estado: 3
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 4:
            pedidos = _context7.sent;

            if (pedidos) {
              res.json({
                message: 'pedidos del delivery',
                pedidos: pedidos
              });
            } else {
              res.json({
                message: 'No se encontro registros de pedidos.'
              });
            }

            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);
            res.status(500).json({
              message: 'algo no funciono',
              data: idDelivery
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 8]]);
  }));
  return _getPedidosHistorialDelivery.apply(this, arguments);
}

function registrarPedido(_x11, _x12) {
  return _registrarPedido.apply(this, arguments);
} //obtengo los pedidos pendientes cercanos.


function _registrarPedido() {
  _registrarPedido = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var _req$body2, iduser, diri, dirf, lati, longi, latf, longf, items, iddelivery, total, envio, estadopedido, idpedido, nuevoPedido, i, numItems, stringJson, idProducto, cantidad, productFound, nuevoitem, value, usr, peso_kms, param, nivel, cantEnvios, puntaje, kms, date, currenthour, currentnumberday, pedidoUpdate;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$body2 = req.body, iduser = _req$body2.iduser, diri = _req$body2.diri, dirf = _req$body2.dirf, lati = _req$body2.lati, longi = _req$body2.longi, latf = _req$body2.latf, longf = _req$body2.longf, items = _req$body2.items;
            _context8.prev = 1;
            iddelivery = 0;
            total = 0;
            envio = 0; //estadopedido=1 pendiente       

            estadopedido = 1; //creo el pedido con total=0

            idpedido = 0;
            _context8.next = 9;
            return _Pedido["default"].create({
              ped_userid: iduser,
              ped_deliveryid: iddelivery,
              ped_total: total,
              ped_envio: envio,
              ped_direccioninicio: diri,
              ped_direcciondestino: dirf,
              ped_latitudinicio: lati,
              ped_longitudinicio: longi,
              ped_latituddestino: latf,
              ped_longituddestino: longf,
              ped_estado: estadopedido
            }, {
              fields: ['ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 9:
            nuevoPedido = _context8.sent;

            if (!nuevoPedido) {
              _context8.next = 54;
              break;
            }

            //obtengo el id pedido
            idpedido = nuevoPedido.ped_id;
            i = 0;
            numItems = items.length; //saco todos los items

          case 14:
            if (!(i < numItems)) {
              _context8.next = 29;
              break;
            }

            //saco el string del json
            stringJson = items[i]; //valores id y cantidad

            idProducto = stringJson.id;
            cantidad = stringJson.cantidad; //busco los datos del producto

            _context8.next = 20;
            return _Producto["default"].findOne({
              where: {
                prod_id: idProducto
              },
              attributes: ['prod_value']
            });

          case 20:
            productFound = _context8.sent;

            if (!productFound) {
              _context8.next = 26;
              break;
            }

            _context8.next = 24;
            return _Item["default"].create({
              item_pedidoid: idpedido,
              item_productoid: idProducto,
              item_cantidad: cantidad
            }, {
              fields: ['item_pedidoid', 'item_productoid', 'item_cantidad']
            });

          case 24:
            nuevoitem = _context8.sent;

            if (nuevoitem) {
              value = productFound.prod_value;
              total += value * cantidad;
            }

          case 26:
            //incremento 
            i = i + 1;
            _context8.next = 14;
            break;

          case 29:
            envio = 0;
            _context8.next = 32;
            return _User["default"].findOne({
              where: {
                id: iduser
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 32:
            usr = _context8.sent;

            if (!usr) {
              _context8.next = 48;
              break;
            }

            peso_kms = 5;
            _context8.next = 37;
            return _Parametro["default"].findOne({
              where: {
                par_nombre: 'pesos_km'
              },
              attributes: ['par_id', 'par_nombre', 'par_value']
            });

          case 37:
            param = _context8.sent;
            if (param) peso_kms = param.par_value;
            nivel = usr.nivel;
            cantEnvios = usr.cantEnvios;
            puntaje = usr.points;
            kms = (0, _Service.getKilometros)(latf, longf, lati, longi);
            date = new Date();
            currenthour = date.getHours();
            currentnumberday = date.getDay();
            kms = (0, _Service.getKilometros)(latf, longf, lati, longi);
            envio = (0, _Service.getPrecioEnvioPorReglas)(currentnumberday, currenthour, kms * peso_kms, kms, cantEnvios, nivel, puntaje);

          case 48:
            total = parseInt(total);
            envio = parseInt(envio); //hago el update del total del pedido  

            _context8.next = 52;
            return _Pedido["default"].update({
              ped_total: total,
              ped_envio: envio
            }, {
              where: {
                ped_id: idpedido
              }
            });

          case 52:
            pedidoUpdate = _context8.sent;

            if (pedidoUpdate) {
              res.json({
                message: 'Pedido Registrado Correctamente Estado Pendiente',
                data: pedidoUpdate
              });
            } else {
              //devuelvo el id pedido y el total
              res.status(500).json({
                message: 'no se pudo hacer el update',
                data: {
                  error: error
                }
              });
            }

          case 54:
            _context8.next = 59;
            break;

          case 56:
            _context8.prev = 56;
            _context8.t0 = _context8["catch"](1);
            res.status(500).json({
              message: 'no se pudo registrar el pedido',
              data: _context8.t0
            });

          case 59:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 56]]);
  }));
  return _registrarPedido.apply(this, arguments);
}

function getPedidosPendientesParaDelivery(_x13, _x14) {
  return _getPedidosPendientesParaDelivery.apply(this, arguments);
} //asignacion de pedido a delivery


function _getPedidosPendientesParaDelivery() {
  _getPedidosPendientesParaDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var _req$params, lati, longi, estadopedido, pedidos, maxkms, param, pedidoscercanos;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$params = req.params, lati = _req$params.lati, longi = _req$params.longi;
            estadopedido = 1;
            _context9.prev = 2;
            _context9.next = 5;
            return _Pedido["default"].findAll({
              where: {
                ped_estado: estadopedido
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 5:
            pedidos = _context9.sent;

            if (!pedidos) {
              _context9.next = 17;
              break;
            }

            maxkms = 20;
            _context9.next = 10;
            return _Parametro["default"].findOne({
              where: {
                par_nombre: 'maxkms'
              },
              attributes: ['par_id', 'par_nombre', 'par_value']
            });

          case 10:
            param = _context9.sent;

            if (param) {
              maxkms = param.par_value;
            } //filtro los cercanos 


            pedidoscercanos = [];
            pedidos.forEach(function (ped) {
              var lat = parseFloat(ped.ped_latitudinicio);

              var _long = parseFloat(ped.ped_longitudinicio);

              if (parseFloat((0, _Service.getKilometros)(lat, _long, lati, longi)) <= maxkms) {
                pedidoscercanos.push(ped);
              }
            });
            res.json({
              message: 'pedidos pendientes son:',
              pedidoscercanos: pedidoscercanos
            });
            _context9.next = 18;
            break;

          case 17:
            res.status(500).json({
              message: 'No se encontro registros de pedidos.'
            });

          case 18:
            _context9.next = 23;
            break;

          case 20:
            _context9.prev = 20;
            _context9.t0 = _context9["catch"](2);
            res.status(500).json({
              message: 'algo no funciono',
              data: {
                error: _context9.t0
              }
            });

          case 23:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 20]]);
  }));
  return _getPedidosPendientesParaDelivery.apply(this, arguments);
}

function asignarPedidoADelivery(_x15, _x16) {
  return _asignarPedidoADelivery.apply(this, arguments);
}
/*obtengo el precio del envio con las reglas*/


function _asignarPedidoADelivery() {
  _asignarPedidoADelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
    var _req$body3, idpedido, iddelivery, estadoPendiente, estadoAsignado, pedidosSinAsignar, pedidoUpdate;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _req$body3 = req.body, idpedido = _req$body3.idpedido, iddelivery = _req$body3.iddelivery;
            estadoPendiente = 1;
            estadoAsignado = 2;
            _context10.prev = 3;
            _context10.next = 6;
            return _Pedido["default"].count({
              where: {
                ped_id: idpedido,
                ped_estado: estadoPendiente
              }
            });

          case 6:
            pedidosSinAsignar = _context10.sent;

            if (!(pedidosSinAsignar > 0)) {
              _context10.next = 14;
              break;
            }

            _context10.next = 10;
            return _Pedido["default"].update({
              ped_deliveryid: iddelivery,
              ped_estado: estadoAsignado
            }, {
              where: {
                ped_id: idpedido
              }
            });

          case 10:
            pedidoUpdate = _context10.sent;

            if (pedidoUpdate) {
              //devuelvo el id pedido y el delivery
              res.json({
                message: 'Pedido asignado',
                idpedido: idpedido,
                iddelivery: iddelivery
              });
            } else {
              res.status(500).json({
                message: 'No se pudo asignar un pedido.'
              });
            }

            _context10.next = 15;
            break;

          case 14:
            res.status(500).json({
              message: 'El pedido ya fue asignado.'
            });

          case 15:
            _context10.next = 20;
            break;

          case 17:
            _context10.prev = 17;
            _context10.t0 = _context10["catch"](3);
            res.status(500).json({
              message: 'algo no funciono',
              data: {
                error: _context10.t0
              }
            });

          case 20:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[3, 17]]);
  }));
  return _asignarPedidoADelivery.apply(this, arguments);
}

function getPrecioEnvio(_x17, _x18) {
  return _getPrecioEnvio.apply(this, arguments);
}
/*obtengo el porcentaje del envio para el delivery 
*/


function _getPrecioEnvio() {
  _getPrecioEnvio = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res) {
    var _req$body4, idusuario, lati, longi, latf, longf, usuario, peso_kms, param, nivel, cantEnvios, puntaje, kms, date, currenthour, currentnumberday, envio;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _req$body4 = req.body, idusuario = _req$body4.idusuario, lati = _req$body4.lati, longi = _req$body4.longi, latf = _req$body4.latf, longf = _req$body4.longf;
            _context11.prev = 1;
            _context11.next = 4;
            return Usuario.findOne({
              where: {
                id: idusuario
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 4:
            usuario = _context11.sent;

            if (!usuario) {
              _context11.next = 23;
              break;
            }

            peso_kms = 5;
            _context11.next = 9;
            return _Parametro["default"].findOne({
              where: {
                par_nombre: 'pesos_km'
              },
              attributes: ['par_id', 'par_nombre', 'par_value']
            });

          case 9:
            param = _context11.sent;
            if (param) peso_kms = param.par_value;
            nivel = usuario.nivel;
            cantEnvios = usuario.cantEnvios;
            puntaje = usuario.points;
            kms = (0, _Service.getKilometros)(latf, longf, lati, longi);
            date = new Date();
            currenthour = date.getHours();
            currentnumberday = date.getDay();
            kms = (0, _Service.getKilometros)(latf, longf, lati, longi);
            envio = (0, _Service.getPrecioEnvioPorReglas)(currentnumberday, currenthour, kms * peso_kms, kms, cantEnvios, nivel, puntaje);
            res.json({
              message: 'valor envio',
              envio: envio
            });
            _context11.next = 24;
            break;

          case 23:
            res.status(500).json({
              message: 'No se encontro el usuario.'
            });

          case 24:
            _context11.next = 29;
            break;

          case 26:
            _context11.prev = 26;
            _context11.t0 = _context11["catch"](1);
            res.status(500).json({
              message: '',
              data: {
                error: _context11.t0
              }
            });

          case 29:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 26]]);
  }));
  return _getPrecioEnvio.apply(this, arguments);
}

function getPorcentajeDelivery(_x19, _x20) {
  return _getPorcentajeDelivery.apply(this, arguments);
}

function _getPorcentajeDelivery() {
  _getPorcentajeDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(req, res) {
    var _req$body5, idusuario, iddelivery, lati, longi, latf, longf, usuarioCliente, usuarioDelivery, peso_kms, param, nivelCliente, cantEnviosCliente, puntajeCliente, nivelDelivery, cantEnviosDelivery, puntajeDelivery, kms, date, currenthour, currentnumberday, envio, porcentaje;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _req$body5 = req.body, idusuario = _req$body5.idusuario, iddelivery = _req$body5.iddelivery, lati = _req$body5.lati, longi = _req$body5.longi, latf = _req$body5.latf, longf = _req$body5.longf;
            _context12.prev = 1;
            _context12.next = 4;
            return Usuario.findOne({
              where: {
                id: idusuario
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 4:
            usuarioCliente = _context12.sent;
            _context12.next = 7;
            return Usuario.findOne({
              where: {
                id: iddelivery
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 7:
            usuarioDelivery = _context12.sent;

            if (!(usuarioCliente && usuarioDelivery)) {
              _context12.next = 29;
              break;
            }

            peso_kms = 5;
            _context12.next = 12;
            return _Parametro["default"].findOne({
              where: {
                par_nombre: 'pesos_km'
              },
              attributes: ['par_id', 'par_nombre', 'par_value']
            });

          case 12:
            param = _context12.sent;
            if (param) peso_kms = param.par_value;
            nivelCliente = usuarioCliente.nivel;
            cantEnviosCliente = usuarioCliente.cantEnvios;
            puntajeCliente = usuarioCliente.points;
            nivelDelivery = usuarioDelivery.nivel;
            cantEnviosDelivery = usuarioDelivery.cantEnvios;
            puntajeDelivery = usuarioDelivery.points;
            kms = (0, _Service.getKilometros)(latf, longf, lati, longi);
            date = new Date();
            currenthour = date.getHours();
            currentnumberday = date.getDay();
            envio = (0, _Service.getPrecioEnvioPorReglas)(currentnumberday, currenthour, kms * peso_kms, kms, cantEnviosCliente, nivelCliente, puntajeCliente);
            porcentaje = (0, _Service.getPorcentajeEnvioPorReglas)(currentnumberday, currenthour, envio, cantEnviosDelivery, nivelDelivery, puntajeDelivery);
            res.json({
              message: 'valor porcentaje',
              porcentaje: porcentaje,
              envio: envio
            });
            _context12.next = 30;
            break;

          case 29:
            if (!usuarioCliente && !usuarioDelivery) {
              res.status(500).json({
                message: 'No se encontro el usuario cliente y delivery.'
              });
            } else if (!usuarioCliente) {
              res.status(500).json({
                message: 'No se encontro el usuario cliente.'
              });
            } else {
              res.status(500).json({
                message: 'No se encontro el usuario delivery.'
              });
            }

          case 30:
            _context12.next = 35;
            break;

          case 32:
            _context12.prev = 32;
            _context12.t0 = _context12["catch"](1);
            res.status(500).json({
              message: 'algo no funciono',
              data: {
                error: _context12.t0
              }
            });

          case 35:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 32]]);
  }));
  return _getPorcentajeDelivery.apply(this, arguments);
}

function deletePedido(_x21, _x22) {
  return _deletePedido.apply(this, arguments);
}

function _deletePedido() {
  _deletePedido = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            id = req.paramsparams.id;
            _context13.prev = 1;
            _context13.next = 4;
            return _Item["default"].destroy({
              where: {
                item_pedidoid: id
              }
            });

          case 4:
            _context13.next = 6;
            return _Pedido["default"].destroy({
              where: {
                ped_id: id
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

          case 6:
            _context13.next = 11;
            break;

          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13["catch"](1);
            res.status(500).json({
              message: 'Hubo un error',
              data: {
                error: _context13.t0
              }
            });

          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 8]]);
  }));
  return _deletePedido.apply(this, arguments);
}