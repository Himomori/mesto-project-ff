// Загрузка информации о пользователе с сервера
export const getUserData = fetch ('https://nomoreparties.co/v1/wff-cohort-8/users/me', {
  method: 'GET',
  headers: {
    authorization: '608951e4-f2bc-4947-a9fd-ed3c797c3b0f'
  }
})
  .then(res => res.json());

  // Загрузка карточек с сервера
export const getCardsData = fetch ('https://nomoreparties.co/v1/wff-cohort-8/cards', {
  method: 'GET',
  headers: {
    authorization: '608951e4-f2bc-4947-a9fd-ed3c797c3b0f'
  }
})
.then(res => res.json());

// Редактирование профиля
fetch('https://nomoreparties.co/v1/wff-cohort-8/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '608951e4-f2bc-4947-a9fd-ed3c797c3b0f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
}); 

// Добавление новой карточки
export function createNewCard(name, link) {
  fetch ('https://nomoreparties.co/v1/wff-cohort-8/cards', {
  method: 'POST',
  headers: {
    authorization: '608951e4-f2bc-4947-a9fd-ed3c797c3b0f',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    link: link
  })
  })
  .then(res => res.json())
}