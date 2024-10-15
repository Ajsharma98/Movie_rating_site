import { DataTypes, INTEGER } from 'sequelize';
// const sequelize=require('../database/db.js')
import sequelize from '../database/db.js'; // Connection to the database

// Define the User model
const User = sequelize.define('User', {
    // Email column as primary key
    email: {
        type: DataTypes.STRING,   // Email is stored as a string
        allowNull: false, 
// Email cannot be null
    },
    // Password column
    password: {
        type: DataTypes.STRING,   // Password is stored as a string (hashed)
        allowNull: false          // Password cannot be null
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    }


}, {
    // Model options
    timestamps: false,           // Disable automatic creation of createdAt and updatedAt
    tableName: 'users'           // Specify the table name explicitly
});

// Export the model
export default User;
