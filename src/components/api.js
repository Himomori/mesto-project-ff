const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "608951e4-f2bc-4947-a9fd-ed3c797c3b0f",
    "Content-Type": "application/json",
  },
};

// Загрузка информации о пользователе с сервера
export const getUserData = fetch(`${config.baseUrl}/users/me`, {
  method: "GET",
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

// Загрузка карточек с сервера
export const getCardsData = fetch(`${config.baseUrl}/cards`, {
  method: "GET",
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

// Редактирование профиля
fetch(`${config.baseUrl}/users/me`, {
  method: "PATCH",
  headers: config.headers,
  body: JSON.stringify({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist",
  }),
});

// Добавление новой карточки
export function createNewCard(name, link) {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => res.json());
}

// Постановка лайка(доделать)
export const likeAdd = fetch(
  `${config.baseUrl}/cards/likes/65f21423fa88570012689a2d`,
  {
    method: "PUT",
    headers: config.headers,
  }
).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

export const likeRemove = fetch(
  `${config.baseUrl}/cards/likes/65f21423fa88570012689a2d`,
  {
    method: "DELETE",
    headers: config.headers,
  }
).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});

// //  Обновление аватара пользователя
export function editAvatar(url) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
}
