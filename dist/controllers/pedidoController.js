"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = all;
exports.getPedidosUsuario = getPedidosUsuario;
exports.getPedidosDelivery = getPedidosDelivery;
exports.registrarPedido = registrarPedido;
exports.getPedidosPendientesParaDelivery = getPedidosPendientesParaDelivery;
exports.asignarPedidoADelivery = asignarPedidoADelivery;
exports.getPrecioEnvio = getPrecioEnvio;

var _Pedido = _interopRequireDefault(require("../models/Pedido"));

var _Producto = _interopRequireDefault(require("../models/Producto"));

var _Item = _interopRequireDefault(require("../models/Item"));

var _Service = require("../service/Service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function all(_x, _x2) {
  return _all.apply(this, arguments);
} //obtengo los pedidos de un usuario en especifico


function _all() {
  _all = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var pedidos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Pedido["default"].findAll({
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid']
            });

          case 3:
            pedidos = _context.sent;

            if (pedidos) {
              res.json({
                message: 'todos los pedidos registrados',
                pedidos: pedidos
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'no se pudo obtener los pedidos',
              data: _context.t0
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _all.apply(this, arguments);
}

function getPedidosUsuario(_x3, _x4) {
  return _getPedidosUsuario.apply(this, arguments);
} //obtengo los pedidos de usuario  delivery


function _getPedidosUsuario() {
  _getPedidosUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var idUsuario, pedidos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            idUsuario = req.params.idUsuario;
            _context2.prev = 1;
            _context2.next = 4;
            return _Pedido["default"].findAll({
              where: {
                ped_userid: idUsuario
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 4:
            pedidos = _context2.sent;

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

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json({
              message: 'algo no funciono 1',
              data: idusuario
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _getPedidosUsuario.apply(this, arguments);
}

function getPedidosDelivery(_x5, _x6) {
  return _getPedidosDelivery.apply(this, arguments);
} //registro el pedido pendiente


function _getPedidosDelivery() {
  _getPedidosDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var idDelivery, pedidos;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            idDelivery = req.params.idDelivery;
            _context3.prev = 1;
            _context3.next = 4;
            return _Pedido["default"].findAll({
              where: {
                ped_deliveryid: idDelivery
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 4:
            pedidos = _context3.sent;

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

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              message: 'algo no funciono',
              data: idDelivery
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _getPedidosDelivery.apply(this, arguments);
}

function registrarPedido(_x7, _x8) {
  return _registrarPedido.apply(this, arguments);
} //obtengo los pedidos pendientes cercanos.


function _registrarPedido() {
  _registrarPedido = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, iduser, diri, dirf, lati, longi, latf, longf, items, pesoxkm, iddelivery, total, envio, estadopedido, idpedido, nuevoPedido, i, numItems, stringJson, idProducto, cantidad, productFound, nuevoitem, value, pedidoUpdate;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, iduser = _req$body2.iduser, diri = _req$body2.diri, dirf = _req$body2.dirf, lati = _req$body2.lati, longi = _req$body2.longi, latf = _req$body2.latf, longf = _req$body2.longf, items = _req$body2.items;
            console.log(items);
            pesoxkm = 1;
            _context4.prev = 3;
            iddelivery = 0;
            total = 0;
            envio = 0; //estadopedido=1 pendiente       

            estadopedido = 1; //creo el pedido con total=0

            idpedido = 0;
            _context4.next = 11;
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

          case 11:
            nuevoPedido = _context4.sent;

            if (!nuevoPedido) {
              _context4.next = 36;
              break;
            }

            //obtengo el id pedido
            idpedido = nuevoPedido.ped_id;
            i = 0;
            numItems = items.length; //saco todos los items

          case 16:
            if (!(i < numItems)) {
              _context4.next = 31;
              break;
            }

            //saco el string del json
            stringJson = items[i]; //var stringJson = JSON.parse(items[i]);
            //console.log("Items"+stringJson)
            //valores id y cantidad

            idProducto = stringJson.id;
            cantidad = stringJson.cantidad;
            /*console.log("idproducto: "+idProducto)
            console.log("cantidad :"+cantidad)*/
            //busco los datos del producto

            _context4.next = 22;
            return _Producto["default"].findOne({
              where: {
                prod_id: idProducto
              },
              attributes: ['prod_value']
            });

          case 22:
            productFound = _context4.sent;

            if (!productFound) {
              _context4.next = 28;
              break;
            }

            _context4.next = 26;
            return _Item["default"].create({
              item_pedidoid: idpedido,
              item_productoid: idProducto,
              item_cantidad: cantidad
            }, {
              fields: ['item_pedidoid', 'item_productoid', 'item_cantidad']
            });

          case 26:
            nuevoitem = _context4.sent;

            if (nuevoitem) {
              value = productFound.prod_value;
              total += value * cantidad;
            }

          case 28:
            //incremento 
            i = i + 1;
            _context4.next = 16;
            break;

          case 31:
            envio = pesoxkm * parseInt((0, _Service.getKilometros)(latf, longf, lati, longi)); //hago el update del total del pedido  

            _context4.next = 34;
            return _Pedido["default"].update({
              ped_total: total,
              ped_envio: envio
            }, {
              where: {
                ped_id: idpedido
              }
            });

          case 34:
            pedidoUpdate = _context4.sent;

            if (pedidoUpdate) {
              //devuelvo el id pedido y el total
              console.log("Pedido registrado");
              /*res.json(
               {
                message:'Pedido Registrado Correctamente Estado Pendiente',
               idpedido,total,envio
               })*/

              res.json({
                message: 'Pedido Registrado Correctamente Estado Pendiente',
                data: pedidoUpdate
              });
            } else {
              console.log("Pedido NO registrado"); //devuelvo el id pedido y el total

              res.status(500).json({
                message: 'no se pudo hacer el update',
                data: {
                  error: error
                }
              });
            }

          case 36:
            _context4.next = 41;
            break;

          case 38:
            _context4.prev = 38;
            _context4.t0 = _context4["catch"](3);
            res.status(500).json({
              message: 'no se pudo registrar el pedido',
              data: _context4.t0
            });

          case 41:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 38]]);
  }));
  return _registrarPedido.apply(this, arguments);
}

function getPedidosPendientesParaDelivery(_x9, _x10) {
  return _getPedidosPendientesParaDelivery.apply(this, arguments);
} //asignacion de pedido a delivery


function _getPedidosPendientesParaDelivery() {
  _getPedidosPendientesParaDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body3, lati, longi, estadopedido, maxkms, pedidos, pedidoscercanos;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, lati = _req$body3.lati, longi = _req$body3.longi;
            estadopedido = 1;
            maxkms = 20;
            _context5.prev = 3;
            _context5.next = 6;
            return _Pedido["default"].findAll({
              where: {
                ped_estado: estadopedido
              },
              attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
            });

          case 6:
            pedidos = _context5.sent;

            if (pedidos) {
              //filtro los cercanos 
              pedidoscercanos = [];
              pedidos.forEach(function (ped) {
                var lat = ped.ped_latitudinicio;
                var _long = ped.ped_longitudinicio;

                if (parseInt((0, _Service.getKilometros)(lat, _long, lati, longi)) <= maxkms) {
                  pedidoscercanos.push(ped);
                }
              });
              res.json({
                message: 'pedidos pendientes son:',
                pedidoscercanos: pedidoscercanos
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros de pedidos.'
              });
            }

            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](3);
            res.status(500).json({
              message: 'algo no funciono',
              data: {
                error: _context5.t0
              }
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 10]]);
  }));
  return _getPedidosPendientesParaDelivery.apply(this, arguments);
}

