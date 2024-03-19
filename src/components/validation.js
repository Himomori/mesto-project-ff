// Функция, которая добавляет класс с ошибкой
export function showInputError(formElement, inputSelector, errorMessage, config) {
  const errorElement = formElement.querySelector(eval(config.errorClass));
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.inputErrorClassActive);
  errorElement.textContent = errorMessage;
}

// Функция, которая удаляет класс с ошибкой
export function hideInputError(formElement, inputSelector, config) {
  const errorElement = formElement.querySelector(eval(config.errorClass));
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.inputErrorClassActive);
  errorElement.textContent = ""; 
}

// Функция, которая проверяет валидность поля
export function checkInputValidity(formElement, inputSelector, config) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
  if (!inputSelector.validity.valid) {
    showInputError(formElement, inputSelector, inputSelector.validationMessage, config);
  } else {
    hideInputError(formElement, inputSelector, config);
  }
}

// Функция, которая добавляет слушатель всем полям формы
export function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.buttonElement);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      checkInputValidity(formElement, inputSelector, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Функция, которая добавляет обработчики всем формам
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

// Функция, которая проверяет валидность поля
export function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

// Функция, которая блокирует кнопку
export function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}
