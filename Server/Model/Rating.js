import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Connection to the database


// Define the User model
const Rating = sequelize.define('Rating', {
    // Email column as primary key
    user_id: {
        type: DataTypes.INTEGER,   // Email is stored as a string
        allowNull: false, 
      
    },
    // Password column
    movie_id: {
        type: DataTypes.INTEGER,   // Password is stored as a string (hashed)
        allowNull: false,  
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
    Rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1,
            max:10
        }
      
    }


}, {
    // Model options
    timestamps: false,           // Disable automatic creation of createdAt and updatedAt
    tableName: 'rating'           // Specify the table name explicitly
});

Rating.sync({force: true})

// Export the model
export default Rating;