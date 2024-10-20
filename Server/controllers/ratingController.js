import Rating from '../Model/Rating.js';
import Movie from '../Model/Movie.js';
const updateAvgRating = async (movie_id) => {
    const ratings = await Rating.findAll({
        where: { movie_id },
        attributes: ['rating']
    });

    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((total, { rating }) => total + rating, 0);
    const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;


    await Movie.update(
        { avg_rating: avgRating },
        { where: { id: movie_id } }
    );
};


export const postAllRating = async (req, res) => {
    try {
        const { rating, Review, movie_id } = req.body
        const userId = req.user;
        if (!userId)
            return res.status(400).json({ message: "User_id is null " })
        // Check for required fields

        if (!rating || !Review || !movie_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (rating < 1 || rating > 10) {
            return res.status(400).json({ message: 'Rating must be between 1 and 10' });
        }
        const movie = await Movie.findByPk(movie_id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const existingRating = await Rating.findOne({
            where: { user_id: userId.user_id, movie_id }
        });

        if (existingRating) {
            
            existingRating.rating = rating;
            existingRating.Review = Review;
            await existingRating.save();//update the database from update query 
        await updateAvgRating(movie_id);
        return res.status(200).json({
            message: 'Rating updated successfully',
            rating: existingRating
        });
    } 
    else{

        const newRating = await Rating.create({
            rating,
            Review,
            movie_id,
            user_id: userId.user_id // Set the user ID from the token
        });
        await updateAvgRating(movie_id);
        return res.status(201).json({
            message: 'Rating added successfully',
            rating: newRating
        });


    }}
    catch (error) {
        console.error('Error adding/updating rating:', error)
        return res.status(500).json({
            error: 'Internal Server Error ',
            details: error.error
        });

    }
};

export const deleteRatingById = async (req, res) =>{
    const{Review_id}=req.params
try{
     const rating=await Rating.findByPk(Review_id);
     if(!rating){
        return res.status(400).json({message:"Rating not found"})
     }
     await Rating.update({rating_deleted:1},{where:{user_id:user_id}});;
     return res.status(200).json({message:"Rating successfully deleted"});
}
catch(error) {
  console.error(error);
  return res.status(500).json({message:"An error occured while deleting the review", error:error.message})
}
}
