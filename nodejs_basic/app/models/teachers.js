const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Teacher = sequelize.define('teachers', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
})

module.exports = Teacher;