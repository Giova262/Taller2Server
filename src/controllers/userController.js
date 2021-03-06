import Test from '../models/User'
import jwt from 'jsonwebtoken'
import {sequelize} from '../database/database';

//...............................................................

import * as admin from 'firebase-admin'
import serviceAccount from '../../my-application-foodie-firebase-adminsdk-ywqsl-58550a4a21.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-application-foodie.firebaseio.com"
});

//...............................................................

/** actualizar usuario */
export async function updateUser(req,res){
   
    const {id,nombre,mail,pass,rol,foto,redsocial } = req.body;

    try {

         await Test.findOne({
            where: {
                
                id:id
            },
            attributes: [ 
                'id',
                'nombre',
            'pass',
            'mail',
            'rol',
            'puntaje',
            'nivel',
            'foto',
            'cantEnvios',
            'redsocial',
            'uidfirebase']
          })
          .then( async user => {

            const userChanged = await user.update({

                nombre:nombre,
                mail:mail,
                pass:pass,
                rol:rol,
                foto:foto,
                redsocial:redsocial

            });

            res.json({
                message:'Usuario Cambiado Success.', 
                   
            })
            

          });
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            message:'Something goes wrong on getAll patch',
            data:{error}
        });
    }

}

/** Obtener todos los Usuarios */
export async function getAll(req,res){

    try {

        const tests = await Test.findAll();
        
        if(tests){

           res.json({

                message:'Todos los usuarios registrados son:',
                data:tests

            });
        }
     
  
      } catch (error) {
          res.status(500).json({
              message:'Something goes wrong on getAll patch',
              data:{error}
          });
      } 
}

