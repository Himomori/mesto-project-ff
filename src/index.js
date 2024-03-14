import "./pages/index.css";
import { createCard, likeCard, removeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleCloseModalByClick,
} from "./components/modal.js";
import { enableValidation } from "./components/validation.js";
import {
  getUserData,
  getCardsData,
  createNewCard,
  likeAdd,
  likeRemove,
  editAvatar,
} from "./components/api.js";

const popups = document.querySelectorAll(".popup");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
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
const formNewPlace = document.querySelector('[name="new-place"]');
const cardName = document.querySelector(".popup__input_type_card-name");
const cardUrl = document.querySelector(".popup__input_type_url");
const likeCounter = document.querySelector(".like__counter");

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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// форма добавления новых карточек
export function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardName.value;
  const link = cardUrl.value;

  const newCard = {
    name: name,
    alt: name,
    link: link,
    likes: [],
  };

  // Добавление новой карточки
  const newCardElement = createCard(
    newCard,
    removeCard,
    openImagePopup,
    likeCard
  );
  cardsContainer.prepend(newCardElement);
  createNewCard(name, link);

  nameInput.value = "";
  cardUrl.value = "";
  closeModal(popupTypeNewCard);

  formNewPlace.reset();
}

formNewPlace.addEventListener("submit", handleNewCardFormSubmit);

// Функция добавления и удаления лайка
// function handleLikeButton(card, userId) {
//   if (card.likes.some((like) => like._id === userId)) {
//     console.log(card);
//     return likeRemove(card._id);
//   }
//   else {
//     return likeAdd(card._id);
//   }
// }
// console.log(handleLikeButton);

// включение валидации всех форм
enableValidation({
  formElement: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__button",
  inactiveButtonClass: "popup__button-inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "`.${inputElement.id}-error`",
});

// Очистка ошибок валидации

// Редактирование аватара
function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;

  editAvatar(avatarUrl).then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    console.log(data.avatar);
  });
}

// событие открытия редактирования профиля
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});
// событие открытия формы добавления карточки
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});
