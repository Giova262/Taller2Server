import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

/** Defino modelo de los datos */
const Test = sequelize.define('users',{

    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.TEXT
    },
    pass:{
        type: Sequelize.TEXT
    },
    mail:{
        type: Sequelize.TEXT
    },
    rol:{
        type: Sequelize.INTEGER
    },
    puntaje:{
        type: Sequelize.INTEGER
    },
    nivel:{
        type: Sequelize.INTEGER
    },
    foto:{
        type: Sequelize.TEXT
    },
    cantEnvios:{
        type: Sequelize.INTEGER
    },
    redsocial:{
        type: Sequelize.TEXT
    },
    uidfirebase:{
        type: Sequelize.TEXT
    },
	token:{
        type: Sequelize.TEXT
    }

});

export default Test;