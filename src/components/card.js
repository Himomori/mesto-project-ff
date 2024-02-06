import { openImagePopup } from "..";
const cardTemplate = document.querySelector("#card-template").content;
const openPop = document.querySelector(".popup_is-opened");
const cardsContainer = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const cardImage = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");

export function createCard(cardData, removeCard, cardLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    cardLike;
  });


  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  return cardElement;
}
// функция удаления карточек
export function removeCard(card) {
  card.target.closest(".card").remove();
}


// функция лайка 
export function cardLike(e) {
  // const deleteButton = document.querySelector(".card__delete-button");
  e.classList.toggle("card__like-button_is-active");
}