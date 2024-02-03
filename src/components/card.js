const openPop = document.querySelector(".popup_is-opened");
export function createCard(cardData, removeCard, showImg) {
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
  cardImage.addEventListener("click", () => showImg(cardData));

  return cardElement;
}

export function removeCard(card) {
  card.target.closest(".card").remove();
}

export function newCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  newCard.querySelector(".card__image").src = data.link;
  newCard.querySelector(".card__image").alt = data.name;
  newCard.querySelector(".card__title").textContent = data.name;

  return newCard;
}

const cardformElement = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardUrlInput = document.querySelector(".popup__input_type_url");

cardformElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const card = newCard(cardNameInput.value, cardUrlInput.value);

  cardNameInput.value = "";
  cardUrlInput.value = "";

  document.querySelector(".places__list").prepend(card);

  CloseModal(openPop);

  cardformElement.reset();
});
