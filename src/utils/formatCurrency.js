import numeral from "numeral";

export function formatCurrency(amount) {
  if (amount >= 1000) {
    return numeral(amount).format("0.[0]a");
  }
  return amount.toString();
}
