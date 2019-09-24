/* Вопрос 1: в Api метод getInitialCards, можно ли вывести полученную data в глобальную область или так и работать?
  --- На ваше усмотрение. Допустима любая реализация, но реализация с глобал скоуп - не лучший вариант, т.к. в нем будет лежать куча объектов, которые, по сути, нужны только при загрузке/обновлении страницы.
  Вопрос 2: ниже есть функция добавления карточки, на страницу, я правильно понял что ее не надо никуда
  запихивать в массив со всеми объектами, а она автоматически добавляется?
  --- Она отправляется на сервер методом POST, внутри такого фетча вернется новая карточка, с необходимыми параметрами - id/owner.id и т.д. Ее никуда не надо запихивать, разве что отрендерить в DOM
  Вопрос 3: в тз говорится, что для удобства удаления, сделать кнопку удаления постоянно активной, чтобы показывались только
  добавленные мной карточки, но при выполнении этого действия, кнопка появляется у всех карточек
  --- Внутри класса Card необходимо проверять owner.id текущей карточки и, если он совпадает с нашим id, то добавлять в разметку иконку удаления. Если id не совпадает, то иконки удаления не будет в коде.
  Вопрос 4: при удалении не понял как вычленять тот самый id который нам нужен
  -- Некоторые студенты, например, передают в метод Api deleteCard параметр event (В дальнейшем event.target) и уже работают с ним для "ловли" id'шника карточки.

  */

/* Данные вопросы необходимо задавать наставнику,
* но не при отправке работы на проверку.
* */
/* Классы */
import {Card} from './Class'
import {Cardlist} from './Class'
import {Popup} from './Class'
import {Api} from './Class'

class AddCardPopup extends Popup {
  open() {
    super.open();
    const errorName = createForm.querySelector('#spanName');
    const errorLink = createForm.querySelector('#spanLink');

    errorName.classList.remove('popup__input_error-visible');
    errorLink.classList.remove('popup__input_error-visible');

    if (createForm.elements.name.value.length === 0 || createForm.elements.link.value.length === 0) {
      popupAddButton.setAttribute('disabled', true);
      popupAddButton.classList.add('popup__button_disabled');
    } else {
      popupAddButton.removeAttribute('disabled');
      popupAddButton.classList.remove('popup__button_disabled');
    }
  }

  close(){
    super.close();
    createForm.reset();
  }
}
class EditInfoPopup extends Popup {
  open() {
    super.open();
    const userName = document.querySelector('.user-info__name').textContent;
    const userAbout = document.querySelector('.user-info__job').textContent;
    const errorName = selfForm.querySelector('#spanName');
    const errorAbout = selfForm.querySelector('#spanAbout');

    errorName.classList.remove('popup__input_error-visible');
    errorAbout.classList.remove('popup__input_error-visible');

    selfForm.elements.name.value = userName;
    selfForm.elements.about.value = userAbout;

    if (selfForm.elements.name.value.length === 0 || selfForm.elements.about.value.length === 0) {
      editSaveButton.setAttribute('disabled', true);
      editSaveButton.classList.add('popup__button_disabled');
    } else {
      editSaveButton.removeAttribute('disabled');
      editSaveButton.classList.remove('popup__button_disabled');
    }
  }
}
class ImagePopup extends Popup {
  open(event) {
    super.open();
    const image = popupImage.querySelector('.popup__image');
    image.setAttribute('src', `${event.target.getAttribute('src')}`);
  }
}

/* Переменные */
import {serverUrl, popupAdd, popupAddOpenButton, popupAddCloseButton, popupAddButton, popupEdit, popupEditOpenButton, popupEditCloseButton, editSaveButton, popupImage, popupImageCloseButton, createForm, selfForm, userNameElement, userAboutElement, userAvatarElement} from './variables'
const addCardPopup = new AddCardPopup(popupAdd);
const editInfoPopup = new EditInfoPopup(popupEdit);
const openImagePopup = new ImagePopup(popupImage);

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: '11c39413-36e2-46e6-97d4-5aee37cd6c1d',
    'Content-Type': 'application/json'
  }
});







