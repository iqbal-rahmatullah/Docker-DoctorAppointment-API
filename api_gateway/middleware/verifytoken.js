const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: "No auth token, access denied"
            });
        }

        const verified = jwt.verify(token, "passwordKey");
        if (!verified) {
            return res.status(401).json({
                status: 'error',
                message: "Token verification failed, authorization denied."
            });
        }

        // return res.json(verified)
        req.user = verified.id;
        next();
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}

module.exports = verifyToken