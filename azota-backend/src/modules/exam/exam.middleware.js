import { Redis } from "ioredis";

const examMiddleware = {
  isOwer: async (req, res, next) => {
    try {
      if (req.user.userRole === "TEACHER") {
        // const
        return next();
      } else {
        return res.status(401).json({
          message: "You aren't the teacher so you can't use this function ",
          data: {},
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  cache: async (req, res, next) => {
    const { hashId } = req.params;

    const redis = new Redis();
    const dataRedis = await redis.get(`exam:${hashId}`);
    if (dataRedis) {
      const examObj = JSON.parse(dataRedis);

      return res.status(200).json({
        data: examObj,
        message: "",
      });
    } else {
      next();
    }
  },
};

export default examMiddleware;
