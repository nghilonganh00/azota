import db from "./models";
import authMethod from "./modules/auth/auth.method";

const middleware = {
  isAuth: async (req, res, next) => {
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

    const user = await db.User.findByPk(verified.payload.username);
    req.user = user;

    return next();
  },
};

export default middleware;
