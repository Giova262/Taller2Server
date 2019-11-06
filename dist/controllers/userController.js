"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = updateUser;
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

/** actualizar usuario */

function updateUser(_x, _x2) {
  return _updateUser.apply(this, arguments);
}
/** Obtener todos los Usuarios */


function _updateUser() {
  _updateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, id, nombre, mail, pass, rol, foto, redsocial;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, nombre = _req$body.nombre, mail = _req$body.mail, pass = _req$body.pass, rol = _req$body.rol, foto = _req$body.foto, redsocial = _req$body.redsocial;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            }).then(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(user) {
                var userChanged;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return user.update({
                          nombre: nombre,
                          mail: mail,
                          pass: pass,
                          rol: rol,
                          foto: foto,
                          redsocial: redsocial
                        });

                      case 2:
                        userChanged = _context.sent;
                        res.json({
                          message: 'Usuario Cambiado Success.'
                        });

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x24) {
                return _ref.apply(this, arguments);
              };
            }());

          case 4:
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes wrong on getAll patch',
              data: {
                error: _context2.t0
              }
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return _updateUser.apply(this, arguments);
}

function getAll(_x3, _x4) {
  return _getAll.apply(this, arguments);
}
/** Crear nuevo Usuario */


function _getAll() {
  _getAll = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var tests;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].findAll();

          case 3:
            tests = _context3.sent;

            if (tests) {
              res.json({
                message: 'Todos los usuarios registrados son:',
                data: tests
              });
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: 'Something goes wrong on getAll patch',
              data: {
                error: _context3.t0
              }
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _getAll.apply(this, arguments);
}

function register(_x5, _x6) {
  return _register.apply(this, arguments);
}
/** Login Usuarios */


function _register() {
  _register = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, nombre, pass, mail, rol, puntaje, nivel, foto, cantEnvios, redsocial, uidfirebase, nuevoUsuario, token;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, nombre = _req$body2.nombre, pass = _req$body2.pass, mail = _req$body2.mail, rol = _req$body2.rol, puntaje = _req$body2.puntaje, nivel = _req$body2.nivel, foto = _req$body2.foto, cantEnvios = _req$body2.cantEnvios, redsocial = _req$body2.redsocial, uidfirebase = _req$body2.uidfirebase;
            _context4.prev = 1;
            _context4.next = 4;
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
            nuevoUsuario = _context4.sent;

            if (nuevoUsuario) {
              token = _jsonwebtoken["default"].sign({
                nuevoUsuario: nuevoUsuario
              }, 'key');
              res.json({
                message: 'Usuario Creado.Login Success.',
                status: 1,
                token: token,
                dato: nuevoUsuario
              });
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              message: 'Ocurrio un Error al crear usuario',
              status: 0,
              data: {
                nombre: nombre,
                mail: mail,
                pass: pass
              },
              error: _context4.t0
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return _register.apply(this, arguments);
}

function login(_x7, _x8) {
  return _login.apply(this, arguments);
}
/** Rutas protegidas */


function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body3, mail, pass, rol, idToken, userFound, token;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body3 = req.body, mail = _req$body3.mail, pass = _req$body3.pass, rol = _req$body3.rol, idToken = _req$body3.idToken;

            if (!(idToken != -1)) {
              _context7.next = 5;
              break;
            }

            // .......El login fue desde una Red social. Verifico Token desde Firebase......................
            admin.auth().verifyIdToken(idToken).then(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(decodedToken) {
                var uid, userFound, token;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        //.....Obtengo el uid del usuario en Firebase......
                        uid = decodedToken.uid; //.....Busco el uid en mi base de datos............

                        _context6.prev = 1;
                        _context6.next = 4;
                        return _User["default"].findOne({
                          where: {
                            uidfirebase: uid,
                            rol: rol
                          },
                          attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
                        });

                      case 4:
                        userFound = _context6.sent;

                        if (userFound) {
                          //....Encontre al usuario y genero nuevo Token....
                          token = _jsonwebtoken["default"].sign({
                            userFound: userFound
                          }, 'key');
                          res.json({
                            message: 'Login Success.',
                            status: 1,
                            token: token,
                            dato: userFound
                          });
                        } else {
                          //....No Encontre usario Creo uno nuevo..........
                          admin.auth().getUser(uid).then(
                          /*#__PURE__*/
                          function () {
                            var _ref3 = _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee5(userRecord) {
                              var nombre, pass, mail, rol2, puntaje, nivel, foto, cantEnvios, redsocial, uidfirebase, nuevoUsuario, _token;

                              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                while (1) {
                                  switch (_context5.prev = _context5.next) {
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
                                      _context5.prev = 10;
                                      _context5.next = 13;
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
                                        fields: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
                                      });

                                    case 13:
                                      nuevoUsuario = _context5.sent;

                                      if (nuevoUsuario) {
                                        _token = _jsonwebtoken["default"].sign({
                                          nuevoUsuario: nuevoUsuario
                                        }, 'key');
                                        res.json({
                                          message: 'Usuario Creado.Login Success.',
                                          status: 1,
                                          token: _token,
                                          dato: nuevoUsuario
                                        });
                                      } else {
                                        res.json({
                                          message: 'Fallo al iniciar Sesion.Verifica Mail o Contraseña.',
                                          status: 0,
                                          token: "-1"
                                        });
                                      }

                                      _context5.next = 20;
                                      break;

                                    case 17:
                                      _context5.prev = 17;
                                      _context5.t0 = _context5["catch"](10);
                                      res.status(500).json({
                                        message: 'Ocurrio un Error al crear usuario',
                                        error: _context5.t0
                                      });

                                    case 20:
                                    case "end":
                                      return _context5.stop();
                                  }
                                }
                              }, _callee5, null, [[10, 17]]);
                            }));

                            return function (_x26) {
                              return _ref3.apply(this, arguments);
                            };
                          }())["catch"](function (error) {
                            console.log('Error fetching user data:', error);
                          });
                        }

                        _context6.next = 11;
                        break;

                      case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6["catch"](1);
                        res.status(500).json({
                          message: 'Something goes wrong222',
                          data: _context6.t0
                        });

                      case 11:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, null, [[1, 8]]);
              }));

              return function (_x25) {
                return _ref2.apply(this, arguments);
              };
            }())["catch"](function (error) {
              console.log('Error decodificar el Token :', error);
            });
            _context7.next = 15;
            break;

          case 5:
            _context7.prev = 5;
            _context7.next = 8;
            return _User["default"].findOne({
              where: {
                mail: mail,
                pass: pass,
                rol: rol
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 8:
            userFound = _context7.sent;

            if (userFound) {
              token = _jsonwebtoken["default"].sign({
                userFound: userFound
              }, 'key');
              res.json({
                message: 'Login Success.',
                status: 1,
                token: token,
                dato: userFound
              });
            } else {
              res.json({
                message: 'Fallo al iniciar Sesion.Verifica Mail o Contraseña.',
                status: 0,
                token: "-1"
              });
            }

            _context7.next = 15;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](5);
            res.status(500).json({
              message: 'Something goes wrong',
              data: _context7.t0
            });

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[5, 12]]);
  }));
  return _login.apply(this, arguments);
}

