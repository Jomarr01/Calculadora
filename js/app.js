const Calculator = {
  keys: document.querySelectorAll('.tecla'),
  screen: document.getElementById('display'),
  displayValue: '',
  firstValue: '',
  secondValue: '',
  operator: '',
  previousOperator: '',
  // operand: false,

  init: function() {
    this.keystrokeEffect();
  },

  keystrokeEffect: function() {
    for (var i = 0; i < this.keys.length; i++) {
      this.keys[i].onmousedown = this.pressButton;
      this.keys[i].onmouseup = this.releaseButton;
    }
  },

  pressButton: function(ev) {
    let key = ev.target;
    key.style.transform = 'scale(0.95)';
    Calculator.validCharactersEntered(key.id);
  },
  
  releaseButton: function(ev) {
    ev.target.style.transform = 'scale(1)';
  },

  validCharactersEntered: function(keyValue) {
    this.displayValue = this.screen.innerText;

    if (this.displayValue == 0 && this.displayValue.length <= 1) this.displayValue = '';

    if (keyValue == 'on') {
      this.cleanScreen();
    }

    if (keyValue == 'punto') {
      this.addDecimalPoint();
    }

    if (keyValue == 'sign') {
      this.addNegativeSign()
    }

    if (!isNaN(keyValue) && keyValue.length == 1) {
      this.displayValue = this.displayValue + keyValue;
    }

    if (  keyValue == 'mas' || keyValue == 'menos' ||
          keyValue == 'por' || keyValue == 'dividido' ) {

      switch (keyValue) {
        case 'mas':
          this.operator = '+';
          break;
        case 'menos':
          this.operator = '-';
          break;
        case 'por':
          this.operator = '*';
          break;
        case 'dividido':
          this.operator = '/';
          break;
        default:
          break;
      }

      if (this.firstValue == '') {
        this.firstValue = this.displayValue;
        this.previousOperator = this.operator;
      } else {
        this.secondValue = this.displayValue;
        this.firstValue = eval(`${this.firstValue} ${this.previousOperator} ${this.secondValue}`);
        this.previousOperator = this.operator;
        this.secondValue = '';
      }

      console.log('Acumulado en this.firstValue: ', this.firstValue);
      this.displayValue = '';
    }
    
    if (keyValue == 'igual') {
      if (this.secondValue == '') {
        this.secondValue = this.displayValue;
      }
      this.firstValue = eval(`${this.firstValue} ${this.previousOperator} ${this.secondValue}`);
      this.displayValue = this.firstValue;
    }
    
    this.updateScreen();
  },
  
  addDecimalPoint: function() {
    keyValue = '.';
    if (this.displayValue.includes('.')) return;
    if (this.displayValue == '') keyValue = '0.';
    this.displayValue = this.displayValue + keyValue;
  },

  addNegativeSign: function() {
    keyValue = '-';

    if (this.displayValue == '' || this.displayValue == 0) {
      keyValue = '0';
      return
    }

    this.displayValue.includes('-') ?
      this.displayValue = this.displayValue.replace('-', '') :
      this.displayValue = keyValue + this.displayValue;
  },

  // calculateOperations: function () {
  //   console.log("🚀 ~ file: app.js:108 ~ this.mathOperation", this.mathOperation)
  //   this.displayValue = eval(this.mathOperation);
  // },

  cleanScreen: function() {
    this.screen.innerHTML = 0;
    this.displayValue = 0;
    this.firstValue = '';
    this.secondValue = '';
    this.operator = '';
    // this.operand = false;
  },

  updateScreen: function() {
    if (this.displayValue.toString().length <= 8 ) {
      this.screen.innerHTML = this.displayValue;
    } else if (this.operand !== true && this.operand !== false) {
      this.screen.innerHTML = Number(this.displayValue).toExponential(2);
    }
  }
}

Calculator.init();