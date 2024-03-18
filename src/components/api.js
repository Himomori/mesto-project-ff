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
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then((res) => res.json())
  .then(data => {
    console.log(data);
    return data;
  });
}

export const likeAdd = (cardId) => {
  console.log("likeAdd");
  console.log(cardId);

  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: '608951e4-f2bc-4947-a9fd-ed3c797c3b0f'
  }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data;
  })

};
  
export const likeRemove = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: '608951e4-f2bc-4947-a9fd-ed3c797c3b0f'
  }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data;
  })
};


//  Обновление аватара пользователя
export function editAvatar(url) {
  fetch('https://nomoreparties.co/v1/wff-cohort-8/users/me/avatar', {
    method: "PATCH",
    headers: {
      authorization: "608951e4-f2bc-4947-a9fd-ed3c797c3b0f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: url
    })
  })
}
