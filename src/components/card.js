import { CloseModal } from "./modal";
import { showImg } from "..";
const openPop = document.querySelector(".popup_is-opened");
export function createCard(cardData, removeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    showImg(cardData);
  });

  return cardElement;
}

export function removeCard() {
  const card = document.querySelector(".card");
  card.remove();
}

const cardformElement = document.querySelector('[name="new-place"]');
const cardName = document.querySelector(".popup__input_type_card-name");
const cardUrl = document.querySelector(".popup__input_type_url");

// форма добавления новых карточек
cardformElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const data = {
    name: cardName.value,
    link: cardUrl.value,
  };

  const card = createCard(data, removeCard, showImg);

  document.querySelector(".places__list").prepend(card);

  CloseModal(openPop);

  cardformElement.reset();
});
