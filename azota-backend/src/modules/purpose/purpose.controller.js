import purposeService from "./purpose.service";

const purposeController = {
  handleGetAll: async (req, res) => {
    try {
      const purposes = await purposeService.getAll();

      return res.status(200).json({
        message: "Get all the purposes successfully",
        data: purposes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Interval Error Server",
      });
    }
  },
};

export default purposeController;
