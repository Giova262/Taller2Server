import Comercio from '../models/Comercio';


/** Obtener todos los comercios */
export async function getAll(req,res){

    
    try {
         
    
        let comercios = await Comercio.findAll();
        
        if(comercios){

           res.json({

                message:'todos los comercios registrados',
                comercios

            });

            //res.json(['John', 'Betty', 'Hal']);
        }
        else{
            res.status(500).json({
                message:'No se encontro registros de comercios.'      
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
var {id} = req.body;
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



export async function updateComercio(req, res)
{

var {idcomercio,nombre,direccion,descrip,lat,long,estado} = req.body;

try{
await Comercio.find({ where:  {com_id:idcomercio } })
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

