const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('Movie_Review', 'postgres', 'anuj1234', {
    host: 'localhost',
    dialect:  'postgres'
  });
  async function testconnection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testconnection();
module.exports=sequelize;