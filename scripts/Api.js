import {userNameElement, userAboutElement, userAvatarElement} from './variables'
import {Cardlist} from './Cardlist'
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