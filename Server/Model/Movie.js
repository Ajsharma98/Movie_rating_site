import { DataTypes } from 'sequelize'; // Ensure you import DataTypes if it's not already imported
import sequelize from '../database/db.js'; // Adjust the import as per your project structure

const Movie = sequelize.define('Movie', { // Defining the Movie model
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    director_name: {
        type: DataTypes.STRING,
    },
    writers: {
        type: DataTypes.STRING,
    },
    img: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
    },
    posted_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    avg_rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,// Corrected from 'defaultvalue' to 'defaultValue'
    
    },
   movie_deleted:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
   }
}, {
    // Model options
   
    timestamps: false,
    tableName: 'movie' // Ensure table name is correct (conventionally should be plural like 'movies')
});

export default Movie; // Exporting the Movie model
