const authorizeManager = (req, res, next) => {
    if (req.user && req.user.role === 'Manager') {
        next();
    } else {
        res.status(403).json({ 
            success: false, 
            message: 'Access denied. Manager privileges required.' 
        });
    }
};

export default authorizeManager;