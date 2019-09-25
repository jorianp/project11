import {Popup} from './Popup'
import {ImagePopup} from './ImagePopup'
import {openImagePopup} from './script'
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