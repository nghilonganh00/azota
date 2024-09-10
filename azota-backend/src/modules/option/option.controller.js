import optionService from "./option.service";

const optionController = {
  handleChangeIsAnswer: async (req, res) => {
    try {
      const { optionId } = req.params;
      const option = await optionService.changeIsAnswer(optionId);

      return res.status(200).json({
        message: "Change successfully isAnswer",
        data: option,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error: " + error,
      });
    }
  },
};

export default optionController;
