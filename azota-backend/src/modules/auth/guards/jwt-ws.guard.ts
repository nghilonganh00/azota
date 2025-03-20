import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "src/config/jwt.config";

@Injectable()
export class JwtWsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth?.token;

    if (!token) {
      throw new UnauthorizedException("WebSocket authentication failed: No token provided");
    }

    try {
      const decoded = jwt.verify(token, jwtConstants.secret);
      client.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired JWT token");
    }
  }
}
