import { createCard } from "./card";

const popups = document.querySelectorAll('.popup');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelectorAll('.popup__close');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const cardImage = document.querySelector('.card__image');

//функция открытия попапа 
export function OpenModal(evt) {
  evt.classList.add('popup_is-opened');
};

// события открытия
profileEditButton.addEventListener('click', function() {
  OpenModal(popupTypeEdit);
});
profileAddButton.addEventListener('click', function() {
  OpenModal(popupTypeNewCard);
});


// модальное окно открывающееся по клику на картинку(доделать потом)
// cardImage.forEach(function(evt) {
//   evt.addEventListener('click', function() {
//    OpenModal(popupTypeImage);
//   });
// });

// cardImage.addEventListener('click', function() {
//   OpenModal(popupTypeImage)
//   createCard();
// });


// функция закрытия
export function CloseModal() {
  popups.forEach(function(popup) {
    popup.classList.remove('popup_is-opened')
    console.log(popup);
  });
}

// событие закрытия
popupClose.forEach(function (evt) {
  evt.addEventListener('click', function() {
   CloseModal();
  })
})

// закрытие любого модального через ескейп
document.addEventListener('keydown' ,function(evt) {
  if(evt.key === 'Escape') {
    CloseModal();
  }
});

















