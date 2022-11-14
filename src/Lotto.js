// @ts-check

const { LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER } = require('./const');

class Lotto {
  #numbers;

  /**
   *
   * @param {number[]} numbers
   */
  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = this.sortLottoNumbers(numbers);
  }

  /**
   *
   * @param {number[]} numbers
   */
  validate(numbers) {
    this.validateNumbersLength(numbers);
    this.validateLottoNumbersBound(numbers);
    this.validateDuplication(numbers);
  }

  /**
   *
   * @param {number[]} numbers
   * @returns {number[]}
   */
  sortLottoNumbers(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  /**
   *
   * @param {number[]} numbers
   */
  validateNumbersLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  /**
   *
   * @param {number[]} numbers
   */
  validateLottoNumbersBound(numbers) {
    numbers.forEach((number) => {
      if (
        !Number.isInteger(number) ||
        number < LOTTO_MIN_NUMBER ||
        number > LOTTO_MAX_NUMBER
      ) {
        throw new Error('[ERROR] 로또 번호는 1이상 45 이하의 정수여야 합니다.');
      }
    });
  }

  /**
   *
   * @param {number[]} numbers
   */
  validateDuplication(numbers) {
    const numberSet = new Set(numbers);

    if (numberSet.size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호에 중복이 있을 수 없습니다.');
    }
  }

  /**
   *
   * @returns {number[]}
   */
  getNumbers() {
    return this.#numbers;
  }
}

module.exports = Lotto;
