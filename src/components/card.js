const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  deleteCard,
  openImagePopup,
  likeRemove,
  likeAdd,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const likeCounter = cardElement.querySelector(".like__counter");
  likeCounter.textContent = cardData.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", function (evt) {
      deleteCard(cardData._id)
        .then(() => {
          cardElement.closest(".card").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    deleteButton.remove();
  }

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    openImagePopup(cardData);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (evt) {
    likeCard(likeAdd, likeRemove, cardData, userId)
      .then((newCardData) => {
        likeCounter.textContent = newCardData.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
        cardData = newCardData;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return cardElement;
}

// функция добавления лайка
function likeCard(likeAdd, likeRemove, cardData, userId) {
  if (cardData.likes.some((like) => like._id === userId)) {
    return likeRemove(cardData._id);
  } else {
    return likeAdd(cardData._id);
  }
}
