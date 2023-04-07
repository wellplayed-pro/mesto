import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js"
import Popup from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {initialCards, validationSettings} from '../utils/utils.js';
import './index.css'; // добавьте импорт главного файла стилей 

// Перечень всех валидаторов форм 
const formValidators = {}


// edit profile
const editProfileButton = document.querySelector(".profile__button-edit");

const editProfilePopup = new Popup("#popup-edit-profile");

const profileForm = document.forms["form-popup-profile"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");
const userInfo = new UserInfo({ selectorUserName: ".profile__name", selectorUserDescription: ".profile__description" })

function openProfilePopup() {
  profileForm.reset();
  const info = userInfo.getUserInfo()
  nameInput.value = info.name;
  jobInput.value = info.description;
  editProfilePopup.open();
}

editProfileButton.addEventListener("click", openProfilePopup);

function updateProfile(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({ name: nameInput.value, description: jobInput.value })
  editProfilePopup.close();
}

profileForm.addEventListener("submit", updateProfile);

// show image popup
const showImagePopup = new PopupWithImage("#popup-show-photo");

const cardTemplate = document.querySelector("#card").content;

// create card
function createCard(item) {
  const card = new Card(item, cardTemplate, (item) => showImagePopup.open(item));
  return card.generateCard();
}

const cardsList = new Section({ items: initialCards, renderer: createCard }, ".elements");
cardsList.renderItems()

// add new place
const addButton = document.querySelector(".profile__button-add");


function addNewPlace(place) {
  cardsList.addItem(createCard({
    link: place.link,
    name: place.title
  }))
  addPlacePopup.close();
}

const addPlacePopup = new PopupWithForm("#popup-add-photo", { submitCallback: addNewPlace })
addPlacePopup.setEventListeners((evt) => formValidators[evt.target.getAttribute('name')].clearValidationForm());
addButton.addEventListener("click", () => addPlacePopup.open());

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);
