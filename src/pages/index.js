import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js"
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { apiConfig, initialCards, validationSettings } from '../utils/utils.js';
import { Api } from "../components/Api.js"
import './index.css'; // добавьте импорт главного файла стилей 
import { PopupWithRemoval } from '../components/PopupWithRemoval.js';

const api = new Api(apiConfig);
let userId;

// Перечень всех валидаторов форм 
const formValidators = {}

// edit profile
const editProfileButton = document.querySelector(".profile__button-edit");

const userInfo = new UserInfo({ selectorUserName: ".profile__name", selectorUserDescription: ".profile__description" })

function updateProfile(evt) {
  api.setUserInfoApi({ name: evt.name, about: evt.description }).then((data) => {
    userInfo.setUserInfo({ name: data.name, description: data.about })
    editProfilePopup.close();
  })
}

api.getUserInfo().then(info => {
  userInfo.setUserInfo({ name: info.name, description: info.about })
  const logo = document.querySelector('.profile__logo');
  logo.src = info.avatar
  userId = info._id;
})


const editProfilePopup = new PopupWithForm("#popup-edit-profile", { submitCallback: updateProfile });

editProfileButton.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo())
  formValidators['form-popup-profile'].clearValidationForm()
  editProfilePopup.open()
});

// show image popup
const showImagePopup = new PopupWithImage("#popup-show-photo");

// create card
function createCard(item) {
  const card = new Card({ ...item, isMine: item.owner._id === userId, isLiked: item.likes.some(like => like._id === userId) }, '#card', {
    onClick: (item) => showImagePopup.open(item),
    onDeleteClick: (cardId) => api.deleteCard(cardId),
    onSetLike: (cardId) => api.putCardLike(cardId),
    onDeleteLike: (cardId) => api.deleteCardLike(cardId)
  })
  return card.generateCard();
}

let cardsList;
api.getInitialCards().then(cards => {
  cardsList = new Section({ items: cards, renderer: createCard }, ".elements");
  cardsList.renderItems()
})

// add new place
const addButton = document.querySelector(".profile__button-add");


function addNewPlace(place) {
  cardsList.addItem(createCard(place))
  addPlacePopup.close();
}

function createCardAndAddInMarkup(place) {
  api.addNewCard(place).then(newPlace => {
    addNewPlace(newPlace)
  })
}

const addPlacePopup = new PopupWithForm("#popup-add-photo", { submitCallback: createCardAndAddInMarkup })
addButton.addEventListener("click", () => {
  formValidators['form-popup-photo'].clearValidationForm()
  addPlacePopup.open()
});

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
