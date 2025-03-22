export class CreateNotificationDto {
  userId: number;

  title: string;

  type: string;

  message: string;

  readAt?: Date;

  extraData?: Record<string, any>;

  createdAt: Date;
}
