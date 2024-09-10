const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const sign = promisify(jwt.sign).bind(jwt);
const verity = promisify(jwt.verify).bind(jwt);

const generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        expiresIn: tokenLife,
      }
    );
  } catch (error) {
    console.log("Error in generate access token: " + error);
    return null;
  }
};

const verifyToken = async (token, secretKey) => {
  try {
    return await verity(token, secretKey);
  } catch (error) {
    console.log("Error in verify access token: " + error);
    return null;
  }
};

export default { generateToken, verifyToken };
