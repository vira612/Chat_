const Sequelize = require('sequelize');

module.exports = new Sequelize('chatAPI', 'postgres', 'root', {
    host: 'localhost',
    dialect:  'postgres'
  });