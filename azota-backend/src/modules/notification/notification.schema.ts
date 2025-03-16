import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: null })
  readAt?: Date;

  @Prop({ type: Object })
  extraData: Record<string, any>;

  @Prop({ default: Date.now, expires: 2592000 })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
