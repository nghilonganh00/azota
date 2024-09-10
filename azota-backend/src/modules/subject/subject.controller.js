import subjectService from "./subject.service";

const subjectController = {
  handleGetAll : async (req, res) => {
    try {
      const subjects = await subjectService.getAll();

      return res.status(200).json({
        message: "Get all the subjects successfully",
        data: subjects,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Interval Error Server",
      });
    }
  },
};

export default subjectController;
