import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import io from "../../config/socketIO";
import authMethod from "./auth.method";

// Lưu các phiên đăng nhập bằng Qrcode với trạng thái "chờ xác thực"
export const sessions = {};

const AuthService = {
  generateLoginQrcode: async () => {
    try {
      const sessionId = uuidv4();
      const expiryTime = Date.now() + 10 * 60 * 1000;

      const qrUrl = await QRCode.toDataURL(sessionId);

      sessions[sessionId] = { expiryTime, isApproved: false };

      return { sessionId, qrUrl };
    } catch (error) {
      return new Error(`Failed generateLoginQR in auth.service:  ${error}`);
    }
  },
  approveLoginQrCode: async ({ sessionId, userId }) => {
    try {
      if (sessions[sessionId] && sessions[sessionId].expiryTime > Date.now()) {
        const expiryTime = Date.now() + 10 * 60 * 1000;

        sessions[sessionId] = {
          isApproved: true,
          expiryTime: expiryTime,
          userId: userId,
        };

        if (!accessToken) {
          return new Error(`Failed generate token in approveLoginQrCode`);
        }

        return true;
      }
      return false;
    } catch (error) {
      return new Error(`Failed approveLoginQrCode in auth.service:  ${error}`);
    }
  },
  checkLoginQrCodeApproval: async (sessionId) => {
    console.log("sessions: ", sessions);
    try {
      if (
        sessions[sessionId] &&
        sessions[sessionId].expiryTime > Date.now() &&
        sessions[sessionId].isApproved
      ) {
        const { userId } = sessions[sessionId];

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
          userId: userId,
        };

        const accessToken = await authMethod.generateToken(
          dataForAccessToken,
          accessTokenSecret,
          accessTokenLife
        );

        if (!accessToken) return null;

        delete sessions[sessionId];
        return accessToken;
      }

      return null;
    } catch (error) {
      throw new Error(`Failed approveLoginQrCode in auth.service:  ${error}`);
    }
  },
};

export default AuthService;
