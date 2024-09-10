import db from "../../models";

const purposeService = {
  getAll: async () => {
    try {
      const purposes = await db.Purpose.findAll();

      return purposes;
    } catch (error) {
      throw new Error(`Error in getAll of purposeService: ${error}`);
    }
  },
};

export default purposeService;
