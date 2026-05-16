export const authorizeStaff = (req, res, next) => {
    if (req.user && (req.user.role === 'Staff' || req.user.role === 'Manager')) {
        next();
}else{
    res.status(403).json({ 
        success: false, 
        message: 'Access denied. Staff or Manager privileges required.' 
    });
}
}