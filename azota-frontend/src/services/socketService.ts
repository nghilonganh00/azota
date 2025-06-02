import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.warn("⚠️ No access token found. WebSocket connection aborted.");
    return socket as Socket;
  }

  if (!socket || !socket.connected) {
    socket = io("http://localhost:8080", {
        auth: { token: accessToken },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");

      socket?.emit("joinRoom");
    });

    socket.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Disconnected from WebSocket:", reason);
    });
  }

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 WebSocket disconnected");
  }
};

export const getSocket = (): Socket | null => socket;
