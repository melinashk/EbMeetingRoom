import { Controller } from '@nestjs/common';
import { NotificationTokenService } from './notification-token.service';

@Controller('notification-token')
export class NotificationTokenController {
  constructor(
    private readonly notificationTokenService: NotificationTokenService,
  ) {}
}