function asignarPedidoADelivery(_x11, _x12) {
  return _asignarPedidoADelivery.apply(this, arguments);
}
/* obtengo el precio del envio antes de dar el ok o no al registro 
pedido*/


function _asignarPedidoADelivery() {
  _asignarPedidoADelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body4, idpedido, iddelivery, estadoPendiente, estadoAsignado, pedidosSinAsignar, pedidoUpdate;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body4 = req.body, idpedido = _req$body4.idpedido, iddelivery = _req$body4.iddelivery;
            estadoPendiente = 1;
            estadoAsignado = 2;
            _context6.prev = 3;
            _context6.next = 6;
            return _Pedido["default"].count({
              where: {
                ped_id: idpedido,
                ped_estado: estadoPendiente
              }
            });

          case 6:
            pedidosSinAsignar = _context6.sent;

            if (!(pedidosSinAsignar > 0)) {
              _context6.next = 14;
              break;
            }

            _context6.next = 10;
            return _Pedido["default"].update({
              ped_deliveryid: iddelivery,
              ped_estado: estadoAsignado
            }, {
              where: {
                ped_id: idpedido
              }
            });

          case 10:
            pedidoUpdate = _context6.sent;

            if (pedidoUpdate) {
              //devuelvo el id pedido y el delivery
              res.json({
                message: 'pedido asignado',
                idpedido: idpedido,
                iddelivery: iddelivery
              });
            } else {
              res.status(500).json({
                message: 'No se pudo asignar un pedido.'
              });
            }

            _context6.next = 15;
            break;

          case 14:
            res.status(500).json({
              message: 'El pedido ya fue asignado.'
            });

          case 15:
            _context6.next = 20;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](3);
            res.status(500).json({
              message: 'algo no funciono',
              data: {
                error: _context6.t0
              }
            });

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 17]]);
  }));
  return _asignarPedidoADelivery.apply(this, arguments);
}

function getPrecioEnvio(req, res) {
  var _req$body = req.body,
      lati = _req$body.lati,
      longi = _req$body.longi,
      latf = _req$body.latf,
      longf = _req$body.longf;
  var pesoxkm = 10;
  var kms = (0, _Service.getKilometros)(latf, longf, lati, longi);
  var envio = (0, _Service.getPrecioEnvioPorReglas)(1, 19, kms * pesoxkm, kms, 10, 1, 4343); //const re=  getPorcentajeEnvioPorReglas(0, 21, 500 ,11,1, 333);
  //console.log(re);

  res.json({
    message: 'valor envio',
    envio: envio
  });
}