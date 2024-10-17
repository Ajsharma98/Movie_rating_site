import Rating from '../Model/Rating.js';
import Movie from '../Model/Movie.js';
export const postAllRating=async(req, res)=>{
    try{
     const {rating, Review, movie_id}=req.body
     const userId=req.user;
     if(!userId)
        return res.status(400).json({message: "User_id is null "})
    // Check for required fields
    if ( !rating || !Review || !movie_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (rating < 1 || rating > 10) {
        return res.status(400).json({ message: 'Rating must be between 1 and 10' });
    }
    const movie = await Movie.findByPk(movie_id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const newRating = await Rating.create({
            rating,
            Review,
            movie_id,
            user_id: userId.user_id // Set the user ID from the token
        });
        return res.status(201).json({
            message: 'Rating added successfully',
            rating: newRating
        });

    }
    catch (error) {
        console.error('Error adding rating:',error)
        return res.status(500).json({
            error:'Internal Server Error ',
            details:error.error
        });

    }
};
