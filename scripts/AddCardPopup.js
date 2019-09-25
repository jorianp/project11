import {createForm, popupAddButton} from './variables'
import {Popup} from './Popup'
export class AddCardPopup extends Popup {
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