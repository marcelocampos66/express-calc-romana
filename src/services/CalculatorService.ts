import { romans } from "../utils/constants";

export class CalculatorService {

  private getDigitValue(digit: string) {
    if (Object.keys(romans).includes(digit)) {
      return romans[digit];
    }
    const splitedDigit = digit.split('');
    const result: number = splitedDigit.reduce((result, digit) => {
      return result + romans[digit];
    }, 0);
    return result;
  }

  public async calculator(op: Op, digits: string[]) {
    const numericDigits: number[] = digits.map(this.getDigitValue);
    if (op === 'sub') {
      return numericDigits.reduce((result, number) => {
        return result - number;
      });
    }
    return numericDigits.reduce((result, number) => {
      return result + number;
    });
  }

}

export default new CalculatorService();
