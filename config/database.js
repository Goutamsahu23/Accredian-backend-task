
const Sequelize=require('sequelize');
require('dotenv').config();


const Auth_App_DB=process.env.MYSQL_DATABASE;
const USER=process.env.MYSQL_USER;
const PASSWORD=process.env.MYSQL_ROOT_PASSWORD;


const sequelize=new Sequelize(`${Auth_App_DB}`,`${USER}`,`${PASSWORD}`,{
    host: 'localhost',
    dialect:"mysql",
});

module.exports=sequelize;
