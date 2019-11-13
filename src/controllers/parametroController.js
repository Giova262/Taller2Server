import Parametro from '../models/Parametro';


/** Obtener todos los comercios */
export async function getAll(req,res){

    
    try {
         
    
        let parametros = await Parametros.findAll();
        
        if(parametros){

           res.json({

                message:'todos los parametros registrados',
                parametros

            });

            //res.json(['John', 'Betty', 'Hal']);
        }
        else{
            res.status(500).json({
                message:'No se encontro registros de parametros.'      
            })
        }
       
       
  
      } catch (error) {
          res.status(500).json({
              message:'algo salio mal obteniendo los parametros',
              data:{error}
          });
      } 
}

export async function deleteParametro(req, res)
{
var {nombre} = req.body;
 try {

  await Parametro.destroy({
        where: {
            par_nombre:nombre
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



export async function updateParametro(req, res)
{

var {nombre,value} = req.body;

try{
await Parametro.findOne({ where:  {par_nombre:nombre } })
.on('success', function (Parametro) 
{
// si el registro exite
if (Parametro) 
{
Parametro.update({
    par_value:value
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

export async function registrarParametro(req,res){

    var {nombre,value} = req.body;

   try {

       let nuevoParametro = await Parametro.create({

        par_nombre:nombre,
        par_value:value
           },
           {
               fields:[
                   
                   'par_nombre',
                   'par_value'
               ]
           });
           
       if(nuevoParametro){

          return  res.json({
               message: 'Parametro creado.',
               data: nuevoParametro
           });
       }
       
   } catch (error) {
       res.status(500).json({
           message:'Ocurrio un Error al crear parametro',
           error:error
       });
   } 
}