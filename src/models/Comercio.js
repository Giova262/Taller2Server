import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

/* Defino modelo de los datos */
const Comercio= sequelize.define('comercio',{
    com_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    com_nombre:{
        type: Sequelize.TEXT
    },
    com_direccion:{
        type: Sequelize.TEXT
    },
    com_descripcion:{
        type: Sequelize.TEXT
    },
    
    com_latitud: {
        type: Sequelize.DOUBLE
    },
    
    com_longitud:{
        type: Sequelize.DOUBLE
    },
    
    com_estado:{
        type: Sequelize.INTEGER
    }
});

export default Comercio;