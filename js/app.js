const Calculator = {
  keys: document.querySelectorAll('.tecla'),
  screen: document.getElementById('display'),
  displayValue: 0,
  mathOperation: 0,

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

    if (
      keyValue == 'mas' ||
      keyValue == 'menos' ||
      keyValue == 'por' ||
      keyValue == 'dividido' ||
      keyValue == 'igual'
    ) {
      switch (keyValue) {
        case 'mas':
          operator = '+';
          break;
        case 'menos':
          operator = '-';
          break;
        case 'por':
          operator = '*';
          break;
        case 'dividido':
          operator = '/';
          break;
        default:
          break;
      }

      this.mathOperation = `${this.mathOperation} ${operator} ${this.displayValue}`;
      this.displayValue = '';

      if (keyValue == 'igual') {
        this.calculateOperations();
      }
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

  calculateOperations: function () {
    console.log("🚀 ~ file: app.js:108 ~ this.mathOperation", this.mathOperation.slice(3))
    this.displayValue = eval(this.mathOperation.slice(3));
  },

  cleanScreen: function() {
    this.screen.innerHTML = 0;
    this.displayValue = 0;
    this.mathOperation = 0;
  },

  updateScreen: function() {
    if (this.displayValue.toString().length <= 8 )
      this.screen.innerHTML = this.displayValue;
  }
}

Calculator.init();