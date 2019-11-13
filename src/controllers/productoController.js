import Producto from '../models/Producto';
import {sequelize} from '../database/database';

/*todos los productos de un comercio*/
export async function getProductosPorComercio(req,res)
{
    var {idcomercio} = req.params;
try {

        let productos = await Producto.findAll({
            where: {
                     prod_idcomercio:idcomercio
                    }
                  });
  
        if(productos){

           res.json({

                message:'todos los productos registrados del comercio',
                data:productos

            });

        }
        else{
            res.status(500).json({
                message:'No se encontro registros de productos.',
                data : {}

            })
        }
       
     
      } catch (error) {
          res.status(500).json({
              message:'algo salio mal obteniendo los productos',
              data:{error}
          });
      }
}

/** Obtener todos los productos */
export async function getAll(req,res){

    try {

        let productos = await Producto.findAll();
        
        if( productos){

           res.json({

                message:'todos los productos registrados',
                productos

            });
        }
        else{
            res.status(500).json({
                message:'No se encontro registros de productos.'      
            })
        }
       
  
      } catch (error) {
          res.status(500).json({
              message:'no se encontro ningun producto',
              data:{error}
          });
      } 
}


/*todos los productos de un pedido*/
export async function getProductosPorPedido(req,res)
{
var {idpedido} = req.params;
try{
var sqlquery= 'select productos.*  from items, productos where productos.prod_id=items.item_productoid and items.item_pedidoid='.concat(idpedido);

let productos  =  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT})
    
 if(productos){

           res.json({

                message:'todos los productos para el pedido',
                productos

            });
        }
        else{
            res.status(500).json({
                message:'No se encontro registros de productos.'      
            })
        }
       
  
      } catch (error) {
          res.status(500).json({
              message:'surgio un error',
              data:{error}
          });
      } 

 }

