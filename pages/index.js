import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, validationSettings } from '../utils/utils.js';
import './index.css';

const popups = document.querySelectorAll('.popup');
function closeAllPopups() {
  popups.forEach(closePopup)
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__button_act_exit')) {
      closePopup(popup)
    }
  })
})

function onEscKeyPressed(evt) {
  if (evt.key !== 'Escape') return
  closeAllPopups()
}

function openPopup(targetPopup) {
  targetPopup.classList.add("popup_opened");
  document.addEventListener('keydown', onEscKeyPressed)
}

function closePopup(targetPopup) {
  targetPopup.classList.remove("popup_opened");
  document.removeEventListener('keydown', onEscKeyPressed)
}

// edit profile
const editProfileButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");
const editProfilePopup = document.querySelector("#popup-edit-profile");

const profileForm = document.forms["form-popup-profile"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");

function openProfilePopup() {
  profileForm.reset();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
}

editProfileButton.addEventListener("click", openProfilePopup);

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

profileForm.addEventListener("submit", updateProfile);


const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".elements");


//create popupWithImage 
const cardImagePopup = new PopupWithImage('#popup-show-photo');


// create card (need rework)
function createCard(item) {
  const card = new Card(item, cardTemplate, () => showImagePopupWithPlace(item));
  return card.generateCard();
}

//create Section
const cardsContainer = new Section({
  renderer: (item, userID) => {
    cardsContainer.addItem(createCard(item, userID));
  },
}, '.elements'
);

// Popup buttons
const popupOpenEdit = document.querySelector('.profile__button-edit');
const popupOpenAdd = document.querySelector('.profile__button-add');
const popupOpenAvatar = document.querySelector('.profile__logo');
let userCurrentId;

//form profile 
const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserDescription: '.profile__name',
  selectorUserLogo: '.profile__logo'
})


//openPopup edit profile
popupOpenEdit.addEventListener('click', () => {
  popupFormProfile.open();
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  validatorForms['form-popup-profile'].clearValidationForm();
});




// add new place
const addButton = document.querySelector(".profile__button-add");
const addPlaceForm = document.forms["form-popup-photo"];
const addPlacePopup = document.querySelector("#popup-add-photo")

const inputTitle = addPlaceForm.querySelector(".popup__input_type_title");
const inputLink = addPlaceForm.querySelector(".popup__input_type_link");

function addNewPlace(evt) {
  evt.preventDefault();
  addPlaceInTemplate({
    link: inputLink.value,
    name: inputTitle.value
  })
  addPlaceForm.clearValidationForm();
  closePopup(addPlacePopup);
}

addButton.addEventListener("click", () => openPopup(addPlacePopup));
addPlaceForm.addEventListener("submit", addNewPlace);


initialCards.forEach(addPlaceInTemplate);

<<<<<<< HEAD:pages/index.js
=======
const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_act_submit',
  inactiveButtonClass: 'popup__button_act_submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// получение экземпляров класса
const formValidators = {}
>>>>>>> parent of 0ced6f4 (pr7-fix review):scripts/index.js

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);
