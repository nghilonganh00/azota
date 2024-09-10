import db from "../../models";
import authMethod from "./auth.method";

const AuthMiddleware = {
  isAuth: async (req, res, next) => {
    try {
      const accessTokenFromHeader = req.headers.x_authorization;
      if (!accessTokenFromHeader) {
        return res.status(401).json({
          message: "Not found access token",
        });
      }

      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      const verified = await authMethod.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret
      );

      if (!verified) {
        return res.status(401).json({
          message: "You are not authorized",
        });
      }
      console.log("userId: ", verified);
      const user = await db.User.findByPk(verified.payload.userId);
      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;
      console.log("user from auth middleware: ", req.user.id);

      return next();
    } catch (error) {
      console.log("Error in AuthMiddleware.isAuth: ", error);
      return res.status(500).json({
        message: `Error in AuthMiddleware.isAuth: ${error}`,
      });
    }
  },

  isTeacher: async (req, res, next) => {
    if (req.user.userRole === "TEACHER") {
      return next();
    } else {
      return res.status(401).json({
        message: "You aren't the teacher so you can't use this function ",
      });
    }
  },
};

export default AuthMiddleware;
