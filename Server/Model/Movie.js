const { DataTypes } = require('sequelize'); // importing the datatype from sequelize
const sequelize = require('../database/db');// importing the db.js 

const Movie = sequelize.define('movie', { // providing the details of the columns of table
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    Name: {
        type: DataTypes.STRING,
        
    },
    Director_Name:{
        type:DataTypes.STRING,

    },
    Writer:{
        type:DataTypes.STRING,
    },
    img:{
        type:DataTypes.STRING,
    },
    Rating:{
        type:DataTypes.INTEGER,

    },
    genre:{
        type:DataTypes.STRING,
    }
    
    
}, {
    // Model options
    timestamps: false,
    tableName: 'movie'
});
// console.log(Book === sequelize.models.Book)
module.exports = Movie; // exporting the Movie model
