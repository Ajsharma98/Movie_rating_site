import jwt from 'jsonwebtoken';// importing the jwt from jsonwebtoken library 
import User from '../Model/User.js';
import dotenv  from "dotenv"
dotenv.config()


    const verifyToken = async (req, res, next) => { // middleware function for verification of token 
        // Get the token from the request headers
    const authHeader = req.headers['authorization'];// taking the authorization from header part 

    if (!authHeader || !authHeader.startsWith('Bearer ')) {  // if authHeader is empty 
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];// splliting the header part and taking second index part element from array 

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });// if there is no token return 401 status code 
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user= await User.findByPk(decoded.id)// 
        
    if (!user){
        return res.status(404).json({message: 'User not found'})
    }
        req.user = user; // Save user data in request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyToken;