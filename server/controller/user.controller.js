import UserModel from "../models/user.models.js";
import bcryptjs from 'bcryptjs';
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";

// Helper function to check if input is an email
const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
};

// Register user
export async function register(req, res) {
    try {
        const { name, email, password, mobile } = req.body;
        if (!email || !password || !name || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const userExists = await UserModel.findOne({ $or: [{ email }, { mobile }] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email or mobile number" });
        }
        // Create new user
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const newUser = new UserModel({ name, email, password: hashPassword, mobile });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Login user
export async function login(req, res) {
    try {
        const { emailOrMobile, password } = req.body;
        if (!emailOrMobile || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Determine if emailOrMobile is an email or mobile number
        const query = isEmail(emailOrMobile) ? { email: emailOrMobile } : { mobile: emailOrMobile };

        // Find user by email or mobile
        const user = await UserModel.findOne(query);
        if (!user) {
            return res.status(400).json({ message: "User does not exist with this email or mobile number" });
        }

        // Check password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        // Update user's last login date
        await UserModel.findByIdAndUpdate(user._id, {
            last_login_date: new Date()
        });

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        // Set cookies
        res.cookie('accessToken', accessToken, cookiesOptions);
        res.cookie('refreshToken', refreshToken, cookiesOptions);

        return res.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Logout user
export async function logout(req, res) {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

// Upload user profile
export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId; // auth middleware
        const image = request.file; // multer middleware

        const upload = await uploadImageClodinary(image);
        
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        });

        return response.json({
            message: "Upload profile",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Update user details
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId; //auth middleware
        const { name, email, mobile, password } = request.body;

        let hashPassword = "";

        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword })
        });

        return response.json({
            message: "Updated successfully",
            error: false,
            success: true,
            data: updateUser
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Refresh token
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1];  /// [ Bearer token]

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

        if (!verifyToken) {
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            });
        }

        const userId = verifyToken?._id;

        const newAccessToken = await generatedAccessToken(userId);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        response.cookie('accessToken', newAccessToken, cookiesOption);

        return response.json({
            message: "New access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Get login user details
export async function userDetails(request, response) {
    try {
        const userId = request.userId;

        const user = await UserModel.findById(userId).select('-password -refresh_token');

        return response.json({
            message: 'User details',
            data: user,
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        });
    }
}
