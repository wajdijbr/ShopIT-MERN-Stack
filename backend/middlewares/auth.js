const User = require("../models/user");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
// Checks if user is authentificated or not
exports.isAuthentificatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  if (!token || token.length === 0) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decoded.id);
  next();
});

// Handling users roles

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
