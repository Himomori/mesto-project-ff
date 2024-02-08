//функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  console.log(popup);
  document.addEventListener("keydown", handleCloseByEsc);
}
// функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  console.log(popup);
  document.removeEventListener("keydown", handleCloseByEsc);
}

// функция закрытия попапа по клику на esc
export function handleCloseByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(openModal);
  }
}

// функция закрытия попапа по клику на оверлей и крестик
export function setCloseModalWindowEventListeners(modal) {
  if (
    modal.currentTarget === modal.target ||
    modal.target.classList.contains(".popup")
  ) {
    closeModal();
  }
}
