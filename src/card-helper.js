import valid from 'card-validator';


class CardHelper {
  constructor() {
    valid.creditCardType.addCard({
      niceType: 'Dankort',
      type: 'dankort',
      patterns: [
        5019,
      ],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'CVC',
        size: 3,
      },
    });
    valid.creditCardType.addCard({
      niceType: 'Laser',
      type: 'laser',
      patterns: [
        6706, 6771, 6709,
      ],
      gaps: [4, 8, 12],
      lengths: [16, 19],
      code: {
        name: 'CVC',
        size: 3,
      },
    });

    valid.creditCardType.addCard({
      niceType: 'Naranja',
      type: 'naranja',
      patterns: [
        589562,
      ],
      gaps: [4, 8, 12],
      lengths: [16],
      code: {
        name: 'CVC',
        size: 3,
      },
    });


    valid.creditCardType.updateCard('hipercard', {
      patterns: [
        384100, 384140, 384160, 606282, 637095, 637568,
      ],
      lengths: [16, 19],
    });
    valid.creditCardType.updateCard('maestro', {
      patterns: [
        5018, 5020, 5038, 6304, 6703, 6708, 6759, 6761, 6762, 6763,
      ],
    });
    valid.creditCardType.updateCard('mastercard', {
      lengths: [16, 19],
    });
  }

  wrapValid(cardNumber) {
    const numberValid = valid.number(cardNumber);

    if (numberValid.card) {
      if (numberValid.card.type === 'naranja') {
        numberValid.isPotentiallyValid = true;
        numberValid.isValid = true;
      }
    }
    return numberValid;
  }

  isCardNumberValid(cardNumber) {
    const cardValid = this.wrapValid(cardNumber);
    return cardValid && cardValid.isValid;
  }


  getCardType(number) {
    const numberValid = this.wrapValid(number);

    if (numberValid.isPotentiallyValid && numberValid.card) {
      return this.convertIssuerName(numberValid.card.type);
    }
    return 'unknown';
  }

  convertIssuerName(issuerName) {
    if (issuerName === 'american-express') {
      return 'amex';
    }
    if (issuerName === 'diners-club') {
      return 'dinersclub';
    }
    return issuerName;
  }
}


export default new CardHelper();