function consultaPerfil(_x9, _x10) {
  return _consultaPerfil.apply(this, arguments);
}

function _consultaPerfil() {
  _consultaPerfil = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
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
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _consultaPerfil.apply(this, arguments);
}

function chequeoToken(_x11, _x12, _x13) {
  return _chequeoToken.apply(this, arguments);
}
/** Verificacion token */


function _chequeoToken() {
  _chequeoToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res, next) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
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
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _chequeoToken.apply(this, arguments);
}

function ensureToken(_x14, _x15, _x16) {
  return _ensureToken.apply(this, arguments);
}
/** Obtener usuario por id */


function _ensureToken() {
  _ensureToken = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res, next) {
    var bearerHeader, bearer, bearerToken;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            bearerHeader = req.headers['token'];

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
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _ensureToken.apply(this, arguments);
}

function getOne(_x17, _x18, _x19) {
  return _getOne.apply(this, arguments);
}
/*todos los usuarios delivery para chatear de un usuario en pedido*/


function _getOne() {
  _getOne = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res, next) {
    var id, userFound;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            id = req.params.id;
            _context11.prev = 1;
            _context11.next = 4;
            return _User["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
            });

          case 4:
            userFound = _context11.sent;

            if (userFound) {
              res.json(userFound);
            } else {
              res.json({
                message: 'No se encuentra registrado el usuario.'
              });
            }

            _context11.next = 11;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](1);
            res.status(500).json({
              message: 'Something goes wrong ',
              data: {
                error: _context11.t0
              }
            });

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 8]]);
  }));
  return _getOne.apply(this, arguments);
}

function getDeliverysPorUsuario(_x20, _x21) {
  return _getDeliverysPorUsuario.apply(this, arguments);
}
/*todos los usuarios para chatear de un pedido de un delivery*/


function _getDeliverysPorUsuario() {
  _getDeliverysPorUsuario = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(req, res) {
    var iduser, sqlquery, usuarios;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            iduser = req.params.iduser;
            _context12.prev = 1;
            sqlquery = 'select Distinct(users.*) from users, pedidos where pedidos.ped_deliveryid=users.id and pedidos.ped_userid='.concat(iduser).concat(' ORDER BY users.nombre '); //res.json(sqlquery);

            _context12.next = 5;
            return _database.sequelize.query(sqlquery, {
              type: _database.sequelize.QueryTypes.SELECT
            });

          case 5:
            usuarios = _context12.sent;

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

            _context12.next = 12;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](1);
            res.status(500).json({
              message: 'hubo un error',
              data: {
                error: _context12.t0
              }
            });

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 9]]);
  }));
  return _getDeliverysPorUsuario.apply(this, arguments);
}

function getUsuariosPorDelivery(_x22, _x23) {
  return _getUsuariosPorDelivery.apply(this, arguments);
}

function _getUsuariosPorDelivery() {
  _getUsuariosPorDelivery = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(req, res) {
    var iddelivery, sqlquery, usuarios;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            iddelivery = req.params.iddelivery;
            _context13.prev = 1;
            sqlquery = 'select Distinct(users.*) from users, pedidos where pedidos.ped_userid=users.id and pedidos.ped_deliveryid='.concat(iddelivery).concat(' ORDER BY users.nombre ');
            _context13.next = 5;
            return _database.sequelize.query(sqlquery, {
              type: _database.sequelize.QueryTypes.SELECT
            });

          case 5:
            usuarios = _context13.sent;

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

            _context13.next = 12;
            break;

          case 9:
            _context13.prev = 9;
            _context13.t0 = _context13["catch"](1);
            res.status(500).json({
              message: 'hubo un error',
              data: {
                error: _context13.t0
              }
            });

          case 12:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 9]]);
  }));
  return _getUsuariosPorDelivery.apply(this, arguments);
}