import db from "../../models";

const classroomMiddleware = {
  isOwer: async (req, res, next) => {
    const user = req.user;
    const classId = req.body.classId;

    const classroom = await db.Class.findByPk(classId);
    console.log("classroom: ", classroom);
    if (classroom.teacherId === user.id) {
      return next();
    }

    return res.status(401).json({
      message: "You are not the owner of this class",
    });
  },
};

export default classroomMiddleware;
