import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

/** Defino modelo de los datos */

const Pedido = sequelize.define('pedido',{

    ped_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    ped_userid:{
        type: Sequelize.INTEGER
    },
    ped_deliveryid:{
        type: Sequelize.INTEGER
    },
    ped_total:{
        type: Sequelize.INTEGER
    },
    ped_envio:{
        type: Sequelize.INTEGER
    },
    ped_direccioninicio:{
       type: Sequelize.TEXT
    },
    ped_direcciondestino:{
            type: Sequelize.TEXT
    },   
    ped_latitudinicio:{
        type: Sequelize.DOUBLE
    },
    ped_longitudinicio:{
        type: Sequelize.DOUBLE
    },
    ped_latituddestino:{
        type: Sequelize.DOUBLE
    },
    ped_longituddestino:{
        type: Sequelize.DOUBLE
    },
    ped_descripcion:{
        type: Sequelize.TEXT
    },
    ped_estado :{
        type: Sequelize.INTEGER
    }
});

export default Pedido;