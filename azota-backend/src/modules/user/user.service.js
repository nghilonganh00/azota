import db from "../../models/index";
import generateRandomString from "../../utils/generateRandomString";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userService = {
  isExist: async (id) => {
    try {
      const user = await db.User.findByPk(id);
      return user ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  isTeacher: async (id) => {
    try {
      const userRole = await db.User.findByPk(id).userRole;
      return userRole === "TEACHER" ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getDetailById: async (id) => {
    try {
      const user = await db.User.findByPk(id, {
        attributes: { exclude: ["username", "password"] },
      });
      return user;
    } catch (e) {
      throw e;
    }
  },
  getDetailByEmail: async (email) => {
    try {
      const user = await db.User.findOne({
        attributes: {
          exclude: ["userFullName", "userPhone", "userEmail", "userDOB"],
        },
        where: { userEmail: email },
      });
      return user;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ email, fullname }) => {
    try {
      const username = email.toLowerCase();
      const password = generateRandomString(8);

      const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      const newUser = db.User.create({
        username: username,
        password: hashPassword,
        userFullname: fullname,
        userEmail: email,
      });

      return newUser;
    } catch (error) {
      throw new Error(`Error create new user in user.service: ${error}`);
    }
  },
  createAnonymous: async ({ fullname }) => {
    try {
      const username = generateRandomString(20).toLowerCase();
      const password = generateRandomString(8);

      const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      const newUser = await db.User.create({
        username: username,
        password: hashPassword,
        userFullname: fullname,
      });

      return newUser;
    } catch (error) {
      throw new Error(`Error create anonymous user in user.service: ${error}`);
    }
  },
};

export default userService;
