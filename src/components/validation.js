// const formElement = document.querySelector('.popup__form');
// const inputElement = formElement.querySelector('.popup__input');

// Функция, которая добавляет класс с ошибкой
export function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
export function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
export function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция, которая добавляет слушатель всем полям формы
export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция, которая добавляет обработчики всем формам
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

    setEventListeners(formElement);
}); 

}

enableValidation({
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: '`.${inputElement.id}-error`'
});

// Функция, которая проверяет валидность поля
export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция, которая блокирует кнопку
export function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-inactive');
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-inactive');
  }
};

// пока не поняла
// function buttonState(formElement) {
//   const inputList = Array.from(
//     formElement.querySelectorAll(enableValidation.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

export function clearValidation() {
  
}