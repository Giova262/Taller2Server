"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;
exports.register = register;
exports.login = login;
exports.consultaPerfil = consultaPerfil;
exports.chequeoToken = chequeoToken;
exports.ensureToken = ensureToken;
exports.getOne = getOne;
exports.getDeliverysPorUsuario = getDeliverysPorUsuario;
exports.getUsuariosPorDelivery = getUsuariosPorDelivery;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = require("../database/database");

var admin = _interopRequireWildcard(require("firebase-admin"));

var _myApplicationFoodieFirebaseAdminsdkYwqsl58550a4a = _interopRequireDefault(require("../../my-application-foodie-firebase-adminsdk-ywqsl-58550a4a21.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

admin.initializeApp({
  credential: admin.credential.cert(_myApplicationFoodieFirebaseAdminsdkYwqsl58550a4a["default"]),
  databaseURL: "https://my-application-foodie.firebaseio.com"
}); //...............................................................

/** Obtener todos los Usuarios */

function getAll(_x, _x2) {
  return _getAll.apply(this, arguments);
}
/** Crear nuevo Usuario */


function _getAll() {
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var tests;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findAll();

          case 3:
            tests = _context.sent;

            if (tests) {
              res.json({
                message: 'Todos los usuarios registrados son:',
                data: tests
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: 'Something goes wrong on getAll patch',
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

function register(_x3, _x4) {
  return _register.apply(this, arguments);
}
/** Login Usuarios */


function _register() {
  _register = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, nombre, pass, mail, rol, puntaje, nivel, foto, cantEnvios, redsocial, uidfirebase, nuevoUsuario, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, pass = _req$body.pass, mail = _req$body.mail, rol = _req$body.rol, puntaje = _req$body.puntaje, nivel = _req$body.nivel, foto = _req$body.foto, cantEnvios = _req$body.cantEnvios, redsocial = _req$body.redsocial, uidfirebase = _req$body.uidfirebase;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].create({
              nombre: nombre,
              pass: pass,
              mail: mail,
              rol: rol,
              puntaje: puntaje,
              nivel: nivel,
              foto: foto,
              cantEnvios: cantEnvios,
              redsocial: redsocial,
              uidfirebase: uidfirebase
            }, {
              fields: ['nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 4:
            nuevoUsuario = _context2.sent;

            if (nuevoUsuario) {
              token = _jsonwebtoken["default"].sign({
                nuevoUsuario: nuevoUsuario
              }, 'key');
              res.json({
                message: 'Usuario Creado.Login Success.',
                token: token
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json({
              message: 'Ocurrio un Error al crear usuario',
              data: {
                nombre: nombre,
                mail: mail,
                pass: pass
              },
              error: _context2.t0
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _register.apply(this, arguments);
}

function login(_x5, _x6) {
  return _login.apply(this, arguments);
}
/** Rutas protegidas */


function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, mail, pass, rol, idToken, userFound, token;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, mail = _req$body2.mail, pass = _req$body2.pass, rol = _req$body2.rol, idToken = _req$body2.idToken;

            if (!(idToken != -1)) {
              _context5.next = 5;
              break;
            }

            // .......El login fue desde una Red social. Verifico Token desde Firebase......................
            admin.auth().verifyIdToken(idToken).then(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4(decodedToken) {
                var uid, userFound, token;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        //.....Obtengo el uid del usuario en Firebase......
                        uid = decodedToken.uid; //.....Busco el uid en mi base de datos............

                        _context4.prev = 1;
                        _context4.next = 4;
                        return _User["default"].findOne({
                          where: {
                            uidfirebase: uid,
                            rol: rol
                          },
                          attributes: ['id', 'nombre', 'mail', 'pass']
                        });

                      case 4:
                        userFound = _context4.sent;

                        if (userFound) {
                          //....Encontre al usuario y genero nuevo Token....
                          token = _jsonwebtoken["default"].sign({
                            userFound: userFound
                          }, 'key');
                          res.json({
                            message: 'Login Success.',
                            status: 1,
                            token: token
                          });
                        } else {
                          //....No Encontre usario Creo uno nuevo..........
                          admin.auth().getUser(uid).then(
                          /*#__PURE__*/
                          function () {
                            var _ref2 = _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee3(userRecord) {
                              var nombre, pass, mail, rol2, puntaje, nivel, foto, cantEnvios, redsocial, uidfirebase, nuevoUsuario, _token;

                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                  switch (_context3.prev = _context3.next) {
                                    case 0:
                                      nombre = userRecord.toJSON().displayName;
                                      pass = 'pass123';
                                      mail = userRecord.toJSON().email;
                                      rol2 = rol;
                                      puntaje = 0;
                                      nivel = 0;
                                      foto = userRecord.toJSON().photoURL;
                                      cantEnvios = 0;
                                      redsocial = userRecord.toJSON().providerData[0].providerId;
                                      uidfirebase = uid;
                                      _context3.prev = 10;
                                      _context3.next = 13;
                                      return _User["default"].create({
                                        nombre: nombre,
                                        pass: pass,
                                        mail: mail,
                                        rol: rol2,
                                        puntaje: puntaje,
                                        nivel: nivel,
                                        foto: foto,
                                        cantEnvios: cantEnvios,
                                        redsocial: redsocial,
                                        uidfirebase: uidfirebase
                                      }, {
                                        fields: ['nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
                                      });

                                    case 13:
                                      nuevoUsuario = _context3.sent;

                                      if (nuevoUsuario) {
                                        _token = _jsonwebtoken["default"].sign({
                                          nuevoUsuario: nuevoUsuario
                                        }, 'key');
                                        res.json({
                                          message: 'Usuario Creado.Login Success.',
                                          status: 1,
                                          token: _token
                                        });
                                      } else {
                                        res.json({
                                          message: 'Fallo al iniciar Sesion.Verifica Mail o Contraseña.',
                                          status: 0,
                                          token: "-1"
                                        });
                                      }

                                      _context3.next = 20;
                                      break;

                                    case 17:
                                      _context3.prev = 17;
                                      _context3.t0 = _context3["catch"](10);
                                      res.status(500).json({
                                        message: 'Ocurrio un Error al crear usuario',
                                        error: _context3.t0
                                      });

                                    case 20:
                                    case "end":
                                      return _context3.stop();
                                  }
                                }
                              }, _callee3, null, [[10, 17]]);
                            }));

                            return function (_x23) {
                              return _ref2.apply(this, arguments);
                            };
                          }())["catch"](function (error) {
                            console.log('Error fetching user data:', error);
                          });
                        }

                        _context4.next = 11;
                        break;

                      case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4["catch"](1);
                        res.status(500).json({
                          message: 'Something goes wrong222',
                          data: _context4.t0
                        });

                      case 11:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, null, [[1, 8]]);
              }));

              return function (_x22) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (error) {
              console.log('Error decodificar el Token :', error);
            });
            _context5.next = 15;
            break;

          case 5:
            _context5.prev = 5;
            _context5.next = 8;
            return _User["default"].findOne({
              where: {
                mail: mail,
                pass: pass,
                rol: rol
              },
              attributes: ['id', 'nombre', 'mail', 'pass', 'rol']
            });

          case 8:
            userFound = _context5.sent;

            if (userFound) {
              token = _jsonwebtoken["default"].sign({
                userFound: userFound
              }, 'key');
              res.json({
                message: 'Login Success.',
                status: 1,
                token: token
              });
            } else {
              res.json({
                message: 'Fallo al iniciar Sesion.Verifica Mail o Contraseña.',
                status: 0,
                token: "-1"
              });
            }

            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](5);
            res.status(500).json({
              message: 'Something goes wrong',
              data: _context5.t0
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[5, 12]]);
  }));
  return _login.apply(this, arguments);
}

function consultaPerfil(_x7, _x8) {
  return _consultaPerfil.apply(this, arguments);
}

function _consultaPerfil() {
  _consultaPerfil = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _jsonwebtoken["default"].verify(req.token, 'key', function (err, data) {
              if (err) {
                res.json({
                  message: 'Acceso Denegado.'
                });
              } else {
                res.json({
                  message: 'Acceso a consulta de Perfil',
                  data: data //Son los datos del que se esta logeando

                });
              }
            });

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _consultaPerfil.apply(this, arguments);
}

function chequeoToken(_x9, _x10, _x11) {
  return _chequeoToken.apply(this, arguments);
}
/** Verificacion token */


function _chequeoToken() {
  _chequeoToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res, next) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _jsonwebtoken["default"].verify(req.token, 'key', function (err, data) {
              if (err) {
                res.json({
                  message: 'Acceso Denegado.'
                });
              } else {
                next();
              }
            });

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _chequeoToken.apply(this, arguments);
}

