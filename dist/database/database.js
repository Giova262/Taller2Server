"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var Sequelize = require('sequelize'); // Option 2: Passing a connection URI


var sequelize = new Sequelize('postgres://weylnujldswxrd:38ee912da8c320a7c595083368c433f449cb637246c924e6694d470fd1f096a1@ec2-174-129-27-158.compute-1.amazonaws.com:5432/ddh3g9sk5efkjj', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  }
});
exports.sequelize = sequelize;
sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
/*
import Sequelize from 'sequelize';
  export const sequelize = new Sequelize(
         'postgres',
        'postgres',
        '152645109',
        {
            host: 'localhost',
            dialect: 'postgres',
            define: {
                timestamps: false
            },
            pool: {
                max:5,
                min:0,
                require:30000,
                idle:10000
            },
            logging:false
        }
);
sequelize
.authenticate()
.catch(err => {
  console.error('no se pudo realizar la conexion a la base de datos:', err);
});*/