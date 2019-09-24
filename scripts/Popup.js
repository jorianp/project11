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