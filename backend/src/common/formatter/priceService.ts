import { Injectable } from "@nestjs/common";
@Injectable()
export class PriceService {
  formatPrice(number: number, currency: "USD" | "TRY"): string {
    const formatter = new Intl.NumberFormat(
      currency === "TRY" ? "tr-TR" : "en-US",
      {
        style: "currency",
        currency,
      },
    );
    return formatter.format(number);
  }
}
