import { DataTypes} from 'sequelize'; // importing the datatype from sequelize
// const sequelize=require('../database/db.js')
import sequelize from '../database/db.js';// importing the db.js 
import User from '../Model/User.js';

const Movie = sequelize.define('Movie', { // providing the details of the columns of table
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
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
    genre:{
        type:DataTypes.STRING,

    posted_by:{
        type:DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },

    }
    }
    
    
}, {
    // Model options
    timestamps: false,
    tableName: 'movie'
});
// console.log(Book === sequelize.models.Book)
export default Movie; // exporting the Movie model
