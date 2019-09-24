import {Popup} from './Popup'
export class ImagePopup extends Popup {
    open(event) {
      super.open();
      const image = popupImage.querySelector('.popup__image');
      image.setAttribute('src', `${event.target.getAttribute('src')}`);
    }
  }