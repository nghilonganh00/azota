const { qrCodeLoginSessions } = require("../modules/auth/auth.service");

const cleanExpireSessions = () => {
  const currentTime = Date.now();

  for (const sessionId in qrCodeLoginSessions) {
    if (qrCodeLoginSessions[sessionId].expiryTime <= currentTime) {
      delete qrCodeLoginSessions[sessionId];
    }
  }
};

setInterval(cleanExpireSessions, 60 * 60 * 1000);
