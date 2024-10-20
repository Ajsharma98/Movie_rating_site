import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Connection to the database
import User from '../Model/User.js';
import Movie from '../Model/Movie.js';
import { INTEGER } from 'sequelize/lib/data-types';

// Define the User model
const Rating = sequelize.define('Rating', {
    // Email column as primary key
    user_id: {
        type: DataTypes.INTEGER,   // Email is stored as a string
        allowNull: false, 
        references:{
            model: User,
            key:'user_id'
        }
      
    },
    // Password column
    movie_id: {
        type: DataTypes.INTEGER,   // Password is stored as a string (hashed)
        allowNull: false, 
        references:{
            model: Movie,
            key: 'id'
        } 
    },
    Review_id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    Review: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1,
            max:10
        }
      
    },
   rating_deleted:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
   }


}, {

    timestamps: false,           // Disable automatic creation of createdAt and updatedAt
    tableName: 'rating'           // Specify the table name explicitly
});


// Export the model
export default Rating;