import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

//Connect to WebSocket Server & Return a Promise<Socket>
const connectSocket = (): Promise<Socket> => {
  return new Promise((resolve, reject) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.warn("⚠️ No access token found. WebSocket connection aborted.");
      return reject("No access token");
    }

    if (socket && socket.connected) {
      console.log("✅ WebSocket already connected");
      return resolve(socket);
    }

    socket = io("http://localhost:8080", {
      auth: { token: accessToken },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    //Successfully Connected
    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
      socket?.emit("joinRoom");
      resolve(socket as Socket);
    });

    // Handle Connection Errors
    socket.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error.message);
      reject(error);
    });

    // Handle Disconnection
    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected from WebSocket:", reason);
    });
  });
};

//Disconnect WebSocket
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("WebSocket disconnected");
  }
};

//Get the WebSocket Instance (Only if Connected)
export const getSocket = async (): Promise<Socket | null> => {
  if (socket && socket.connected) {
    return socket;
  }
  try {
    return await connectSocket();
  } catch (error) {
    console.error("❌ Failed to connect to WebSocket:", error);
    return null;
  }
};
