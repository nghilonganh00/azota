import db from "../../models";
import homeworkFileService from "./homworkfile.service";

const homeworkFileController = {
  handleGetAllByHomeworkId: async (req, res) => {},
  create: async (req, res) => {
    const { homeworkId, hwfileName, hwfileLink } = req.body;
    const newHomeworkFile = await homeworkFileService.create({
      homeworkId,
      hwfileName,
      hwfileLink,
    });
    return res.status(200).json({
      data: newHomeworkFile,
    });
  },
  handleDelete: async (req, res) => {
    try {
      const { id } = req.params;

      if (!db.HomeworkFile.findByPk(id)) {
        return res.status(404).json({
          message: `The homework file with id = ${id} don't exist`,
          data: {},
        });
      }

      const newHomeworkFile = await homeworkFileService.delete(id);
      return res.status(200).json({
        message: "Delete successfully",
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        data: {},
      });
    }
  },
};

export default homeworkFileController;
