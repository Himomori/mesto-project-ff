// const kharachaevsk = new URL('./images/card_1.jpg', import.meta.url);
// const elbrys = new URL('./images/card_2.jpg', import.meta.url);
// const dombai = new URL('./images/card_3.jpg', import.meta.url)

// const whoIsTheGoat = [
//   { name: 'kharachaevsk', link: kharachaevskImage },
//   { name: 'elbrys', link: elbrysImage },
//   { name: 'dombai', link: dombaiImage },
// ];

import './pages/index.css'
import { initialCards } from './components/cards.js';
import { createCard, removeCard } from './components/card.js';
import { OpenModal } from './components/modal.js';
import { CloseModal } from './components/modal.js';
import { CloseEsc } from './components/modal.js';



function renderCard(card) {
  const cardElement = createCard(card, removeCard);
  document.querySelector(".places__list").append(cardElement);
}


initialCards.forEach(card => renderCard(card))