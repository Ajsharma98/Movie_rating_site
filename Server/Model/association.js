import User from '../Model/User.js';
import Movie from '../Model/Movie.js';

User.hasMany(Movie, { foreignKey: 'posted_by' });
Movie.belongsTo(User, { foreignKey: 'posted_by' });
