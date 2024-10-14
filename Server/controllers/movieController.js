const Movie=require('../Model/Movie');

exports.getAllMovies = async (req, res) => { // exporting the getAllBooks function for usage in other file
    try {
    
        const limit = parseInt(req.query.limit, 6) || 6;// requesting the limit of records per page 
        const page = parseInt(req.query.page, 10) || 1;// requesting for current page of book should show 
        const offset = (page - 1) * limit;// finding the how many record should skip before fetching the data 
        
        // Fetch movie with pagination and count total records
        const { count, rows } = await Movie.findAndCountAll({ // finding the number of (rows),array of fetched records
            limit: limit, // limit taken from user
            offset: offset// skips calculated from current page
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

exports.postAllMovies = async (req, res) => { // exporting the postAllbooks function for usage in other file
    try {
        const { id, name , img , director_name, writers, rating, genre } = req.body;// accepting the data send by the user(tittle,subjects,bookshelves,..)
        
        if (!id|| !name || !img|| !director_name|| !writers ||! rating ||! genre) {// checking whether all required are not empty
            return res.status(400).json({ message: 'All fields are required' });//if empty then send message to user
        }

        // Create a new book record
        const newMovie = await Movie.create({// saving the record send by the user in newBook variable 
            id,
            name,
            img,
            director_name,
            writers,
            rating,
            genre
        });

        return res.status(201).json({// send the response of succesfull addition of book
            message: 'Movie added successfully',
            book: newBook
        });
    } catch (error) {
        console.error('Error adding Movie:', error.message);  
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};