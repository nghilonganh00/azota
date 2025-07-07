import { Injectable } from "@nestjs/common";
import moment from "moment";
import { ignoreLogger, VNPay, HashAlgorithm } from "vnpay";

@Injectable()
export class VnpayService {
  private readonly vnpUrl = process.env.VNP_URL;
  private readonly tmnCode = process.env.VNP_TMNCODE;
  private readonly hashSecret = process.env.VNP_HASHSECRET;
  private readonly returnUrl = process.env.VNP_RETURNURL;

  createPaymentUrl({
    amount,
    bankCode,
    orderDescription,
    orderType,
    language = "vn",
    clientIp,
  }: {
    amount: number;
    bankCode?: string;
    orderDescription: string;
    orderType: string;
    language?: string;
    clientIp: string;
  }): string {
    const date = new Date();
    const orderId = moment(date).format("HHmmss");

    const vnpay = new VNPay({
      tmnCode: this.tmnCode,
      secureSecret: this.hashSecret,
      vnpayHost: "https://sandbox.vnpayment.vn",

      testMode: true,
      hashAlgorithm: HashAlgorithm.SHA512,
      enableLog: true,
      loggerFn: ignoreLogger,

      endpoints: {
        paymentEndpoint: "paymentv2/vpcpay.html",
        queryDrRefundEndpoint: "merchant_webapi/api/transaction",
        getBankListEndpoint: "qrpayauth/api/merchant/get_bank_list",
      },
    });

    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: amount, // 100,000 VND
      vnp_IpAddr: clientIp,
      vnp_ReturnUrl: this.returnUrl,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: "Thanh toán đơn hàng #123",
    });

    console.log("Payment URL:", paymentUrl);
    return paymentUrl;
  }
}
