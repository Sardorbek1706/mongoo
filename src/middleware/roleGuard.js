import { ApiError } from '../helper/errorMessage.js';

export const roleGuard = (...roles) => {
  return (req, res, next) => {
    try {
      if(!req.user || !req.user.role){
        return next(new ApiError(401, `Unauthorized, user info is missing!`))
      }
      const userRole = req.user.role;
      if (!roles.includes(userRole)) {
        return next(new ApiError(403, 'forbidden your role has beem denied!'));
      }
      next();
    } catch (error) {
      console.log(error.message);
      return next(new ApiError(500, `error with role guard!`));
    }
  };
};