import { UseGuards } from "@nestjs/common";
import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtWsGuard } from "../auth/guards/jwt-ws.guard";
import { Notification } from "./notification.schema";

interface AuthenticatedSocket extends Socket {
  user?: { sub: string; username: string };
}

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(JwtWsGuard)
  @SubscribeMessage("joinRoom")
  handleJoinRoom(@ConnectedSocket() client: AuthenticatedSocket) {
    const userId = client.user.sub;
    client.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  }

  sendNotification(userId: string, notification: Notification) {
    this.server.to(userId).emit("newNotification", notification);
  }
}
