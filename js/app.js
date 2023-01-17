const Calculator = {
  teclas: document.querySelectorAll('.tecla'),
  screen: document.getElementById('display'),
  displayValue: '',

  init: function() {
    this.keystrokeEffect();
  },

  keystrokeEffect: function() {
    for (var i = 0; i < this.teclas.length; i++) {
      this.teclas[i].onmousedown = this.pressButton;
      this.teclas[i].onmouseup = this.releaseButton;
    }
  },

  pressButton: function(ev) {
    let tecla = ev.target;
    tecla.style.transform = 'scale(0.95)';
    
    if ( tecla.id == 'on' ) {
      Calculator.cleanScreen();
    }
    // else if (tecla.id == 'punto') {
    //   Calculator.addCharacterToScreen(tecla.id);
    // }
    else {
      Calculator.addCharacterToScreen(tecla.id);
    }
  },
  
  releaseButton: function(ev) {
    ev.target.style.transform = 'scale(1)';
  },
  
  cleanScreen: function() {
    this.screen.innerHTML = 0;
    this.displayValue = 0;
  },

  addCharacterToScreen: function(number) {
    this.displayValue = this.screen.innerText;

    if (this.displayValue == 0) this.displayValue = '';

    if (number == 'punto') {
      number = '.';
      if (this.displayValue.includes('.')) return;
    }

    if (number == 'sign') {
      number = '-';

      this.displayValue.includes('-') ?
        this.displayValue = this.displayValue.replace('-', '') :
        this.displayValue = number + this.displayValue;

      this.updateScreen();
    } else {
      this.displayValue = this.displayValue + number;
      this.updateScreen();
    }

  },

  updateScreen: function() {
    if (this.displayValue.length <= 8 )
      this.screen.innerHTML = this.displayValue;
  }
}

Calculator.init();