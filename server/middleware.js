const jwt = require('jsonwebtoken');
const User = require('./models/userSchema.js');

const checkAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        // If no token is present, the user is not signed in
        return res.status(401).json({ Error: true, message: 'Unauthorized - User not signed in' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists in the database
        const user = await User.findById(decoded.id);

        if (!user) {
            // If the user does not exist, treat it as unauthorized
            return res.status(401).json({ Error: true, message: 'Unauthorized - Invalid user' });
        }
        next();
    } catch (err) {
        // If the token verification fails, treat it as unauthorized
        return res.status(401).json({ Error: true, message: 'Unauthorized - Invalid token' });
    }
};

module.exports = checkAuth;
