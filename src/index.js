import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, createNewCard } from "./components/card.js";
import { OpenModal, CloseModal, CloseEsc } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// функция открытия модального окна
function showImg(card) {
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupCaption.textContent = card.name;

  console.log(popupImg);
  OpenModal(popupTypeImage);
}

function renderCard(card) {
  const cardElement = createCard(card, removeCard, showImg(card), CloseModal);
  placesList.append(cardElement);
}

initialCards.forEach((card) => renderCard(card));
