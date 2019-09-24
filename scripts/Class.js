export class Card {
  constructor(name, link) {
    this.cardElement = this.create(name, link);
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.open').addEventListener('click', ()=> {openImagePopup.open(event)});
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
      const card = event.target.parentNode.parentNode;
      card.parentNode.removeChild(card);
  }

  create(nameValue, linkValue) {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');
    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    const image = document.createElement('img');
    image.classList.add('place-card__image');
    image.classList.add('open');
    image.setAttribute('src', `${linkValue}`);
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('place-card__delete-icon');
    const placeDescription = document.createElement('div');
    placeDescription.classList.add('place-card__description');
    const placeTitle = document.createElement('h3');
    placeTitle.classList.add('place-card__name');
    placeTitle.textContent = nameValue;
    const likeButton = document.createElement('button');
    likeButton.classList.add('place-card__like-icon');

    placeCardImage.appendChild(image);
    placeCardImage.appendChild(deleteButton);
    placeDescription.appendChild(placeTitle);
    placeDescription.appendChild(likeButton);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeDescription);

    return placeCard;
  }
}

export class Cardlist {
  constructor(container, array) {
    this.container = container;
    this.cardList = array;
    this.render();
  }

  addCard(name, link) {
    const { cardElement } = new Card(name, link);

    this.container.appendChild(cardElement);
  }

  render() {
    this.cardList.forEach(element => {
      this.addCard(element.name, element.link);
    });
  }
}

export class Popup {
  constructor(popupElement) {
    this.element = popupElement;
  }
  open() {
    this.element.classList.add('popup_is-opened');
  }
  close() {
    this.element.classList.remove('popup_is-opened');
  }
}

export class Api {
  constructor(options) {
    this.api = options;
    this.getInfoAboutSelf();
    this.getInitialCards();
  }

  getInfoAboutSelf() {
    fetch(`${this.api.baseUrl}/users/me`, {
      headers: this.api.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => {
        console.log(result);
        /* Можно лучше:
        * Такие console.log'и лучше удалять своевременно.
        * */
        userNameElement.textContent = result.name;
        userAboutElement.textContent = result.about;
        userAvatarElement.setAttribute('style', `background-image: url(${result.avatar})`);
    })
      .catch(err => {
        console.log(err);
      });
    /* Хорошо:
    * Фетч работает корректно:
    * - Создан отдельный метод в классе Api
    *
    * - Работа с DOM описана внутри цепочки промисов
    *
    * - Присутствуют все обязательные блоки в фетче.
    *
    * - Работа не вызывает ошибок.
    * */
  }

  getInitialCards() {
    fetch(`${this.api.baseUrl}/cards`, {
      headers: this.api.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        new Cardlist(document.querySelector('.places-list'), data);
        console.log(data);
        /* Можно лучше:
        * Такие console.log'и лучше удалять своевременно.
        * */
    })
      .catch(err => {
        console.log(err);
      });
    /* Хорошо:
    * Фетч работает корректно:
    * - Создан отдельный метод в классе Api
    *
    * - Работа с DOM описана внутри цепочки промисов
    *
    * - Присутствуют все обязательные блоки в фетче.
    *
    * - Работа не вызывает ошибок.
    * */
  }

  editInfoAboutSelf(newInfo) {
    return fetch(`${this.api.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.api.headers,
      body: JSON.stringify({
          name: newInfo.name,
          about: newInfo.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        const name = document.querySelector('.user-info__name');
        const about = document.querySelector('.user-info__job');

        name.textContent = selfForm.name.value;
        about.textContent = selfForm.about.value;
        console.log(data);
        /* Можно лучше:
        * Такие console.log'и лучше удалять своевременно.
        * */
      })
      .catch(err => {
        console.log(err);
      });
      /* Хорошо:
      * Фетч работает корректно:
      * - Создан отдельный метод в классе Api
      *
      * - Работа с DOM описана внутри цепочки промисов
      *
      * - Присутствуют все обязательные блоки в фетче.
      *
      * - Работа не вызывает ошибок.
      * */

  }
}