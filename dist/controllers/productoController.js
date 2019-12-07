import Producto from '../models/Producto';
import { sequelize } from '../database/database';
/*todos los productos de un comercio*/

export async function getProductosPorComercio(req, res) {
  var {
    idcomercio
  } = req.params;

  try {
    let productos = await Producto.findAll({
      where: {
        prod_idcomercio: idcomercio
      }
    });

    if (productos) {
      res.json({
        message: 'todos los productos registrados del comercio',
        data: productos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de productos.',
        data: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'algo salio mal obteniendo los productos',
      data: {
        error
      }
    });
  }
}
/** Obtener todos los productos */

export async function getAll(req, res) {
  try {
    let productos = await Producto.findAll();

    if (productos) {
      res.json({
        message: 'todos los productos registrados',
        productos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de productos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'no se encontro ningun producto',
      data: {
        error
      }
    });
  }
}
/*todos los productos de un pedido*/

export async function getProductosPorPedido(req, res) {
  var {
    idpedido
  } = req.params;

  try {
    var sqlquery = 'select productos.*  from items, productos where productos.prod_id=items.item_productoid and items.item_pedidoid='.concat(idpedido);
    let productos = await sequelize.query(sqlquery, {
      type: sequelize.QueryTypes.SELECT
    });

    if (productos) {
      res.json({
        message: 'todos los productos para el pedido',
        productos
      });
    } else {
      res.status(500).json({
        message: 'No se encontro registros de productos.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'surgio un error',
      data: {
        error
      }
    });
  }
}
export async function deleteProducto(req, res) {
  var {
    id
  } = req.params;

  try {
    await Producto.destroy({
      where: {
        prod_id: id
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
export async function updateProducto(req, res) {
  var {
    idproducto,
    valor,
    nombre,
    idcomercio,
    descrip
  } = req.body;

  try {
    await Producto.find({
      where: {
        prod_id: idproducto
      }
    }).on('success', function (Producto) {
      // si el registro exite
      if (Producto) {
        Producto.update({
          prod_value: valor,
          prod_nombre: nombre,
          prod_idcomercio: idcomercio,
          prod_descripcion: descrip
        }).success(res.status(200).json({
          message: "Se actualizo correctamente"
        })).error(err => res.status(404).json({
          message: 'Hubo un error al actualizar',
          data: {
            err
          }
        }));
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
export async function registrarProducto(req, res) {
  var {
    valor,
    nombre,
    idcomercio,
    descrip
  } = req.body;

  try {
    let nuevoProducto = await Producto.create({
      prod_value: valor,
      prod_nombre: nombre,
      prod_idcomercio: idcomercio,
      prod_descripcion: descrip
    }, {
      fields: ['prod_value', 'prod_nombre', 'prod_idcomercio', 'prod_descripcion']
    });

    if (nuevoProducto) {
      return res.json({
        message: 'Producto creado.',
        data: nuevoProducto
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Ocurrio un Error al crear producto',
      error: error
    });
  }
}