import User from './User.js';
import Movie from './Movie.js';
import Rating from '../Model/Rating.js';

// Defining the relatioshiop between the User and Movie 
User.hasMany(Movie, { foreignKey: 'posted_by' }); // one user can review many movie (one to many relationship)
Movie.belongsTo(User, { foreignKey: 'posted_by' }); //each movie belong to the user (one to one relationship)

// Defining the relationship between User and Rating
User.hasMany(Rating, { foreignKey: 'user_id' }); // user can give many ratings (one to many relationship)
Rating.belongsTo(User, { foreignKey: 'user_id' }); // rating belongs to a specific user (one to one relationship)

// Defining the relationship between Movie and Rating
Movie.hasMany(Rating, { foreignKey: 'id' }); //  movie can have many ratings (one to many relationship)
Rating.belongsTo(Movie, { foreignKey: 'id' }); // rating belongs to a specific movie ( one to one relationship)

// Sync all models with the database
await User.sync();
await Movie.sync();
await Rating.sync();

// Export models to be used elsewhere in your application
export { User, Movie, Rating };
