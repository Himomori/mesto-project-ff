const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, removeCard, openImagePopup, likeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector('.like__counter').textContent = cardData.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  return cardElement;
}
// функция удаления карточек
export function removeCard(card) {
  card.target.closest(".card").remove();
}
// функция лайка карточек
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
