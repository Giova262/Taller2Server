import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
/* Defino modelo de los datos */

const Producto = sequelize.define('productos', {
  prod_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  prod_value: {
    type: Sequelize.INTEGER
  },
  prod_nombre: {
    type: Sequelize.TEXT
  },
  prod_idcomercio: {
    type: Sequelize.INTEGER
  },
  prod_descripcion: {
    type: Sequelize.TEXT
  }
});
export default Producto;