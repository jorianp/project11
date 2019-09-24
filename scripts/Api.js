import {userNameElement, userAboutElement, userAvatarElement, selfForm} from './variables'
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
        userNameElement.textContent = result.name;
        userAboutElement.textContent = result.about;
        userAvatarElement.setAttribute('style', `background-image: url(${result.avatar})`);
    })
      .catch(err => {
        console.log(err);
      });
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
    })
      .catch(err => {
        console.log(err);
      });
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
      })
      .catch(err => {
        console.log(err);
      });
  }
}