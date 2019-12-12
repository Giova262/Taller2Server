import Comercio from '../models/Comercio';
import {sequelize} from '../database/database';


/**Obtener un solo comercio */
export async function getOne(req,res){

    const {id } = req.params;
        
    try {

        const comercioFound = await Comercio.findOne({
            where: {
                com_id:id
            },
            attributes: [
                
            'com_nombre',
            'com_direccion',
            'com_descripcion',
            'com_latitud',
            'com_longitud',
            'com_estado'
            ]

        });

        if(comercioFound){
    
            res.json(comercioFound);

        }else{
            res.json({
                message:'No se encuentra registrado el usuario.'      
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:'Something goes wrong ',
            data:{error}
        });
    }
}


/** Obtener todos los comercios */
export async function getAll(req,res){

    
    try {
         
        let comercios = await Comercio.findAll();
        
        if(comercios){

           res.json({

                message:'todos los comercios registrados',
                data:comercios

            });          
        }
        else{
            res.status(500).json({
                message:'No se encontro registros de comercios.',
                data: {}      
            })
        }
       
       
  
      } catch (error) {
          res.status(500).json({
              message:'algo salio mal obteniendo los comercios',
              data:{error}
          });
      } 
}

export async function deleteComercio(req, res)
{
var {id} = req.params;
 try {

  await Comercio.destroy({
        where: {
            com_id:id
        }})
        .then(function (deletedRecord) {
            if(deletedRecord === 1){
                res.status(200).json({message:"Se borro correctamente"});          
            }
            else
            {
                res.status(404).json({message:"no existe registo"})
            }
        })

} catch (error) {
    res.status(500).json({
        message:'Hubo un error',
        data:{error}
    });
}
}


export async function getAllActivos(req, res)
{

    var estadoActivo=1
    var sqlquery= 'SELECT comercios.* as total FROM comercios where comercios.com_estado='.concat(estadoActivo);
    try{
    var comercio=  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT});
    
    if(comercio){
    
               res.json({
    
                    message:'comercios activos',
                    comercio
    
                });
            }
            else{
                res.status(500).json({
                    message:'No se encontro registros.'      
                })
            }
 
        } catch (error) {
            res.status(500).json({
                message:'algo salio mal obteniendo los comercios',
                data:{error}
            });
        }
 
}


export async function getAllNoActivos(req, res)
{

    var estadoActivo=2
    var sqlquery= 'SELECT comercios.* as total FROM comercios where comercios.com_estado='.concat(estadoActivo);
    try{
    var comercios =  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT});
    
    if(comercios){
    
               res.json({
    
                    message:'comercios No activos',
                    comercios
    
                });
            }
            else{
                res.status(500).json({
                    message:'No se encontro registros.'      
                })
            }
 
        } catch (error) {
            res.status(500).json({
                message:'algo salio mal obteniendo los comercios',
                data:{error}
            });
        }
}



export async function updateComercio(req, res)
{

var {id} = req.params;
var {nombre,direccion,descrip,lat,long,estado} = req.body;

try{
await Comercio.find({ where:  {com_id:id } })
.on('success', function (Comercio) 
{
// si el registro exite
if (Comercio) 
{
Comercio.update({
com_nombre:nombre,
com_direccion:direccion,
com_descripcion:descrip,
com_latitud:lat,
com_longitud:long,
com_estado: estado
})
.success(
 res.status(200).json({message:"Se actualizo correctamente"})      
   )

 .error( err => res.status(404).json({
                     message:'Hubo un error al actualizar',
                      data:{err}}))
}
}
)
} catch (error) {
 res.status(500).json({
     message:'Hubo un error',
     data:{error}
 });
}
}

export async function registrarComercio(req,res){

    var {nombre,direccion,descrip,lat,long,estado} = req.body;

   try {

       let nuevoComercio = await Comercio.create({
        com_nombre:nombre,
        com_direccion:direccion,
        com_descripcion:descrip,
        com_latitud:lat,
        com_longitud:long,
        com_estado: estado
                  
           },
           {
               fields:[
                   'com_nombre',
                   'com_direccion',
                   'com_descripcion',
                   'com_latitud',
                   'com_longitud',
                   'com_estado'
               ]
           });
           
       if(nuevoComercio){

          return  res.json({
               message: 'Producto creado.',
               data: nuevoComercio
           });
       }
       
   } catch (error) {
       res.status(500).json({
           message:'Ocurrio un Error al crear comercio',
           error:error
       });
   } 
}