// fetch('http://95.216.175.5/cohort2/cards', {
//   headers: {
//   authorization: '11c39413-36e2-46e6-97d4-5aee37cd6c1d'
// }
// })
//   .then(res => res.json())
//   .then(result => {
//     console.log(result[94])
// });

// /* Надо исправить:
// * Не совсем понятный фетч, зачем он оставлен в коде и, если необходим, почему не вынесен в класс Api.
// *
// * */




// function addCar(newCard) {

//   return fetch('http://95.216.175.5/cohort2/cards' , {
//     method: 'POST',
//     headers: {
//       authorization: '11c39413-36e2-46e6-97d4-5aee37cd6c1d',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: newCard.name,
//       link: newCard.link
//     })
//   })
//     .then(res => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//   /* Надо исправить:
//   * Fetch должен быть описан внутри класса Api.
//   * Отсутствует работа с res в первом .then - нет проверки res.ok и возврата Promise.reject в том случае, если статус некорректнен.
//   *
//   * Работа с DOM (неподсрественное добавление карточки) должны выполняться внутри цепочки промисов, во-первых:
//   * Это не допустит добавления карточки в том случае, если ответ с сервера не пришел
//   *
//   * Второе:
//   * Сервер в данном случае возвращает result, содержащий объект новой карточки - в ней есть owner.id, result.id.
//   *
//   * На данный момент код не работает, карточка появляется после обновления страницы
//   * */

// }


// function deleteCard(id) {

//   return fetch(`http://95.216.175.5/cohort2/cards/${id}` , {
//     method: 'DELETE',
//     headers: {
//       authorization: '11c39413-36e2-46e6-97d4-5aee37cd6c1d',
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(res => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//   /* Надо исправить:
//   * Fetch не вынесен в класс Api
//   *
//   * Работа с DOM должна происходить внутри цепочки промисов.
//   * */
// }


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
  /* Разрывать fetch таким образом, описывая часть промисов "снаружи", а другую - здесь - не лучшая практика.
  * Воспользуйтесь callback-функциями для передачи необходимых методов внутрь других функций/методов классов.
  * */

  // createForm.reset();
  // popupAdd.classList.remove('popup_is-opened');
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
  /* Разрывать fetch таким образом, описывая часть промисов "снаружи", а другую - здесь - не лучшая практика.
  * Воспользуйтесь callback-функциями для передачи необходимых методов внутрь других функций/методов классов.
  * */

  // popupEdit.classList.remove('popup_is-opened');
});

/*
  Код стал выглядеть гораздо лучше, но нужно поправить ещё несколько замечаний описанных выше.
*/


/* Резюме по работе:
* По обязательному функционалу у меня не возникло вопросов - все сделано корректно, описано внутри класса и работает как часы.
* Все описано корректно, есть все обязательные блоки, а работа с DOM выполняет там, где необходимо.
* Поэтому, работа принята.
*
* Однако дополнительный функционал реализован некорректно.
* Почему-то все методы выпали из доп. задания выпали из класса Api и лежат в коде, что является некорректным.
* Промисы разорваны, часть выполняет в одной функции, а finally - в другой.
* Коллбэки для функций (На самом деле вы их используете часто, например даже в addEventListener, не бойтесь использовать их в коде, они очень органичны) -
* https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback
*
* Много инфы по промисам можно почитать здесь:
* https://medium.com/web-standards/%D0%BE%D0%B1%D0%B5%D1%89%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80%D0%BD%D0%BE%D0%B9-%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%B8%D0%BD%D0%BA%D0%B8-b0ed209809ab
*
* Некоторые методы в доп. заданиях не выполнены полностью
* */
