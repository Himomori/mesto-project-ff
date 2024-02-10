import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, likeCard, removeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  handleCloseModalByClick,
} from "./components/modal.js";
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
const formNewPlace = document.querySelector('[name="new-place"]');
const cardName = document.querySelector(".popup__input_type_card-name");
const cardUrl = document.querySelector(".popup__input_type_url");

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

function renderCard(card) {
  const cardElement = createCard(card, removeCard, openImagePopup, likeCard);
  cardsContainer.append(cardElement);
}

initialCards.forEach((card) => renderCard(card));

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
export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: cardName.value,
    link: cardUrl.value,
  };

  const card = createCard(data, removeCard, openImagePopup, likeCard);

  cardsContainer.prepend(card);

  closeModal(popupTypeNewCard);

  formNewPlace.reset();
}

formNewPlace.addEventListener("submit", handleCardFormSubmit);

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
