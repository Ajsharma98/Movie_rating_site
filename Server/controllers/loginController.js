import User from '../Model/User.js';
import Movie from '../Model/Movie.js'
import Rating from '../Model/Rating.js'
import bcrypt from 'bcryptjs';
import PasswordValidator from 'password-validator';
import jwt from 'jsonwebtoken';

// for valditing the password entered 
// Create a schema
var schema = new PasswordValidator();
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export const signupUsers = async (req, res) => {
    try {
        const { email, password, confirmPassword, name } = req.body;
        console.log(req.body);

        // Validate input fields
        if (!email || !password || !confirmPassword || !name) {
            return res.status(400).json({ message: 'Email, password, name and confirm password are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
         // Validate email for lowercase 
        if (email !== email.toLowerCase()) {
            return res.status(400).json({ message: 'Email should be in lowercase' });
        }

        // Validate password strength
        const passwordError = schema.validate(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=await User.create({ email, password: hashedPassword, name });

        return res.status(201).json({ message: 'SignUp successful', user_id:newUser.user_id });
    } catch (error) {
        console.error('Error during signup:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const loginUsers = async (req, res) => {
    try {
    
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.email}, // Payload (user data)
            process.env.JWT_SECRET, // Secret key (should be stored in environment variables)
            { expiresIn: '1hr' } // Token expiration time
        );
       
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logoutUsers = (req, res) => {
    // Client should handle token deletion (e.g., from localStorage)
    return res.status(200).json({ message: 'Logout successful' });
};
 
export const deleleteUserByid = async (req, res)=>{
    const {user_id}=req.params
try{
  const user= await User.findByPk(user_id)
  if(!user){
    return res.status(400).json({message:"User not found"});
  }
  await Movie.update({movie_deleted:1},{where:{posted_by:user_id}});
  await Rating.update({rating_deleted:1},{where:{user_id:user_id}});
  await User.update({user_deleted:1}, {where:{user_id:user_id}});
  return res.status(200).json({message:"User successfully deleted"});
}
catch(error) {
 console.error(error);
 return res.status(500).json({message:"An error occured while deleting the review", error:error.message})
}
}

