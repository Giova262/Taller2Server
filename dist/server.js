"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _usuarios = _interopRequireDefault(require("./rutas/usuarios"));

var _productos = _interopRequireDefault(require("./rutas/productos"));

var _pedidos = _interopRequireDefault(require("./rutas/pedidos"));

var _comercios = _interopRequireDefault(require("./rutas/comercios"));

var _parametros = _interopRequireDefault(require("./rutas/parametros"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Configuracion del servidor */
//import morgan from 'morgan'
//app.use( morgan('dev') )

/** Inicializacion */
var app = (0, _express["default"])();
/** Middlewares */
//app.use(express.json())

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/
//app.use(require('connect').bodyParser());

app.use((0, _express.json)());
app.set('port', process.env.PORT || 5000);
/*cors*/

/** Rutas */

app.use('/api/user', _usuarios["default"]);
app.use('/api/producto', _productos["default"]);
app.use('/api/pedido', _pedidos["default"]);
app.use('/api/comercio', _comercios["default"]);
app.use('/api/parametro', _parametros["default"]);
app.get('/', function (req, res) {
  res.json({
    "mensaje": "Server Foodie ",
    "status": "Online",
    "puerto": app.get('port')
  });
});
/** Exporto */

var _default = app;
exports["default"] = _default;