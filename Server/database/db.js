const { Sequelize } = require('sequelize');// importing the sequelize download 
const sequelize = new Sequelize('Movie_Review', 'postgres', 'anuj1234', {//  establishing connection with postgres databse 
    host: 'localhost',
    dialect:  'postgres'
  });
  async function testconnection(){ // running the connection for checking 
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testconnection();
module.exports=sequelize; // exportring the module 