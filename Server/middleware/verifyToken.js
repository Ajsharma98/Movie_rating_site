import jwt from 'jsonwebtoken';// importing the jwt from jsonwebtoken library 
import User from '../Model/User.js';
import dotenv from "dotenv"
dotenv.config()


export const verifyToken = async (req, res, next) => { // middleware function for verification of token 
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
        console.log(decoded, "decoded token")
        const user_role=decoded.role;
        const user_id=decoded.id;
        const user = await User.findByPk(user_id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        req.user_role=user_role;
        req.user = user; 
        console.log("User Id in middleware", req.user);
        next(); 
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invalid token' });
    }
};

