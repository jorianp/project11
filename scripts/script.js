/* Классы */
import {Card} from './Card'
import {Cardlist} from './Cardlist'
import {Popup} from './Popup'
import {AddCardPopup} from './AddCardPopup'
import {EditInfoPopup} from './EditInfoPopup'
import {ImagePopup} from './ImagePopup'
import {Api} from './Api'

/* Переменные */
import {serverUrl, popupAdd, popupAddOpenButton, popupAddCloseButton, popupAddButton, popupEdit, popupEditOpenButton, popupEditCloseButton, editSaveButton, popupImage, popupImageCloseButton, createForm, selfForm, userNameElement, userAboutElement, userAvatarElement} from './variables'

const addCardPopup = new AddCardPopup(popupAdd);
const editInfoPopup = new EditInfoPopup(popupEdit);
export const openImagePopup = new ImagePopup(popupImage);

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: '11c39413-36e2-46e6-97d4-5aee37cd6c1d',
    'Content-Type': 'application/json'
  }
});


function addCar(newCard) {

  return fetch(`${serverUrl}/cards` , {
    method: 'POST',
    headers: {
      authorization: '11c39413-36e2-46e6-97d4-5aee37cd6c1d',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      document.location.reload();
    })
}


function renderLoading(isLoading) {
  if(isLoading) {
    editSaveButton.textContent = 'Загрузка...';
  } else {
    popupEdit.classList.remove('popup_is-opened');
    editSaveButton.textContent = 'Сохранить';
  }
}

function renderLoadingToAdd(isLoading) {
  if(isLoading) {
    popupAddButton.textContent = 'Загрузка...';
  } else {
    createForm.reset();
    popupAdd.classList.remove('popup_is-opened');
    popupAddButton.textContent = 'Сохранить';
  }
}



/* Функции */

function validateNameIf() {
  const form = event.currentTarget;
  const name = form.elements.name;
  const error = form.querySelector('#spanName');
  const button = form.querySelector('.popup__button');

  error.classList.add('popup__input_error-visible');
  name.setAttribute('style', 'margin-bottom: 4px;');
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_disabled');
}

function validateName(event) {
  const form = event.currentTarget;
  const name = form.elements.name;
  const error = form.querySelector('#spanName');

  if ((name.validity.tooShort) || (name.validity.tooLong)) {
    validateNameIf();
    error.textContent = 'Должно быть от 2 до 30 символов';
  } else if (name.validity.valueMissing) {
    validateNameIf();
    error.textContent = 'Это обязательное поле';
  } else {
    error.classList.remove('popup__input_error-visible');
    name.removeAttribute('style', 'margin-bottom: 4px;');
  }
}

function validateAboutIf() {
  const form = event.currentTarget;
  const error = form.querySelector('#spanAbout');
  const button = form.querySelector('.popup__button');

  error.classList.add('popup__input_error-visible');
  button.setAttribute('style', 'margin-top: 28px;');
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_disabled');
}

function validateAbout(event) {
  const form = event.currentTarget;
  const about = form.elements.about;
  const error = form.querySelector('#spanAbout');
  const button = form.querySelector('.popup__button');

  if ((about.validity.tooShort) || (about.validity.tooLong)) {
    validateAboutIf();
    error.textContent = 'Должно быть от 2 до 30 символов';
  } else if (about.validity.valueMissing) {
    validateAboutIf();
    error.textContent = 'Это обязательное поле';
  } else {
    error.classList.remove('popup__input_error-visible');
    button.setAttribute('style', 'margin-top: 48px;');
  }
}

function validateLinkIf() {
  const form = document.forms.new;
  const error = form.querySelector('#spanLink');
  const button = form.querySelector('.popup__button');

  error.classList.add('popup__input_error-visible');
  error.textContent = 'Здесь должна быть ссылка';
  button.setAttribute('style', 'margin-top: 28px;');
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_disabled');
}

function validateLink() {
  const form = document.forms.new;
  const link = form.elements.link;
  const error = form.querySelector('#spanLink');
  const button = form.querySelector('.popup__button');
  if (link.validity.typeMismatch) {
    validateLinkIf();
    error.textContent = 'Здесь должна быть ссылка';
  } else if (link.validity.valueMissing) {
    validateLinkIf();
    error.textContent = 'Это обязательное поле';
  } else {
    error.classList.remove('popup__input_error-visible');
    button.setAttribute('style', 'margin-top: 48px;');
  }
}


/* Слушатели событий */

createForm.addEventListener('input', function (event) {
  const form = event.currentTarget;
  const name = form.elements.name;
  const link = form.elements.link;

  if (name.value.length === 0 || link.value.length === 0) {
    popupAddButton.setAttribute('disabled', true);
    popupAddButton.classList.add('popup__button_disabled');
  } else {
    popupAddButton.removeAttribute('disabled');
    popupAddButton.classList.remove('popup__button_disabled');
  }
});
selfForm.addEventListener('input', function (event) {
  const form = event.currentTarget;
  const name = form.elements.name;
  const about = form.elements.about;

  if (name.value.length === 0 || about.value.length === 0) {
    editSaveButton.setAttribute('disabled', true);
    editSaveButton.classList.add('popup__button_disabled');
  } else {
    editSaveButton.removeAttribute('disabled');
    editSaveButton.classList.remove('popup__button_disabled');
  }
});

createForm.addEventListener('input', validateLink);
createForm.addEventListener('input', validateName);
selfForm.addEventListener('input', validateName);
selfForm.addEventListener('input', validateAbout);

popupAddOpenButton.addEventListener('click', ()=>{addCardPopup.open()});
popupAddCloseButton.addEventListener('click', ()=>{addCardPopup.close()});
popupEditOpenButton.addEventListener('click', ()=>{editInfoPopup.open()});
popupEditCloseButton.addEventListener('click', ()=>{editInfoPopup.close()});
popupImageCloseButton.addEventListener('click', ()=>{openImagePopup.close()});

createForm.addEventListener('submit', function(event) {
  event.preventDefault();
  renderLoadingToAdd(true);

  const { name, link } = event.currentTarget.elements;

  addCar({
    name: name.value,
    link: link.value
  })
    .finally(() => {renderLoadingToAdd(false);});
});

selfForm.addEventListener('submit', function(event) {
  event.preventDefault();
  renderLoading(true);

  const { name, about } = event.currentTarget.elements;

  api.editInfoAboutSelf({
    name: name.value,
    about: about.value
  })
    .finally(() => {renderLoading(false);});
});
