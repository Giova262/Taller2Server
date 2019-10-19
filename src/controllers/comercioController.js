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