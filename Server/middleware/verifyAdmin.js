const jwt = require('jsonwebtoken'); // importing the jwt from jsonwebtoken library 

const verifyAdmin = (req, res, next) => {// middleware function for verification of admin 
    // Get the token from the request headers
    const authHeader = req.headers['authorization']; // taking the authorization from header part 

    if (!authHeader|| !authHeader.startsWith('Bearer ')) {// if authHeader is empty 
        return res.status(401).json({ message: 'Access denied, no token provided' });// if there is no token return 401 status code
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    // splliting the header part and taking second index part element from array 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only' });
        }

        req.user = decoded; // Attach decoded user information to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { verifyAdmin };
