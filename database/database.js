const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas','root','97855818',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;