const bcrypt = require('bcrypt')
const UserModel = require("../Models/User")
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        console.log(req.body); // DEBUG

        const { name, email, password } = req.body;

        // ✅ validation (VERY IMPORTANT)
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists, please login",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userModel = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await userModel.save();

        return res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.log(err); // 🔥 VERY IMPORTANT

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const errorMsg = 'Auth failed email or password is wrong';

        // ✅ validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        // ❌ user not found
        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // ✅ compare password
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        // ✅ success
        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name:user.name
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { signup, login };