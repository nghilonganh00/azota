import db from "../../models";
import authMethod from "../auth/auth.method";
import userService from "./user.service";

const userController = {
  handleGetDetail: async (req, res) => {
    const id = req.params.id;
    console.log("id: ", id);
    let user = await userService.getDetailById(id);
    return res.status(200).json({
      data: user,
    });
  },
  handleGetInfo: async (req, res) => {
    try {
      const id = req.user.id;
      const user = await db.User.findByPk(id, {
        attributes: { exclude: ["id", "username", "password"] },
      });

      return res.status(200).json({
        data: user,
        message: "Get info of user successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: {},
      });
    }
  },
  handleRemoveTeacherRole: async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedUser = await db.User.update(
        {
          userRole: "STUDENT",
        },
        { where: { id: userId } }
      );

      return res.status(200).json({
        message: "Removed Teacher-Role Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: "",
      });
    }
  },
  handleRegisterTeacherRole: async (req, res) => {
    try {
      const userId = req.user.id;
      const updatedUser = await db.User.update(
        {
          userRole: "TEACHER",
        },
        { where: { id: userId } }
      );

      return res.status(200).json({
        message: "Registerd Teacher-Role Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: `Internal Server Error: ${error}`,
        data: "",
      });
    }
  },
  handleCreateAnonymousUser: async (req, res) => {
    try {
      const { fullName } = req.body;

      const newUser = await userService.createAnonymous({
        fullname: fullName,
      });
      const newUserJSON = newUser.toJSON();
      console.log("new user json: ", newUserJSON);

      //Generate an access token for the authenticated anonymous user
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      const dataForAccessToken = {
        userId: newUser.id,
      };

      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );

      return res.status(201).json({
        message: "Create anonymous user successfully!",
        data: { ...newUserJSON, accessToken },
      });
    } catch (error) {
      console.log(
        "handleCreateAnonymouUser in userController has error: ",
        error
      );
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default userController;
