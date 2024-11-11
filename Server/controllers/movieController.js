import Movie from "../Model/Movie.js";
import Rating from "../Model/Rating.js";
export const getAllMovies = async (req, res) => {
  // exporting the getAllMovies function for usage in other file
  try {
    // let result;
    let count, rows;
    const limit = parseInt(req.query.limit, 10) || 6; // requesting the limit of records per page
    const page = parseInt(req.query.page, 10) || 1; // requesting for current page of book should show
    const offset = (page - 1) * limit; // finding the how many record should skip before fetching the data
    const movie_filter = Number(req.query.filter);
    const user_role = req.user_role;
    if (user_role === "admin") {
      if (movie_filter === 0) {
        ({ count, rows } = await Movie.findAndCountAll({
          where: { movie_deleted: 0 }, // Fetch records where movie_deleted is 0
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
      } else if (movie_filter === 1) {
        ({ count, rows } = await Movie.findAndCountAll({
          where: { movie_deleted: 1 }, // Fetch records where movie_deleted is 0
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
      } else if (movie_filter === 2) {
        ({ count, rows } = await Movie.findAndCountAll({
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
      } else
        ({ count, rows } = await Movie.findAndCountAll({
          where: { movie_deleted: 0 }, // Fetch records where movie_deleted is 0
          limit: limit, // Limit of records taken from the user input
          offset: offset, // Skips records, calculated from current page
        }));
    } else {
      // Fetch movie with pagination and count total records
      ({ count, rows } = await Movie.findAndCountAll({
        where: { movie_deleted: 0 }, // Fetch records where movie_deleted is 0
        limit: limit, // Limit of records taken from the user input
        offset: offset, // Skips records, calculated from current page
      }));
    }

    //  const {count, rows}= result;
    return res.status(200).json({
      // sending the response of total (rows) page and limit
      Movies: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
    //   movie_filter,
    });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return res.status(500).json({ error: "Internal Server Error" }); // HTTP method of 500 which happen when server does not able to repond for response
  }
};

export const postAllMovies = async (req, res) => {
  try {
    const { name, director_name, writers, img, genre } = req.body;

    const userId = req.user;
    // Check for userID
    if (!userId) return res.status(400).json({ message: "User_id is null " });
    // Check for required fields
    if (!name || !director_name || !writers || !img || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingMovie = await Movie.findOne({ where: { name } });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
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
    console.log(userId);
    return res.status(201).json({
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (error) {
    console.error("Error adding Movie:", error); // Log the full error object
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.errors, // Include details of the validation error
    });
  }
};

export const deleteMovieById = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;
  let user_role = req.user_role;
  try {
    const original_user = await Movie.findByPk(id);
    // console.log(original_user);
    if (user_role === "admin" || user_id === original_user.posted_by) {
      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      if (movie.movie_deleted === 1) {
        return res.status(404).json({ message: "Movie is already deleted " });
      }

      await Rating.update({ rating_deleted: 1 }, { where: { movie_id: id } });
      await Movie.update(
        { movie_deleted: 1 },
        { where: { posted_by: user_id } }
      );
      return res.status(200).json({ message: "Movie deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured while deleting the movie",
      error: error.message,
    });
  }
};

export const getMoviesById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      where: {
        id: id,
        movie_deleted: 0,
      },
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie by id:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
