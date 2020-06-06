const sequelize = require ('sequelize') 

const database = require('../config/database')

// to creat a model
const Users = database.define('users', {
    userName: {
        type: sequelize.STRING
    },

    password: {
        type: sequelize.STRING
    },

    firstName: {
        type: sequelize.STRING
    },

    lastName: {
        type: sequelize.STRING
    },

    number: {
        type: sequelize.INTEGER
    },

    email: {
        type: sequelize.STRING
    },

    friends: {
        type: sequelize.ARRAY(sequelize.INTEGER)
    }
})

module.exports = Users ;