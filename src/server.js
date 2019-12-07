/** Configuracion del servidor */
import express , { json } from 'express'
import bodyParser from 'body-parser';
import rutasUsuario from './rutas/usuarios'
import rutasProductos from './rutas/productos'
import rutasPedidos from './rutas/pedidos'
import rutasComercios from './rutas/comercios'
import rutasParametros from './rutas/parametros'
import rutasEstadisticas from './rutas/estadisticas'

import cors from 'cors'

//import morgan from 'morgan'
//app.use( morgan('dev') )

/** Inicializacion */
const app = express()


/** Middlewares */
//app.use(express.json())
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

//app.use(require('connect').bodyParser());

app.use( json() )
app.set( 'port' , process.env.PORT || 5000 ) 

/*cors*/
app.use(cors())

/** Rutas */
app.use('/api/user',rutasUsuario)
app.use('/api/producto',rutasProductos)
app.use('/api/pedido',rutasPedidos)
app.use('/api/comercio',rutasComercios)
app.use('/api/parametro',rutasParametros)

app.get('/', function(req, res){
    res.json({

        "mensaje": "Server Foodie ",
        "status": "Online",
        "puerto": app.get('port')

    });
 });


/** Exporto */
export default app