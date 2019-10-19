import Pedido from '../models/Pedido'
import Producto from '../models/Producto'
import Item from '../models/Item'
import {getKilometros, getPrecioEnvioPorReglas, getPorcentajeEnvioPorReglas}  from '../service/Service'
//import jwt from 'jsonwebtoken'


// todos los pedidos sin ningun filtro.
export async function all(req, res) 
{
  try {

    let pedidos =   await Pedido.findAll({ attributes: ['ped_id', 'ped_userid', 'ped_deliveryid'] })
  
    if(pedidos)
    {
      res.json({
          message:'todos los pedidos registrados',
          pedidos
      })

    }

 
} catch (error) {
  res.status(500).json({
      message:'no se pudo obtener los pedidos',
      data:error
  });
}
}


//obtengo los pedidos de usuario solicita pedido
export async function getPedidosUsuario(req, res)
{
    
    const {idUsuario} = req.params;
 
    try {

        let pedidos = await Pedido.findAll({
            where: {
              ped_userid:idUsuario
            },
            attributes: [
              'ped_id',
              'ped_userid',
              'ped_deliveryid',
              'ped_total',
              'ped_envio',
              'ped_direccioninicio',
              'ped_direcciondestino',
              'ped_latitudinicio',
              'ped_longitudinicio',
              'ped_latituddestino',
              'ped_longituddestino',
              'ped_longituddestino',  
              'ped_estado'
           ]
        });

        if(pedidos){
    
            res.json({
              message:'pedidos del usuario',
              pedidos});

        }else{
            res.json({
                message:'No se encontro registros de pedidos.'      
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:'algo no funciono 1',
            data:idusuario
        });
    }
}


//obtengo los pedidos de usuario  delivery
export async function getPedidosDelivery(req, res)
{
    
    const {idDelivery} = req.params;
   
    try {

        let pedidos = await Pedido.findAll({
            where: {
              ped_deliveryid:idDelivery
            },
            attributes: [
              'ped_id',
              'ped_userid',
              'ped_deliveryid',
              'ped_total',
              'ped_envio',
              'ped_direccioninicio',
              'ped_direcciondestino',
              'ped_latitudinicio',
              'ped_longitudinicio',
              'ped_latituddestino',
              'ped_longituddestino',
              'ped_longituddestino',  
              'ped_estado'
           ]
        });

        if(pedidos){
    
          res.json({
            message:'pedidos del delivery',
            pedidos});
               

        }else{
            res.json({
                message:'No se encontro registros de pedidos.'      
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:'algo no funciono',
            data:idDelivery
        });
    }
}


//registro el pedido pendiente
export async function registrarPedido(req, res)
{  
var {iduser,diri,dirf,lati,longi,latf,longf,items} = req.body;
var pesoxkm=1
  try{

            var iddelivery=0;
            var total=0;
            var envio=0;
            //estadopedido=1 pendiente       
            var estadopedido=1;
            //creo el pedido con total=0
            var idpedido=0;

            let nuevoPedido = await Pedido.create({
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
            ped_estado:estadopedido
          }
            ,
          {
          fields:[
            'ped_userid',
            'ped_deliveryid',
            'ped_total',
            'ped_envio',
            'ped_direccioninicio',
            'ped_direcciondestino',
            'ped_latitudinicio',
            'ped_longitudinicio',
            'ped_latituddestino',
            'ped_longituddestino',
            'ped_longituddestino',  
            'ped_estado'
            ]
          }
        )
 

            if(nuevoPedido)
            {
            //obtengo el id pedido
            idpedido =nuevoPedido.ped_id;
            var i = 0;
            const numItems= items.length;
            //saco todos los items
            while (i < numItems)
            {
              //saco el string del json
              var stringJson=items[i];
              //valores id y cantidad
              const idProducto= stringJson.id
              const cantidad  = stringJson.cantidad
              //busco los datos del producto
              const productFound = await Producto.findOne({
                    where: {
                            prod_id:idProducto
                            },
                    attributes: ['prod_value']
                          });
              //encontre el producto y creo el item
              if(productFound)
              {
                let nuevoitem = await Item.create({
                              item_pedidoid: idpedido,
                              item_productoid: idProducto,
                              item_cantidad: cantidad
                              } ,{
                            fields:[ 
                            'item_pedidoid',
                            'item_productoid',
                            'item_cantidad',
                                  ]
                                }
                            );
                if(nuevoitem)   
               {  
               var value=productFound.prod_value;
               total+=value*cantidad;        
               }             
             }
   //incremento 
    i = i+1;
  }

   envio=pesoxkm*parseInt(getKilometros(latf,longf,lati,longi))
  //hago el update del total del pedido  
  let pedidoUpdate= await Pedido.update(
    { ped_total: total,
      ped_envio: envio
     },
    { where: { ped_id: idpedido } }
     )

  if(pedidoUpdate)
     {      
     //devuelvo el id pedido y el total
    res.json(
    {
    message:'pedido pendiente',
     idpedido,total,envio
     })
    
    }
    else
    {
       //devuelvo el id pedido y el total
       res.status(500).json({
        message:'no se pudo hacer el update',
        data:{error}
      });
        
    }
 

  }


} catch (error) {
  res.status(500).json({
      message:'no se pudo registrar el pedido',
      data:error
  });
}
  
}

//obtengo los pedidos pendientes cercanos.
export async function getPedidosPendientesParaDelivery(req, res)
{
  var {lati,longi} = req.body;
  var estadopedido=1
  var maxkms=20

  try {
   /*hay que usar lati y longi para buscar los pedidos cercanos */
    let pedidos = await Pedido.findAll({
        where: {
          ped_estado: estadopedido
        },
        attributes: [
          'ped_id',
          'ped_userid',
          'ped_deliveryid',
          'ped_total',
          'ped_envio',
          'ped_direccioninicio',
          'ped_direcciondestino',
          'ped_latitudinicio',
          'ped_longitudinicio',
          'ped_latituddestino',
          'ped_longituddestino',
          'ped_longituddestino',  
          'ped_estado'
       ]
    });

    if(pedidos){
      //filtro los cercanos 
      var pedidoscercanos=[] ;
      pedidos.forEach( 
        (ped) => { 
         var lat =ped.ped_latitudinicio;
         var long=ped.ped_longitudinicio;
        if(parseInt(getKilometros(lat,long,lati,longi))<=maxkms)
         {
          pedidoscercanos.push(ped);
         }

            }
          );
      

          res.json(
          {
            message:'pedidos pendientes son:',
            pedidoscercanos
          })



    }else{
        res.status(500).json({
            message:'No se encontro registros de pedidos.'      
        })
    }
    
} catch (error) {
    res.status(500).json({
        message:'algo no funciono',
        data:{error}
    });
}
}
//asignacion de pedido a delivery
export async function asignarPedidoADelivery(req, res)
{
var {idpedido,iddelivery} = req.body;  
var estadoPendiente=1;  
var estadoAsignado=2;
try
{ 
  //me fijo si el pedido no fue asignado
  var pedidosSinAsignar = await Pedido.count({
  where: {
    ped_id: idpedido, 
    ped_estado: estadoPendiente
  }
});


if(pedidosSinAsignar>0)
   {
   //hago el update del pedido  
    let pedidoUpdate=await Pedido.update(
    {
    ped_deliveryid: iddelivery,
    ped_estado:estadoAsignado
   },
  { 
    where: { ped_id: idpedido } }
   )


  if(pedidoUpdate)
  {
   //devuelvo el id pedido y el delivery
   res.json(
    {
    message:'pedido asignado',
    idpedido,iddelivery
     })
  }
  else
  {
    res.status(500).json({
        message:'No se pudo asignar un pedido.'      
    })
   }
}
else 
{
    res.status(500).json({
    message:'El pedido ya fue asignado.'      
})

}

}

catch (error) {
  res.status(500).json({
      message:'algo no funciono',
      data:{error}
  });
}
}
/* obtengo el precio del envio antes de dar el ok o no al registro 
pedido*/ 
export  function getPrecioEnvio(req, res)
{
  var {lati,longi,latf,longf} = req.body;
  var pesoxkm=10;
  var kms=getKilometros(latf,longf,lati,longi);

  var  envio=    getPrecioEnvioPorReglas(1,19,kms*pesoxkm,kms,10,1,4343);
 
  //const re=  getPorcentajeEnvioPorReglas(0, 21, 500 ,11,1, 333);
  //console.log(re);
  res.json(
    {
     message:'valor envio',
     envio
  }
  );

}