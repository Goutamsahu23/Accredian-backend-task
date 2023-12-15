const {DataTypes, literal} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Users', {
  username:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
});




module.exports = User;