/** Crear nuevo Usuario */
export async function register(req,res){

    const { nombre,pass,mail,rol,puntaje,nivel,foto,cantEnvios,redsocial,uidfirebase } = req.body;
  
    try {

        let nuevoUsuario = await Test.create({

            nombre: nombre,
            pass:pass,
            mail:mail,
            rol:rol,
            puntaje:puntaje,
            nivel:nivel,
            foto:foto,
            cantEnvios:cantEnvios,
            redsocial:redsocial,
            uidfirebase:uidfirebase,
            token:token
            },
            {
                fields:[              
                    'nombre',
                    'pass',
                    'mail',
                    'rol',
                    'puntaje',
                    'nivel',
                    'foto',
                    'cantEnvios',
                    'redsocial',
                    'uidfirebase',           
					'token'
         
                ]
            });
            
        if(nuevoUsuario){

            const token = jwt.sign({nuevoUsuario}, 'key' );
            //guardo el token
		    await nuevoUsuario.update({token:token});

             res.json({
               message:'Usuario Creado.Login Success.', 
               status: 1 ,                                    
               token : token,
               dato : nuevoUsuario
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:'Ocurrio un Error al crear usuario',
            status: 0 ,
            data:{nombre,mail,pass},
            error:error
        });
    } 
}

/** Login Usuarios */
export async function login(req,res){

    const { mail,pass,rol,idToken } = req.body;

    
  
    if(idToken != -1 ) {

        // .......El login fue desde una Red social. Verifico Token desde Firebase......................
     
        admin.auth().verifyIdToken(idToken).then(async function(decodedToken) {

                //.....Obtengo el uid del usuario en Firebase......

                let uid = decodedToken.uid;  

                //.....Busco el uid en mi base de datos............
                try {

                    const userFound = await Test.findOne({
                        where: {
                            uidfirebase:uid,
                            rol:rol
                        },
                        attributes: [ 'id',
                        'nombre',
                        'pass',
                        'mail',
                        'rol',
                        'puntaje',
                        'nivel',
                        'foto',
                        'cantEnvios',
                        'redsocial',
                        'uidfirebase',
						'token']
                    });
                
                    if(userFound){
                
                        //....Encontre al usuario y genero nuevo Token....

                       const token = jwt.sign({userFound}, 'key' );
                       //guardo el token
         		       await userFound.update({token:token});

          		  
                        res.json({
                            message:'Login Success.',
                            status: 1 ,
                            token : token,
                            dato : userFound
                        })
            
                    }else{
                        
                        //....No Encontre usario Creo uno nuevo..........

                        admin.auth().getUser(uid)
                        .then(async function(userRecord) {
                            
                            var nombre = userRecord.toJSON().displayName
                            var pass = 'pass123'
                            var mail = userRecord.toJSON().email
                            var rol2 = rol
                            var puntaje = 0
                            var nivel = 0
                            var foto = userRecord.toJSON().photoURL
                            var cantEnvios = 0
                            var redsocial = userRecord.toJSON().providerData[0].providerId
                            var uidfirebase = uid
                            var tokeni=-1
                            try {
    
                                let nuevoUsuario = await Test.create({
                        
                                    nombre: nombre,
                                    pass:pass,
                                    mail:mail,
                                    rol:rol2,
                                    puntaje:puntaje,
                                    nivel:nivel,
                                    foto:foto,
                                    cantEnvios:cantEnvios,
                                    redsocial:redsocial,
                                    uidfirebase:uidfirebase,
                                    token:tokeni                       
                                    },
                                    {
                                        fields:[   
                                                                                  
                                            'nombre',
                                            'pass',
                                            'mail',
                                            'rol',
                                            'puntaje',
                                            'nivel',
                                            'foto',
                                            'cantEnvios',
                                            'redsocial',
                                            'uidfirebase',
											'token'
                                        ]
                                    });
                                    
                                if(nuevoUsuario){
                        
                                    const token = jwt.sign({nuevoUsuario}, 'key' );
                                    //guardo el token
                     		        await  nuevoUsuario.update({token:token});
        
                                    res.json({
                                        message:'Usuario Creado.Login Success.', 
                                        status: 1 ,                                    
                                        token : token,
                                        dato : nuevoUsuario
                                    })

                                }else{
                                    res.status(401).json({
                                        message:'Fallo al iniciar Sesion.Verifica Mail o Contraseña.',
                                        status: 0 ,
                                        token : "-1"       
                                    })
                                }
                                
                            } catch (error) {
                                console.log( "Errorr Al crear el usuario" + error)
                                res.status(500).json({
                                    message:'Ocurrio un Error al crear usuario',                       
                                    error:error
                                });
                            }                   
    
                        })
                        .catch(function(error) {
                            console.log('Error fetching user data:', error);
                        });

                    }
                 
                } catch (error) {

                    console.log( "Errorr ")
                    res.status(500).json({
                        message:'Something goes wrong222',
                        data:error
                    });

                }

            }).catch(function(error) {
            
                console.log('Error decodificar el Token :' , error);
            }   
        );

    }else{

    // ..........Logeo sin Red Social..............

    

        try {

            const userFound = await Test.findOne({
                where: {
                    mail:mail,
                    pass:pass,
                    rol:rol
                },
                attributes: [ 
                    'id',
                    'nombre',
                'pass',
                'mail',
                'rol',
                'puntaje',
                'nivel',
                'foto',
                'cantEnvios',
                'redsocial',
                'uidfirebase',									
				'token']
            });
        
            if(userFound){

                
        
               const token = jwt.sign({userFound}, 'key' );
               await userFound.update({token:token});
        
                res.json({
                    message:'Login Success.', 
                    status: 1 ,                
                    token : token,
                    dato : userFound
                })
    
            }else{
                res.status(401).json({
                    message:'Fallo al iniciar Sesion.Verifica Mail o Contraseña.',
                    status: 0,
                    token : "-1"    
                })
            }
         
        } catch (error) {
            res.status(500).json({
                message:'Something goes wrong',
                data:error
            });
        }
    }
}

/** Rutas protegidas */
export async function consultaPerfil(req,res){

    jwt.verify(req.token, 'key' , (err,data)=>{
        if(err){
            res.json({
                message:'Acceso Denegado.'
            });
        }else{
                    res.json({
                message:'Acceso a consulta de Perfil',
                data:data //Son los datos del que se esta logeando
                     });
        }
    });
}

export async function chequeoToken(req,res,next){

   const token=req.headers['token'];

    jwt.verify(token, 'key' , (err,data)=>{
     
	 //me fijo si existe el token  
    const userFound =  Test.findOne({
                where: {
                    token:token
                } });
        
	if(err  || !userFound){
            console.log(req.headers['token'])
            console.log("Error en chequeo token")
            res.json({
                message:'Acceso Denegado.'
            });
        }else{
            next();
        }
    });
}


/** Verificacion token */
export async function ensureToken(req,res,next){
    
    const bearerHeader = req.headers['token'];
  
    if( typeof bearerHeader !== 'undefined' ){

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    }else {

        console.log("Error en ensureToken")

        res.json({
            message:'Token null error'
        });
    }
}

/** Obtener usuario por id */
export async function getOne(req,res,next)
{
    
    const {id } = req.params;
        
    try {

        const userFound = await Test.findOne({
            where: {
                id:id
            },
            attributes: ['id',
            'nombre',
            'pass',
            'mail',
            'rol',
            'puntaje',
            'nivel',
            'foto',
            'cantEnvios',
            'redsocial',
            'uidfirebase',
            'token']
        });

        if(userFound){
    
            res.json(userFound);

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

/*todos los usuarios delivery para chatear de un usuario en pedido*/
export async function getDeliverysPorUsuario(req,res)
{
var {iduser} = req.params;
try{

var sqlquery= 'select Distinct(users.*) from users, pedidos where pedidos.ped_deliveryid=users.id and pedidos.ped_userid='.concat(iduser).concat(' ORDER BY users.nombre ');
//res.json(sqlquery);
var  usuarios =  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT});

if(usuarios){

           res.json({

                message:'todos los usuarios delivery para chatear',
                usuarios

            });
        }
        else{
            res.status(500).json({
                message:'No se encontro registros.'      
            })
        }
       
  
      } catch (error) {
          res.status(500).json({
              message:'hubo un error',
              data:{error}
          });
      } 
 
    }

/*todos los usuarios para chatear de un pedido de un delivery*/
export async function getUsuariosPorDelivery(req,res)
{
var {iddelivery} = req.params;
try{

var sqlquery= 'select Distinct(users.*) from users, pedidos where pedidos.ped_userid=users.id and pedidos.ped_deliveryid='.concat(iddelivery).concat(' ORDER BY users.nombre ');

//res.json(sqlquery);

var  usuarios =  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT});

if(usuarios){

           res.json({

                message:'todos los usuarios para chatear',
                usuarios

            });
        }
        else{
            res.status(500).json({
                message:'No se encontro registros.'      
            })
        }
       
  
      } catch (error) {
          res.status(500).json({
              message:'hubo un error',
              data:{error}
          });
      } 
 }

 export async function deleteUser(req, res)
 {
 var {id} = req.body;
  try {
 
   await Test.destroy({
         where: {
            id:id
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


 /*top 10  usuarios*/
export async function topDiezUser(req,res)
{
var rolUsuario=1
try{

var sqlquery= 'select Distinct(users.*) from users WHERE users.rol='.concat(rolUsuario).concat(' ORDER BY puntaje DESC LIMIT 10');

//res.json(sqlquery);


var  usuarios =  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT});

if(usuarios){

           res.json({

                message:'los 10 top usuarios',
                usuarios

            });
        }
        else{
            res.status(500).json({
                message:'No se encontro registros.'      
            })
        }
       
  
      } catch (error) {
          res.status(500).json({
              message:'hubo un error',
              data:{error}
          });
      } 

 }

 
 /*top 10  delivery*/
export async function topDiezDelivery(req,res)
{
var rolUsuario=0;
try{

var sqlquery= 'select Distinct(users.*) from users WHERE users.rol='.concat(rolUsuario).concat(' ORDER BY puntaje DESC LIMIT 10');

//res.json(sqlquery);


var  usuarios =  await sequelize.query(sqlquery ,{ type: sequelize.QueryTypes.SELECT});

if(usuarios){

           res.json({

                message:'los 10 top deliverys',
                usuarios

            });
        }
        else{
            res.status(500).json({
                message:'No se encontro registros.'      
            })
        }
       
  
      } catch (error) {
          res.status(500).json({
              message:'hubo un error',
              data:{error}
          });
      } 

 }
