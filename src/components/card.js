const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  removeCard,
  openImagePopup,
  likeCard,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".like__counter").textContent =
    cardData.likes.length;

  const likeCounter = cardElement.querySelector(".like__counter");

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (userId === cardData.owner._id) { // !userId || !cardData.owner || 
    deleteButton.addEventListener("click", removeCard);
  } else {
    deleteButton.remove();
  }

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (evt) {
    likeCard(cardData, userId)
      .then((newCardData) => {
        likeCounter.textContent = newCardData.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
        cardData = newCardData;
      })
      .catch((err) => {
        console.log(err);
      });

    // const res = likeCard(cardData, userId)
    //   console.log(res);
    // .then((card) => {
    //   card.likeCounter.textContent = card.likes.length;
    //   evt.target.classList.toggle('card__like-button_is-active');
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  });

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  return cardElement;
}
// функция удаления карточек
export function removeCard(card) {
  card.target.closest(".card").remove();
}