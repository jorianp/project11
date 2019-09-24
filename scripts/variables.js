const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

const popupAdd = document.querySelector('#popup-add');
const popupAddOpenButton = document.querySelector('.user-info__button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddButton = popupAdd.querySelector('.popup__button');

const popupEdit = document.querySelector('#popup-edit');
const popupEditOpenButton = document.querySelector('.user-button__edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');
const editSaveButton = popupEdit.querySelector('.popup__button');

const popupImage = document.querySelector('#popup-image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

const createForm = document.forms.new;
const selfForm = document.forms.self;


const userNameElement = document.querySelector('.user-info__name');
const userAboutElement = document.querySelector('.user-info__job');
const userAvatarElement = document.querySelector('.user-info__photo');

export {serverUrl, popupAdd, popupAddOpenButton, popupAddCloseButton, popupAddButton, popupEdit, popupEditOpenButton, popupEditCloseButton, editSaveButton, popupImage, popupImageCloseButton, createForm, selfForm, userNameElement, userAboutElement, userAvatarElement}