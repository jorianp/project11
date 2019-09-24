import {Popup} from './Popup'
export class EditInfoPopup extends Popup {
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