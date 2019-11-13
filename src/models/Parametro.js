import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

/* Defino modelo de los datos */
const Parametro= sequelize.define('parametro',{

    par_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    par_nombre:{
        type: Sequelize.TEXT
    },

     par_value:{
        type: Sequelize.TEXT
    }
   
});

export default Parametro;