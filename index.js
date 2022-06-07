'use strict';
const cardsList = document.getElementById('cards-list');
const HTMLCards = actors
  .filter(({ name, photo }) => name || photo)
  .map((actor) => createCard(actor));

// function createCard(actor) {
//   const h2 = createElement('h2', { classNames: ['card-fullname'] },
//     document.createTextNode(actor.name || 'Noname'))
//   const p = createElement('p', { classNames: ['card-description'] },
//     document.createTextNode(actor.birthdate || 'Month d, YYYY'))
//   const article = createElement('article', { classNames: ['card-container'] }
//     , createWrapper(actor), h2, p)
//   return createElement('li', { classNames: ['card-wrapper'] }, article);
// }
function createCard(actor) {
  return createElement('li', { classNames: ['card-wrapper'] },
    createElement('article', { classNames: ['card-container'] },
      createWrapper(actor),
      createElement('h2', { classNames: ['card-fullname'] },
        document.createTextNode(actor.name || 'Noname')),
      createElement('p', { classNames: ['card-description'] },
        document.createTextNode(actor.birthdate || 'Month d, YYYY'))));
}

cardsList.append(...HTMLCards);

function createWrapper(actor) {
  const photoWrapper = document.createElement('div');
  photoWrapper.classList.add('card-photo-wrapper');
  photoWrapper.setAttribute('id', `wrapper-${actor.id}`);

  const initials = document.createElement('div');
  initials.classList.add('card-initials');
  initials.style.backgroundColor = stringToColour(actor.name);
  initials.append(document.createTextNode(createNameAbbreviation(actor) || 'N.N.'));

  photoWrapper.append(initials);
  createImage(actor)


  return photoWrapper;
}

function createElement(tag, { classNames }, ...children) {
  const element = document.createElement(tag);
  element.classList.add(...classNames);
  element.append(...children);
  return element;
}

function createImage({ id, photo, name }) {
  const img = document.createElement('img');
  img.classList.add('card-photo');
  img.setAttribute('src', photo);
  img.setAttribute('alt', name);
  img.dataset.id = `wrapper-${id}`;
  img.addEventListener('error', photoErrorHandler);
  img.addEventListener('load', photoLoadHandler);
}

function photoErrorHandler({ target }) {
  target.remove();
}

function photoLoadHandler({ target }) {
  const parent = document.getElementById(target.dataset.id);
  parent.append(target);
}

function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).slice(-2);
  }
  return colour;
}

function createNameAbbreviation({ name }, sep = '.') {
  return name.split(' ').map(e => e[0]).join(sep) + sep;
}