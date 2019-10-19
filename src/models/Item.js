import Sequelize from 'sequelize';
import {sequelize} from '../database/database';


/* Defino modelo de los datos */
const Item= sequelize.define('item',{

    item_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
   
    item_pedidoid:{
        type: Sequelize.INTEGER

    },

    item_productoid:{
        type: Sequelize.INTEGER

    },
    item_cantidad:{
        type: Sequelize.INTEGER
    },
    item_descripcion:{
        type: Sequelize.TEXT
    }

    
});

export default Item;