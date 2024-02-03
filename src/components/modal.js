const popups = document.querySelectorAll(".popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupClose = document.querySelectorAll(".popup__close");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");

//функция открытия попапа
export function OpenModal(evt) {
  evt.classList.add("popup_is-opened");
}

// события открытия
profileEditButton.addEventListener("click", function () {
  OpenModal(popupTypeEdit);
});
profileAddButton.addEventListener("click", function () {
  OpenModal(popupTypeNewCard);
});

// функция закрытия
export function CloseModal() {
  popups.forEach(function (popup) {
    popup.classList.remove("popup_is-opened");
  });
}

// событие закрытия
popupClose.forEach(function (evt) {
  evt.addEventListener("click", function () {
    CloseModal();
  });
});

// функция закрытия модального окна кликом на оверлей(закрывается от любого клика по попапу даже по форме. переделать)
// popups.forEach(function () {
//   popup.addEventListener('click', function(evt) {
//     if (evt.currentTarget === evt.targert) {
//       CloseModal(popup);
//     }
//     })
// });

// закрытие любого модального через ескейп
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    CloseModal();
  }
});

// форма редактирования профиля
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = job;

  CloseModal();
}

formElement.addEventListener("submit", handleFormSubmit);
