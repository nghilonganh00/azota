import db from "../../models";
import bcrypt from "bcrypt";
import authMethod from "./auth.method";
import userService from "../user/user.service";

const SALT_ROUNDS = 10;

const AuthController = {
  handleRegister: async (req, res) => {
    try {
      const username = req.body.username.toLowerCase();
      const { password, email } = req.body;

      const user = await db.User.findOne({
        where: {
          username: username,
        },
      });

      if (user)
        res.status(409).json({
          message: "Username don't exist",
        });
      else {
        const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
        const newUser = db.User.create({
          username: username,
          password: hashPassword,
          email: email,
        });

        return res.status(200).json({
          data: newUser,
          message: "Create successfully",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Interval Server Error",
      });
    }
  },
  handleLoginByPassword: async (req, res) => {
    try {
      const username = req.body.username.toLowerCase();
      const password = req.body.password;

      const user = await db.User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "Username don't exist",
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "The password is't correct",
        });
      }

      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      const dataForAccessToken = {
        userId: user.id,
      };

      console.log("userId: ", user.id);

      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );

      console.log("accessToken: ", accessToken);

      if (!accessToken) {
        return res.status(401).json({
          message: "Login fail",
        });
      }

      return res.json({
        message: "Login sucessfully",
        data: {
          accessToken: accessToken,
          data: user,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Interval Server Error",
      });
    }
  },
  handleLoginByGoogle: async (req, res) => {
    const googleAccessToken = req.headers["x_authorization"];

    if (!googleAccessToken) {
      return res.status(400).json({
        message: "Access token is missing",
      });
    }

    try {
      //Retrieve Google account information using the access token
      const googleResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            Accept: "application/json",
          },
        }
      );

      if (!googleResponse.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`);
      }

      const googleUser = await googleResponse.json();

      // Check if the user already exists in the database
      // If not, create a new user with the details from the Google account
      let user = await userService.getDetailByEmail(googleUser.email);

      if (!user) {
        user = await userService.create({
          email: googleUser.email,
          fullname: googleUser.name,
        });
      }

      //Generate an access token for the authenticated user
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

      const dataForAccessToken = {
        userId: user.id,
      };

      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
      );

      return res.status(200).json({
        data: { userObj: user, accessToken: accessToken },
        message: "Login by Google successfully",
      });
    } catch (error) {
      console.error(`Error during Google login: `, error);

      return res.status(500).json({
        message: `Login failed by Google with error: ${error.message}`,
      });
    }
  },
};

export default AuthController;