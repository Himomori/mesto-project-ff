//функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEsc);
}
// функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
}

// функция закрытия попапа по клику на esc
export function handleCloseByEsc(evt) {
  if (evt.key === "Escape") {
    const openPop = document.querySelector(".popup_is-opened");
    closeModal(openPop);
  }
}

// функция закрытия попапа по клику на оверлей и крестик
export function handleCloseModalByClick(modal) {
  if (
    modal.currentTarget === modal.target ||
    modal.target.classList.contains("popup__close")
  ) {
    closeModal(modal.currentTarget);
  }
}
