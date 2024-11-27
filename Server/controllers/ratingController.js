import Rating from "../Model/Rating.js";
import Movie from "../Model/Movie.js";
export const getAllRating = async (req, res) => {
  // exporting the getAllMovies function for usage in other file
  try {
    let count, rows;
    const limit = parseInt(req.query.limit, 10) || 6; // requesting the limit of records per page
    const page = parseInt(req.query.page, 10) || 1; // requesting for current page of book should show
    const offset = (page - 1) * limit; // finding the how many record should skip before fetching the data
    const rating_filter = Number(req.query.filter);
    const user_role = req.user_role;
    // Fetch movie with pagination and count total records
    if (user_role === "admin") {
      if (rating_filter === 0) {
        ({ count, rows } = await Rating.findAndCountAll({
          where: { rating_deleted: 0 }, // Fetch records where movie_deleted is 0
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
      } else if (rating_filter === 1) {
        ({ count, rows } = await Rating.findAndCountAll({
          where: { rating_deleted: 1 }, // Fetch records where movie_deleted is 0
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
      } else if (rating_filter === 2) {
        ({ count, rows } = await Rating.findAndCountAll({
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
      }
    } else {
      // Fetch movie with pagination and count total records
      ({ count, rows } = await Rating.findAndCountAll({
        where: { Rating_deleted: 0 }, // Fetch records where movie_deleted is 0
        limit: limit, // Limit of records taken from the user input
        offset: offset, // Skips records, calculated from current page
      }));
    }

    return res.status(200).json({
      // sending the response of total (rows) page and limit
      Ratings: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return res.status(500).json({ error: "Internal Server Error" }); // HTTP method of 500 which happen when server does not able to repond for response
  }
};

const updateAvgRating = async (movie_id) => {
  const ratings = await Rating.findAll({
    where: { movie_id },
    attributes: ["rating"],
  });

  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce((total, { rating }) => total + rating, 0);
  const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

  await Movie.update({ avg_rating: avgRating }, { where: { id: movie_id } });
};

export const postAllRating = async (req, res) => {
  try {
    const { rating, Review, movie_id } = req.body;
    const userId = req.user;
    if (!userId) return res.status(400).json({ message: "User_id is null " });
    // Check for required fields
    // const ratings=await Rating.findByPk(Review_id);
    if (!rating || !Review || !movie_id) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // if (ratings.rating_deleted === 1) {
    //     return res.status(403).json({ message: 'This is movie is deleted . Please contact support.' });
    // }
    if (rating < 1 || rating > 10) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 10" });
    }
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (movie.movie_deleted === 1) {
      return res.status(403).json({
        message: "This is movie is deleted . Please contact support.",
      });
    }

    const existingRating = await Rating.findOne({
      where: { user_id: userId.user_id, movie_id },
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.Review = Review;
      await existingRating.save(); //update the database from update query
      await updateAvgRating(movie_id);
      return res.status(200).json({
        message: "Rating updated successfully",
        rating: existingRating,
      });
    } else {
      const newRating = await Rating.create({
        rating,
        Review,
        movie_id,
        user_id: userId.user_id, // Set the user ID from the token
      });
      await updateAvgRating(movie_id);
      return res.status(201).json({
        message: "Rating added successfully",
        rating: newRating,
      });
    }
  } catch (error) {
    console.error("Error adding/updating rating:", error);
    return res.status(500).json({
      error: "Internal Server Error ",
      details: error.error,
    });
  }
};

export const deleteRatingById = async (req, res) => {
  const { Review_id } = req.params;
  const { user_id } = req.user;
  let user_role = req.user_role;
  try {
    const original_user = await Rating.findByPk(Review_id);
    if (user_role === "admin" || user_id === original_user.user_id) {
      const rating = await Rating.findByPk(Review_id);
      if (!rating) {
        return res.status(400).json({ message: "Rating not found" });
      }
      if (rating.rating_deleted) {
        return res.status(400).json({ message: "rating is already deleted" });
      }
      await Rating.update(
        { rating_deleted: 1 },
        { where: { user_id: user_id } }
      );
      return res.status(200).json({ message: "Rating successfully deleted" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured while deleting the review",
      error: error.message,
    });
  }
};

export const getRatingById = async (req, res) => {
  const { Review_id } = req.params;
  const { user_id } = req.user;

  try {
    const movie = await Rating.findOne({
      where: {
        Review_id: Review_id,
        rating_deleted: 0,
      },
    });
    if (!movie) {
      return res.status(404).json({ message: "Rating not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching rating by id:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRatingforMovieById = async (req, res) => {
  const { movie_id } = req.params;
  const rating = await Rating.findAll({
    where: {
      movie_id: movie_id,
      rating_deleted: 0,
    },
  });

  try {
    if (!rating==[]) {
      const movie = await Movie.findAll({
        include: [
          {
            model: Rating,
            where: {
              movie_id: movie_id,
              rating_deleted: 0,
            },
            required: true,
          },
        ],
      });

      if (!movie) {
        return res.status(404).json({ message: "movie rating not found" });
      }
      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: "No rating found" });
    };
  } catch (error) {
    console.error("Error fetching rating for movie by id:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
