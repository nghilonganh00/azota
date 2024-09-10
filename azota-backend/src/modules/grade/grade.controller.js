import gradeService from "./grade.service";

const gradeController = {
  handleGetAll : async (req, res) => {
    try {
      const grades = await gradeService.getAll();

      return res.status(200).json({
        message: "Get all the grades successfully",
        data: grades,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Interval Error Server",
      });
    }
  },
};

export default gradeController;
