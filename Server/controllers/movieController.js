import Movie from '../Model/Movie.js';
import Rating from '../Model/Rating.js';
export const getAllMovies = async (req, res) => { // exporting the getAllMovies function for usage in other file
    try {
    
        const limit = parseInt(req.query.limit, 10) || 6;// requesting the limit of records per page 
        const page = parseInt(req.query.page, 10) || 1;// requesting for current page of book should show 
        const offset = (page - 1) * limit;// finding the how many record should skip before fetching the data 
        
        // Fetch movie with pagination and count total records
        const { count, rows } = await Movie.findAndCountAll({ 
            where: { movie_deleted: 0 }, // Fetch records where movie_deleted is 0
            limit: limit, // Limit of records taken from the user input
            offset: offset // Skips records, calculated from current page
        });


        return res.status(200).json({ // sending the response of total (rows) page and limit
            Movies: rows,
            total: count,
            totalPages:Math.ceil(count/limit)
        });
    } catch (error) {
        console.error('Error fetching books:', error.message);  
        return res.status(500).json({ error: 'Internal Server Error' });// HTTP method of 500 which happen when server does not able to repond for response
    }
};

export const postAllMovies = async (req, res) => {
    try {
        const { name, director_name, writers, img, genre } = req.body;
       
        const userId=req.user;
        // Check for userID
        if(!userId)
            return res.status(400).json({message: "User_id is null "})
        // Check for required fields
        if ( !name || !director_name || !writers || !img ||!genre) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingMovie = await Movie.findOne({ where: { name } });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already exists' });
        }

        // Create a new movie record
        const newMovie = await Movie.create({
            name,
            director_name,
            writers,
            img, 
            posted_by: userId.user_id,
            genre,
            
        });
        console.log(userId)
        return res.status(201).json({
            message: 'Movie added successfully',
            movie: newMovie
            
        });
    } catch (error) {
        console.error('Error adding Movie:', error); // Log the full error object
        return res.status(500).json({ 
            error: 'Internal Server Error',
            details: error.errors // Include details of the validation error
        });
    }
};

export const deleteMovieById= async (req, res)=>{
    const {id}=req.params;
try{

    const movie=await Movie.findByPk(id);
    if(!movie){
        return res.status(404).json({message:"Movie not found"});
    }
    await Rating.update({rating_deleted:1},{where:{user_id:user_id}});
    await Movie.update({movie_deleted:1},{where:{posted_by:user_id}});;
       return res.status(200).json({message:"Movie deleted successfully"});

}
catch (error) {
    console.error(error);
    return res.status(500).json({message:"An error occured while deleting the book", error:error.message});

}
};
