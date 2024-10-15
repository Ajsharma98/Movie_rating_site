import { DataTypes} from 'sequelize'; // importing the datatype from sequelize
import sequelize from '../database/db';// importing the db.js 

const Movie = sequelize.define('Movie', { // providing the details of the columns of table
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        
    },
    director_name:{
        type:DataTypes.STRING,

    },
    writers:{
        type:DataTypes.STRING,
    },
    img:{
        type:DataTypes.STRING,
    },
    rating:{
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
