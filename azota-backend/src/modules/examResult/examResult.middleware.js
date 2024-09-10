const db = require("../../models");

const examResultMiddleware = {
  isOwner: async (req, res, next) => {
    try {
      const user = req.user;
      const { examResultId } = req.params;

      const examResult = await db.ExamResult.findByPk(examResultId);
      if (user.id !== examResult.studentId) {
        return res.status(401).json({
          message: `You don't have permission to perform this action`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: Error in isOwner on examResultMiddleware: ${error}`,
      });
    }
  },
};

export default examResultMiddleware;
