export class CreatePaymentUrlDto {
  amount: number;
  bankCode?: string;
  orderDescription: string;
  orderType: string;
  language?: string;
  clientIp: string;
}