
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
require('dotenv').config();

// signup handler
exports.signup = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        const existingUser = await User.findOne({
            where: { email: email }
          });

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        // Check if password and confirm_password match
        if (password != confirm_password) {
            return res.status(404).json({
                success: false,
                message: "Make sure your password and confirm password match."
            });
        }

        let hashedPassword;
        try {
            // Hash the password
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error('Error hashing password:', hashError);
            return res.status(500).json({
                success: false,
                message: "Error hashing password."
            });
        }

        // Create a new user with the hashed password
        const user = await User.create({
            username, email, password: hashedPassword
        });

        res.status(200).json({
            success: true,
            message: "Data stored, signup successful."
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(400).json({
            success: false,
            message: "User not registered, please try again."
        });
    }
};



// login

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(req.body)
        console.log(email);
        console.log(password);
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill the data."
            })
        }

        const user = await User.findOne({
            where: { email: email }
          });

          if(!user){
            return res.status(401).json({
                success: false,
                message: "new user!! Register first."
            })
          }

          if(await bcrypt.compare(password,user.password)){
            return res.status(200).json({
                success: true,
                message: "user login successfully."
            })
          }
          else{
            return res.status(400).json({
                success: false,
                message: "password is wrong"
            })
          }

    }catch(err){
        // console.error('login error:', err);
        res.status(400).json({
            success: false,
            message: "User not login, please try again."
        });
    }
}