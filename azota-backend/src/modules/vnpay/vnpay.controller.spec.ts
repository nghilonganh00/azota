import { Test, TestingModule } from '@nestjs/testing';
import { VnpayController } from './vnpay.controller';

describe('VnpayController', () => {
  let controller: VnpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VnpayController],
    }).compile();

    controller = module.get<VnpayController>(VnpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
