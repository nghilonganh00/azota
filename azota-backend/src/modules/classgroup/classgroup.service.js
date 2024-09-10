const db = require("../../models");

const classgroupService = {
  getAll: async ({ teacherId = null }) => {
    try {
      const classgroups = await db.ClassGroup.findAll({
        attributes: ["id", "classGroupName", "teacherId"],
        where: {
          teacherId: teacherId,
        },
        include: [
          {
            model: db.Class,
            attributes: {
              include: [
                [
                  db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Students AS students
                    WHERE students.classId = Classes.id
                  )`),
                  "studentCount",
                ],
              ],
            },
            include: [
              {
                model: db.Student,
                as: "students",
                attributes: [],
              },
            ],
            require: false,
          },
        ],
      });

      return classgroups;
    } catch (error) {
      throw error;
    }
  },
  getAllWithStudent: async ({ teacherId = null }) => {
    try {
      const classgroups = await db.ClassGroup.findAll({
        attributes: ["id", "classGroupName", "teacherId"],
        where: {
          teacherId: teacherId,
        },
        include: [
          {
            model: db.Class,
            attributes: {
              include: [
                [
                  db.sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM Students AS students
                  WHERE students.classId = Classes.id
                )`),
                  "studentCount",
                ],
              ],
            },
            include: [
              {
                model: db.Student,
                as: "students",
              },
            ],
            require: false,
          },
        ],
      });

      console.log("classgroups: ", classgroups);

      return classgroups;
    } catch (error) {
      throw error;
    }
  },
  getAllAssignedExam: async (examId) => {
    try {
      const classgroups = await db.ClassGroup.findAll({
        attributes: ["id", "classGroupName", "teacherId"],
        include: [
          {
            model: db.Class,
            attributes: {
              include: [
                [
                  db.sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM Students AS students
                  WHERE students.classId = Classes.id
                )`),
                  "studentCount",
                ],
              ],
            },
            include: [
              {
                model: db.Student,
                as: "students",
                attributes: [],
              },
            ],
            include: [
              {
                model: db.ExamByClass,
                where: { examId: examId },
                require: false,
              },
            ],
            require: false,
          },
        ],
        having: db.sequelize.where(
          db.sequelize.fn("COUNT", db.sequelize.col("Classes.id")),
          ">",
          0
        ),
        group: ["ClassGroup.id"],
      });

      console.log("classgroups: ", classgroups);

      return classgroups;
    } catch (error) {
      throw new Error(`Error in classGroup.getAllAssignedExam: ${error}`);
    }
  },
  getDetail: async ({ teacherId = null, classGroupId }) => {
    try {
      const classgroups = await db.ClassGroup.findByPk(classGroupId, {
        attributes: ["id", "classGroupName", "teacherId"],
        include: [
          {
            model: db.Class,
            where: {
              teacherId: teacherId,
            },
            attributes: {
              include: [
                [
                  db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Students AS students
                    WHERE students.classId = Classes.id
                  )`),
                  "studentCount",
                ],
              ],
            },
            include: [
              {
                model: db.Student,
                as: "students",
                attributes: [],
              },
            ],
            required: false,
          },
        ],
      });
      return classgroups;
    } catch (error) {
      throw error;
    }
  },
  getDetailWithStudent: async ({ teacherId = null, classGroupId }) => {
    try {
      const classgroups = await db.ClassGroup.findByPk(classGroupId, {
        attributes: ["id", "classGroupName", "teacherId"],
        include: [
          {
            model: db.Class,
            where: {
              teacherId: teacherId,
            },
            attributes: {
              include: [
                [
                  db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM Students AS students
                    WHERE students.classId = Classes.id
                  )`),
                  "studentCount",
                ],
              ],
            },
            include: [
              {
                model: db.Student,
                as: "students",
              },
            ],
            required: false,
          },
        ],
      });
      return classgroups;
    } catch (error) {
      throw error;
    }
  },
  create: async ({ classGroupName, teacherId }) => {
    try {
      const newClassGroup = await db.ClassGroup.create({
        classGroupName,
        teacherId,
      });
      return newClassGroup;
    } catch (error) {
      throw error;
    }
  },
};

export default classgroupService;
