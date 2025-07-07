import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';

@Module({
  providers: [VnpayService],
  controllers: [VnpayController]
})
export class VnpayModule {}
