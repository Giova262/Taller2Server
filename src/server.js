/** Configuracion del servidor */
import express , { json } from 'express'
import bodyParser from 'body-parser';
import rutasUsuario from './rutas/usuarios'
import rutasProductos from './rutas/productos'
import rutasPedidos from './rutas/pedidos'
import rutasComercios from './rutas/comercios'
import rutasParametros from './rutas/parametros'
import cors from 'cors'


/** Inicializacion */
const app = express()


/** Middlewares */
//app.use(bodyParser)
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