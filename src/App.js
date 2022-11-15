// @ts-check

const User = require('./User.js');
const LottoManager = require('./LottoManager.js');
const Utils = require('./utils/Utils.js');
const Printer = require('./utils/Printer.js');
const { message } = require('./utils/messages.js');

class App {
  /** @type {User} */
  #user;

  /** @type {LottoManager} */
  #lottoManager;

  constructor() {
    this.#user = new User();
    this.#lottoManager = new LottoManager();
  }

  play() {
    Utils.readLine(message.INPUT_AMOUNT_MESSAGE, (inputAmount) => {
      this.#user.setAmount(inputAmount);
      const amount = this.#user.getAmount();
      const numbersList = this.#lottoManager.generateNumbersList(amount);

      this.#user.setNumbersList(numbersList);
      const userNumbersList = this.#user.getNumbersList();
      Printer.printUserNumberList(userNumbersList);

      this.#askLottoNumbers();
    });
  }

  #askLottoNumbers() {
    Utils.readLine(
      message.INPUT_LOTTO_NUMBERS_MESSAGE,
      (inputWinningNumbers) => {
        const lottoNumbers = Utils.separateNumbers(inputWinningNumbers, ',');
        this.#lottoManager.setWinningNumbers(lottoNumbers);
        this.#askBonusNumber();
      }
    );
  }

  #askBonusNumber() {
    Utils.readLine(message.INPUT_BONUS_NUMBER_MESSAGE, (inputBonus) => {
      this.#lottoManager.setBonusNumber(inputBonus);
      const amount = this.#user.getAmount();
      const userNumbersList = this.#user.getNumbersList();

      const statistics = this.#lottoManager.generateStatistics(
        amount,
        userNumbersList
      );
      Printer.printStatistics(statistics.prizes, statistics.revenue);
      Utils.close();
    });
  }
}

const app = new App();
app.play();

module.exports = App;
