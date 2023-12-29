// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard(cardData, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);

  return cardElement;
}

function removeCard(card) {
  card.target.closest(".card").remove();
}

function renderCard(card) {
  const cardElement = createCard(card, removeCard);
  document.querySelector(".places__list").append(cardElement);
}


initialCards.forEach(card => renderCard(card))