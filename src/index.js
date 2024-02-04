import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, newCard} from "./components/card.js";
import { OpenModal, CloseModal} from "./components/modal.js";

const placesList = document.querySelector(".places__list");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// функция открытия модального окна
function showImg(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  OpenModal(popupTypeImage);
}

function renderCard(card) {
  const cardElement = createCard(card, removeCard, showImg, CloseModal);
  placesList.append(cardElement);
}

initialCards.forEach((card) => renderCard(card));
