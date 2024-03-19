// Функция, которая добавляет класс с ошибкой
export function showInputError(formElement, inputSelector, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add("popup__input-error");
  errorElement.classList.add("popup__input-error_active");
  errorElement.textContent = errorMessage;
}

// Функция, которая удаляет класс с ошибкой
export function hideInputError(formElement, inputSelector) {
  const errorElement = formElement.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove("popup__input-error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = ""; 
}

// Функция, которая проверяет валидность поля
export function checkInputValidity(formElement, inputSelector) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
  if (!inputSelector.validity.valid) {
    showInputError(formElement, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formElement, inputSelector);
  }
}

// Функция, которая добавляет слушатель всем полям формы
export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", function () {
      checkInputValidity(formElement, inputSelector);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Функция, которая добавляет обработчики всем формам
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

// Функция, которая проверяет валидность поля
export function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

// Функция, которая блокирует кнопку
export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button-inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-inactive");
  }
}
