const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "608951e4-f2bc-4947-a9fd-ed3c797c3b0f",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Загрузка информации о пользователе с сервера
export const getUserData = fetch(`${config.baseUrl}/users/me`, {
  method: "GET",
  headers: config.headers,
}).then(getResponseData);

// Загрузка карточек с сервера
export const getCardsData = fetch(`${config.baseUrl}/cards`, {
  method: "GET",
  headers: config.headers,
}).then(getResponseData);

// Редактирование профиля
export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(getResponseData);
}

// Добавление новой карточки
export function createNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getResponseData);
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

export const likeAdd = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(getResponseData);
};

export const likeRemove = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponseData);
};

export function editAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(getResponseData);
}
