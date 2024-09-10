const UserMiddleware = {
  isOwner: async (req, res, next) => {
    try {
      const idFromParam = req.params.id.toString();
      const idFromAuth = req.user.id.toString();

      if (idFromAuth !== idFromParam) {
        return res.status(401).json({
          message: "You don't have permission to perform this action",
        });
      }

      next();
    } catch (error) {
      console.log("Error in isOwner middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default UserMiddleware;
