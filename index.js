class FormController {
  ctaButtons;
  ctaEvent = '';


  constructor() {
    this.ctaButtons = document.querySelectorAll('.cta');
    for(let button of this.ctaButtons) {
      button.addEventListener('click', this.buttonClick.bind(this))
    }
    // Здесь захэндлить модальное окошко
  }

  buttonClick(event) {
    this.ctaEvent = event.target.dataset.ctaEvent;
    // Здесь вывести модальное окошко
    // Здесь повесить eventListener'ы
  }
}