function ensureToken(_x12, _x13, _x14) {
  return _ensureToken.apply(this, arguments);
}
/** Obtener usuario por id */


function _ensureToken() {
  _ensureToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res, next) {
    var bearerHeader, bearer, bearerToken;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            bearerHeader = req.headers['authorization'];

            if (typeof bearerHeader !== 'undefined') {
              bearer = bearerHeader.split(" ");
              bearerToken = bearer[1];
              req.token = bearerToken;
              next();
            } else {
              res.json({
                message: 'Token null error'
              });
            }

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _ensureToken.apply(this, arguments);
}

function getOne(_x15, _x16, _x17) {
  return _getOne.apply(this, arguments);
}
/*todos los usuarios delivery para chatear de un usuario en pedido*/


function _getOne() {
  _getOne = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res, next) {
    var id, userFound;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id;
            _context9.prev = 1;
            _context9.next = 4;
            return _User["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'nombre', 'mail', 'pass']
            });

          case 4:
            userFound = _context9.sent;

            if (userFound) {
              res.json(userFound);
            } else {
              res.json({
                message: 'No se encuentra registrado el usuario.'
              });
            }

            _context9.next = 11;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);
            res.status(500).json({
              message: 'Something goes wrong ',
              data: {
                error: _context9.t0
              }
            });

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 8]]);
  }));
  return _getOne.apply(this, arguments);
}

