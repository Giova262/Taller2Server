import Pedido from '../models/Pedido';
import Producto from '../models/Producto';
import User from '../models/User';
import Item from '../models/Item';
import Parametro from '../models/Parametro';
import { getKilometros, getPrecioEnvioPorReglas, getPorcentajeEnvioPorReglas } from '../service/Service'; //Actualizar pedido

export async function updatePedido(req, res) {
  const {
    ped_id,
    ped_userid,
    estado
  } = req.body;

  try {
    await Pedido.findOne({
      where: {
        ped_id: ped_id,
        ped_userid: ped_userid
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    }).then(async pedido => {
      const pedidoChanged = await pedido.update({
        ped_estado: 3
      }); //Aca modifico al delivery y le doy puntos

      try {
        await User.findOne({
          where: {
            id: pedido.ped_deliveryid
          },
          attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
        }).then(async user => {
          //por default
          var adicionpuntaje = 100;
          var pasajenivel = 1000; //levanto los parametros

          const param = await Parametro.findOne({
            where: {
              par_nombre: 'adicion_puntaje'
            },
            attributes: ['par_id', 'par_nombre', 'par_value']
          });
          if (param) adicionpuntaje = param.par_value;
          param = await Parametro.findOne({
            where: {
              par_nombre: 'cambio_nivel'
            },
            attributes: ['par_id', 'par_nombre', 'par_value']
          });
          if (param) pasajenivel = param.par_value; //actualizo

          var nuevoPuntaje = user.puntaje + adicionpuntaje;
          var nuevoLevel = user.nivel;

          if (nuevoPuntaje >= pasajenivel) {
            nuevoLevel = nuevoLevel + 1;
            nuevoPuntaje = 0;
          }

          const userChanged = await user.update({
            puntaje: nuevoPuntaje,
            nivel: nuevoLevel
          });
          res.json({
            message: 'Usuario Cambiado Success.'
          });
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'No pudo actualizar al deliery',
          data: {
            error
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong on getAll patch',
      data: {
        error
      }
    });
  }
} // todos los pedidos sin ningun filtro.

export async function all(req, res) {
  try {
    let pedidos = await Pedido.findAll({
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid']
    });

    if (pedidos) {
      res.json({
        message: 'todos los pedidos registrados',
        pedidos
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'no se pudo obtener los pedidos',
      data: error
    });
  }
} //obtengo los pedidos pendientes 

export async function getPedidosPendientes(req, res) {
  var estadopedido = 1;

  try {
    let pedidos = await Pedido.findAll({
      where: {
        ped_estado: estadopedido
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      res.json({
        message: 'pedidos pendientes son:',
        pedidos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: {
        error
      }
    });
  }
} //obtengo los pedidos asignados

export async function getPedidosAsignados(req, res) {
  var estadopedido = 2;

  try {
    let pedidos = await Pedido.findAll({
      where: {
        ped_estado: estadopedido
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      res.json({
        message: 'pedidos asignados son:',
        pedidos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: {
        error
      }
    });
  }
} //obtengo los pedidos cancelados

export async function getPedidosCancelados(req, res) {
  var estadopedido = 3;

  try {
    let pedidos = await Pedido.findAll({
      where: {
        ped_estado: estadopedido
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      res.json({
        message: 'pedidos asignados son:',
        pedidos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: {
        error
      }
    });
  }
} //obtengo los pedidos de un usuario en especifico

export async function getPedidosUsuario(req, res) {
  const {
    idUsuario
  } = req.params;

  try {
    let pedidos = await Pedido.findAll({
      where: {
        ped_userid: idUsuario
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      res.json({
        message: 'pedidos del usuario',
        pedidos
      });
    } else {
      res.json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono 1',
      data: idusuario
    });
  }
} //obtengo los pedidos de usuario  delivery

export async function getPedidosDelivery(req, res) {
  const {
    idDelivery
  } = req.params;

  try {
    let pedidos = await Pedido.findAll({
      where: {
        ped_deliveryid: idDelivery,
        ped_estado: 2
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      res.json({
        message: 'pedidos del delivery',
        pedidos
      });
    } else {
      res.json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: idDelivery
    });
  }
} //Historial de pedidos entregados por un delivery en especifico

export async function getPedidosHistorialDelivery(req, res) {
  const {
    idDelivery
  } = req.params;

  try {
    let pedidos = await Pedido.findAll({
      where: {
        ped_deliveryid: idDelivery,
        ped_estado: 3
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      res.json({
        message: 'pedidos del delivery',
        pedidos
      });
    } else {
      res.json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: idDelivery
    });
  }
} //registro el pedido pendiente

export async function registrarPedido(req, res) {
  var {
    iduser,
    diri,
    dirf,
    lati,
    longi,
    latf,
    longf,
    items
  } = req.body;

  try {
    var iddelivery = 0;
    var total = 0;
    var envio = 0; //estadopedido=1 pendiente       

    var estadopedido = 1; //creo el pedido con total=0

    var idpedido = 0;
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
      ped_estado: estadopedido
    }, {
      fields: ['ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (nuevoPedido) {
      //obtengo el id pedido
      idpedido = nuevoPedido.ped_id;
      var i = 0;
      const numItems = items.length; //saco todos los items

      while (i < numItems) {
        //saco el string del json
        var stringJson = items[i]; //valores id y cantidad

        const idProducto = stringJson.id;
        const cantidad = stringJson.cantidad; //busco los datos del producto

        const productFound = await Producto.findOne({
          where: {
            prod_id: idProducto
          },
          attributes: ['prod_value']
        }); //encontre el producto y creo el item

        if (productFound) {
          let nuevoitem = await Item.create({
            item_pedidoid: idpedido,
            item_productoid: idProducto,
            item_cantidad: cantidad
          }, {
            fields: ['item_pedidoid', 'item_productoid', 'item_cantidad']
          });

          if (nuevoitem) {
            var value = productFound.prod_value;
            total += value * cantidad;
          }
        } //incremento 


        i = i + 1;
      }

      var envio = 0;
      let usr = await User.findOne({
        where: {
          id: iduser
        },
        attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
      });

      if (usr) {
        var peso_kms = 5;
        const param = await Parametro.findOne({
          where: {
            par_nombre: 'pesos_km'
          },
          attributes: ['par_id', 'par_nombre', 'par_value']
        });
        if (param) peso_kms = param.par_value;
        var nivel = usr.nivel;
        var cantEnvios = usr.cantEnvios;
        var puntaje = usr.points;
        var kms = getKilometros(latf, longf, lati, longi);
        var date = new Date();
        var currenthour = date.getHours();
        var currentnumberday = date.getDay();
        var kms = getKilometros(latf, longf, lati, longi);
        envio = getPrecioEnvioPorReglas(currentnumberday, currenthour, kms * peso_kms, kms, cantEnvios, nivel, puntaje);
      }

      total = parseInt(total);
      envio = parseInt(envio); //hago el update del total del pedido  

      let pedidoUpdate = await Pedido.update({
        ped_total: total,
        ped_envio: envio
      }, {
        where: {
          ped_id: idpedido
        }
      });

      if (pedidoUpdate) {
        res.json({
          message: 'Pedido Registrado Correctamente Estado Pendiente',
          data: pedidoUpdate
        });
      } else {
        //devuelvo el id pedido y el total
        res.status(500).json({
          message: 'no se pudo hacer el update',
          data: {
            error
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'no se pudo registrar el pedido',
      data: error
    });
  }
} //obtengo los pedidos pendientes cercanos.

export async function getPedidosPendientesParaDelivery(req, res) {
  const {
    lati,
    longi
  } = req.params;
  var estadopedido = 1;

  try {
    //hay que usar lati y longi para buscar los pedidos cercanos 
    let pedidos = await Pedido.findAll({
      where: {
        ped_estado: estadopedido
      },
      attributes: ['ped_id', 'ped_userid', 'ped_deliveryid', 'ped_total', 'ped_envio', 'ped_direccioninicio', 'ped_direcciondestino', 'ped_latitudinicio', 'ped_longitudinicio', 'ped_latituddestino', 'ped_longituddestino', 'ped_longituddestino', 'ped_estado']
    });

    if (pedidos) {
      var maxkms = 20;
      const param = await Parametro.findOne({
        where: {
          par_nombre: 'maxkms'
        },
        attributes: ['par_id', 'par_nombre', 'par_value']
      });

      if (param) {
        maxkms = param.par_value;
      } //filtro los cercanos 


      var pedidoscercanos = [];
      pedidos.forEach(ped => {
        var lat = parseFloat(ped.ped_latitudinicio);
        var long = parseFloat(ped.ped_longitudinicio);

        if (parseFloat(getKilometros(lat, long, lati, longi)) <= maxkms) {
          pedidoscercanos.push(ped);
        }
      });
      res.json({
        message: 'pedidos pendientes son:',
        pedidoscercanos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de pedidos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: {
        error
      }
    });
  }
} //asignacion de pedido a delivery

export async function asignarPedidoADelivery(req, res) {
  var {
    idpedido,
    iddelivery
  } = req.body;
  var estadoPendiente = 1;
  var estadoAsignado = 2;

  try {
    //me fijo si el pedido no fue asignado
    var pedidosSinAsignar = await Pedido.count({
      where: {
        ped_id: idpedido,
        ped_estado: estadoPendiente
      }
    });

    if (pedidosSinAsignar > 0) {
      //hago el update del pedido  
      let pedidoUpdate = await Pedido.update({
        ped_deliveryid: iddelivery,
        ped_estado: estadoAsignado
      }, {
        where: {
          ped_id: idpedido
        }
      });

      if (pedidoUpdate) {
        //devuelvo el id pedido y el delivery
        res.json({
          message: 'Pedido asignado',
          idpedido,
          iddelivery
        });
      } else {
        res.status(500).json({
          message: 'No se pudo asignar un pedido.'
        });
      }
    } else {
      res.status(500).json({
        message: 'El pedido ya fue asignado.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: {
        error
      }
    });
  }
}
/*obtengo el precio del envio con las reglas*/

export async function getPrecioEnvio(req, res) {
  var {
    idusuario,
    lati,
    longi,
    latf,
    longf
  } = req.body;

  try {
    let usuario = await Usuario.findOne({
      where: {
        id: idusuario
      },
      attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
    }); // si el registro exite

    if (usuario) {
      var peso_kms = 5;
      const param = await Parametro.findOne({
        where: {
          par_nombre: 'pesos_km'
        },
        attributes: ['par_id', 'par_nombre', 'par_value']
      });
      if (param) peso_kms = param.par_value;
      var nivel = usuario.nivel;
      var cantEnvios = usuario.cantEnvios;
      var puntaje = usuario.points;
      var kms = getKilometros(latf, longf, lati, longi);
      var date = new Date();
      var currenthour = date.getHours();
      var currentnumberday = date.getDay();
      var kms = getKilometros(latf, longf, lati, longi);
      var envio = getPrecioEnvioPorReglas(currentnumberday, currenthour, kms * peso_kms, kms, cantEnvios, nivel, puntaje);
      res.json({
        message: 'valor envio',
        envio
      });
    } else {
      res.status(500).json({
        message: 'No se encontro el usuario.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: '',
      data: {
        error
      }
    });
  }
}
/*obtengo el porcentaje del envio para el delivery 
*/

export async function getPorcentajeDelivery(req, res) {
  var {
    idusuario,
    iddelivery,
    lati,
    longi,
    latf,
    longf
  } = req.body;

  try {
    let usuarioCliente = await Usuario.findOne({
      where: {
        id: idusuario
      },
      attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
    });
    let usuarioDelivery = await Usuario.findOne({
      where: {
        id: iddelivery
      },
      attributes: ['id', 'nombre', 'pass', 'mail', 'rol', 'puntaje', 'nivel', 'foto', 'cantEnvios', 'redsocial', 'uidfirebase']
    });

    if (usuarioCliente && usuarioDelivery) {
      var peso_kms = 5;
      const param = await Parametro.findOne({
        where: {
          par_nombre: 'pesos_km'
        },
        attributes: ['par_id', 'par_nombre', 'par_value']
      });
      if (param) peso_kms = param.par_value;
      var nivelCliente = usuarioCliente.nivel;
      var cantEnviosCliente = usuarioCliente.cantEnvios;
      var puntajeCliente = usuarioCliente.points;
      var nivelDelivery = usuarioDelivery.nivel;
      var cantEnviosDelivery = usuarioDelivery.cantEnvios;
      var puntajeDelivery = usuarioDelivery.points;
      var kms = getKilometros(latf, longf, lati, longi);
      var date = new Date();
      var currenthour = date.getHours();
      var currentnumberday = date.getDay();
      var envio = getPrecioEnvioPorReglas(currentnumberday, currenthour, kms * peso_kms, kms, cantEnviosCliente, nivelCliente, puntajeCliente);
      var porcentaje = getPorcentajeEnvioPorReglas(currentnumberday, currenthour, envio, cantEnviosDelivery, nivelDelivery, puntajeDelivery);
      res.json({
        message: 'valor porcentaje',
        porcentaje,
        envio
      });
    } else if (!usuarioCliente && !usuarioDelivery) {
      res.status(500).json({
        message: 'No se encontro el usuario cliente y delivery.'
      });
    } else if (!usuarioCliente) {
      res.status(500).json({
        message: 'No se encontro el usuario cliente.'
      });
    } else {
      res.status(500).json({
        message: 'No se encontro el usuario delivery.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo no funciono',
      data: {
        error
      }
    });
  }
}
export async function deletePedido(req, res) {
  var {
    id
  } = req.params;

  try {
    //borro los items del pedido
    await Item.destroy({
      where: {
        item_pedidoid: id
      }
    });
    await Pedido.destroy({
      where: {
        ped_id: id
      }
    }).then(function (deletedRecord) {
      if (deletedRecord === 1) {
        res.status(200).json({
          message: "Se borro correctamente"
        });
      } else {
        res.status(404).json({
          message: "no existe registo"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Hubo un error',
      data: {
        error
      }
    });
  }
}
export async function getTotalFacturadoUsuario(req, res) {
  var {
    id
  } = req.params;

  try {
    var sqlquery = 'SELECT sum(ped_total) FROM pedidos where pedidos.ped_userid='.concat(id);
    var total = await sequelize.query(sqlquery, {
      type: sequelize.QueryTypes.SELECT
    });

    if (total) {
      res.json({
        message: 'total facturado usuario',
        total
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'hubo un error',
      data: {
        error
      }
    });
  }
}
export async function getTotalFacturadoDelivery(req, res) {
  var {
    id
  } = req.params;

  try {
    var sqlquery = 'SELECT sum(pedidos.ped_envio*0.05) FROM pedidos where pedidos.ped_deliveryid'.concat(id);
    var total = await sequelize.query(sqlquery, {
      type: sequelize.QueryTypes.SELECT
    });

    if (total) {
      res.json({
        message: 'total facturado usuario',
        total
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'hubo un error',
      data: {
        error
      }
    });
  }
}