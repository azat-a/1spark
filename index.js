// Обработка CTA-кнопок
ctaButtons = document.querySelectorAll('.cta');
console.log(ctaButtons);
for(let button of ctaButtons) {
  button.addEventListener('click', feedbackOpen)
}

document
  .getElementById('feedbackClose')
  .addEventListener('click', feedbackClose);

document
  .getElementById('feedbackBackground')
  .addEventListener('mousedown', feedbackClose);

function feedbackOpen(event) {
  feedbackWindow.classList.add('feedback-open');
  ctaEvent = event.target.dataset.ctaEvent
}

function feedbackClose() {
  feedbackWindow.classList.remove('feedback-open');
  ctaEvent = '';
}


// Попап с формой отправки
const phone = document.getElementById('phone');
const validation = document.getElementById('feedbackValidation');

document
  .getElementById('sendButton')
  .addEventListener('click', function() {
    if(validate(phone.value)) {
      sendForm(phone.value, ctaEvent);
      phone.classList.remove('input-invalid');
      validation.classList.remove('invalid');
    } else {
      phone.classList.add('input-invalid');
      validation.classList.add('feedback-invalid');
    }
  });


// Нижняя форма с номером телефона
const footerPhone = document.getElementById('footerPhone');
const footerValidation = document.getElementById('footerValidation');

document
  .getElementById('footerSendButton')
  .addEventListener('click', function(event) {
    if(validate(footerPhone.value)) {
      sendForm(footerPhone.value, event.target.dataset.ctaEvent);
      footerPhone.classList.remove('input-invalid');
      footerValidation.classList.remove('invalid');
    } else {
      footerPhone.classList.add('input-invalid');
      footerValidation.classList.add('invalid');
    }
  });


// Валидация и отправка данных
function validate(phone) {
  phone = phone.replace(/[() +-]/gi, '');
  console.log(phone);
  if (phone.match(/[0-9]{5,10}/) === null) {
    console.log('false');
    return false;
  }
  console.log('true');
  return true;
}

function sendForm(phone, ctaEvent) {
  const body = {
    date: Date().toString(),
    phone: phone,
    userEvent: ctaEvent,
  }

  fetch(
    './mail.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    .then(response => response.text())
    .then(text => console.log(text));
  
    feedbackClose();
}


// Меню-бургер
const burgerMenu = document.getElementById('burgerMenu');

document
  .getElementById('burgerOpen')
  .addEventListener('click', burgerOpen);

document
  .getElementById('burgerClose')
  .addEventListener('click', burgerClose);

function burgerOpen() {
  burgerMenu.classList.add('burger-open');
}

function burgerClose() {
  burgerMenu.classList.remove('burger-open');
}


// Слайдер
const slider = document.getElementById('slider').children;
console.log(slider);

document
  .getElementById('sliderLeft')
  .addEventListener('click', sliderTurn);
document
  .getElementById('sliderRight')
  .addEventListener('click', sliderTurn);

  console.log(slider[-1]);

function sliderTurn(event) {
  let current;
  for(let i = 0; i < slider.length; i++) {
    if(slider[i].classList.contains('display')) {
      current = i;
    }
  }

  let next;
  if (event.target.id === 'sliderLeft') {
    next = (slider.length + current - 1) % slider.length;
  }
  if (event.target.id === 'sliderRight') {
    next = (current + 1) % slider.length;
  }

  slider[current].classList.remove('display');
  slider[next].classList.add('display');
}
