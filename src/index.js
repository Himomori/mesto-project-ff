import "./pages/index.css";
import { createCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleCloseModalByClick,
} from "./components/modal.js";
import {
  enableValidation,
  hideInputError,
  toggleButtonState,
} from "./components/validation.js";
import {
  getUserData,
  getCardsData,
  createNewCard,
  editProfile,
  deleteCard,
  likeAdd,
  likeRemove,
  editAvatar,
} from "./components/api.js";

const popups = document.querySelectorAll(".popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupNewAvatar = document.querySelector(".popup_type_avatar");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const cardsContainer = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const formAvatar = document.querySelector('[name="edit-avatar"]');
const formNewPlace = document.querySelector('[name="new-place"]');
const avatarInput = document.querySelector(".popup__input_type_avatar");
const cardName = document.querySelector(".popup__input_type_card-name");
const cardUrl = document.querySelector(".popup__input_type_url");
const buttonTypeAvatar = document.querySelector(".popup__button_type_avatar");
const buttonTypeEdit = document.querySelector(".popup__button_type_edit");
const buttonTypeNewCard = document.querySelector(
  ".popup__button_type_new-card"
);

// функция открытия модального окна картинки карточки
export function openImagePopup(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}
// перебор циклом закрытия попапов по кнопке и оверлею
popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    handleCloseModalByClick(evt);
  });
});

// загрузка информации о пользователе и карточек с сервера и их вывод
Promise.all([getUserData, getCardsData]).then(([userData, cardsData]) => {
  let userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  cardsData.forEach((item) => {
    cardsContainer.append(
      createCard(item, removeCard, openImagePopup, likeCard, userId)
    );
  });
});

// форма редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault();
  buttonTypeEdit.textContent = "Сохранение...";
  editProfile(nameInput.value, jobInput.value)
    .then((element) => {
      const userName = element.name;
      const userAbout = element.about;

      profileTitle.textContent = userName;
      profileDescription.textContent = userAbout;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonTypeEdit.textContent = "Сохранить";
    });
  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener("submit", profileFormSubmit);

// форма добавления новых карточек
export function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  buttonTypeNewCard.textContent = "Сохранение...";
  const name = cardName.value;
  const link = cardUrl.value;
  Promise.all([createNewCard(name, link), getUserData])
    .then(([newCardData, userData]) => {
      const newCardElement = createCard(
        newCardData,
        removeCard,
        openImagePopup,
        likeCard,
        userData._id
      );
      nameInput.value = "";
      cardUrl.value = "";
      cardsContainer.prepend(newCardElement); 
    })
    .finally(() => {
      buttonTypeNewCard.textContent = "Сохранить";
    });

  closeModal(popupTypeNewCard);
  formNewPlace.reset();
}

formNewPlace.addEventListener("submit", handleNewCardFormSubmit);

// функция удаления карточек
export function removeCard(cardData) {
  return deleteCard(cardData._id);
}

// Функция добавления и удаления лайка
function likeCard(cardData, userId) {
  if (cardData.likes.some((like) => like._id === userId)) {
    return likeRemove(cardData._id);
  } else {
    const res = likeAdd(cardData._id);
    return res;
  }
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: ".popup__button-inactive",
  inputErrorClass: ".popup__input-error",
  inputErrorClassActive: ".popup__input-error_active",
  errorClass: ".popup__error_visible",
};

// // включение валидации всех форм
function clearValidation(formElement, validationConfig) {
  const inputElements = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClassActive);
  });
  const errorElements = Array.from(
    formElement.querySelectorAll(validationConfig.inputErrorClass)
  );
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(validationConfig.inputErrorClassActive);
  });
}
// Редактирование аватара
function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  buttonTypeAvatar.textContent = "Сохранение...";

  editAvatar(avatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonTypeAvatar.textContent = "Сохранить";
    });

  closeModal(popupNewAvatar);
}

formAvatar.addEventListener("submit", handleFormSubmitAvatar);

// событие открытия редактирования профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupTypeEdit);
});
// событие открытия формы добавления карточки
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});
// cобытие открытия формы смены аватара
profileImage.addEventListener("click", function () {
  openModal(popupNewAvatar);
});
