import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BullModule } from "@nestjs/bull";
import { Notification, NotificationSchema } from "./notification.schema";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationProcessor } from "./notification.processor";
import { NotificationGateway } from "./notifications.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    BullModule.registerQueue({
      name: "notificationQueue",
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationProcessor, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
