// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;

const renderCard = initialCards.map(function (element) {
  return {
    name: element.name,
    link: element.link,
  };
});

function render() {
  renderCard.forEach(addCard);
}

function addCard(element) {
  const cardElement = document.querySelector("#card-template").cloneNode(true);
  cardElement.content.querySelector(".card__title").textContent = element.name;
  cardElement.content.querySelector(".card__image").src = element.link;
  const deleteButton = cardElement.content.querySelector(
    ".card__delete-button"
  );
  deleteButton.addEventListener("click", removeCard);
  document.querySelector(".places__list").append(cardElement.content);
}
function removeCard(element) {
  element.target.closest(".card").remove();
}

render();