function getDeliverysPorUsuario(_x18, _x19) {
  return _getDeliverysPorUsuario.apply(this, arguments);
}
/*todos los usuarios para chatear de un pedido de un delivery*/


function _getDeliverysPorUsuario() {
  _getDeliverysPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
    var iduser, sqlquery, usuarios;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            iduser = req.params.iduser;
            _context10.prev = 1;
            sqlquery = 'select Distinct(users.*) from users, pedidos where pedidos.ped_deliveryid=users.id and pedidos.ped_userid='.concat(iduser).concat(' ORDER BY users.nombre '); //res.json(sqlquery);

            _context10.next = 5;
            return _database.sequelize.query(sqlquery, {
              type: _database.sequelize.QueryTypes.SELECT
            });

          case 5:
            usuarios = _context10.sent;

            if (usuarios) {
              res.json({
                message: 'todos los usuarios delivery para chatear',
                usuarios: usuarios
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros.'
              });
            }

            _context10.next = 12;
            break;

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](1);
            res.status(500).json({
              message: 'hubo un error',
              data: {
                error: _context10.t0
              }
            });

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 9]]);
  }));
  return _getDeliverysPorUsuario.apply(this, arguments);
}

function getUsuariosPorDelivery(_x20, _x21) {
  return _getUsuariosPorDelivery.apply(this, arguments);
}

function _getUsuariosPorDelivery() {
  _getUsuariosPorDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res) {
    var iddelivery, sqlquery, usuarios;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            iddelivery = req.params.iddelivery;
            _context11.prev = 1;
            sqlquery = 'select Distinct(users.*) from users, pedidos where pedidos.ped_userid=users.id and pedidos.ped_deliveryid='.concat(iddelivery).concat(' ORDER BY users.nombre ');
            _context11.next = 5;
            return _database.sequelize.query(sqlquery, {
              type: _database.sequelize.QueryTypes.SELECT
            });

          case 5:
            usuarios = _context11.sent;

            if (usuarios) {
              res.json({
                message: 'todos los usuarios para chatear',
                usuarios: usuarios
              });
            } else {
              res.status(500).json({
                message: 'No se encontro registros.'
              });
            }

            _context11.next = 12;
            break;

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](1);
            res.status(500).json({
              message: 'hubo un error',
              data: {
                error: _context11.t0
              }
            });

          case 12:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 9]]);
  }));
  return _getUsuariosPorDelivery.apply(this, arguments);
}