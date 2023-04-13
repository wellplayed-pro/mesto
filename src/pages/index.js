import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js"
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
<<<<<<< HEAD
import { apiConfig, initialCards, validationSettings } from '../utils/utils.js';
import { Api } from '../components/Api.js';
=======
import { initialCards, validationSettings } from '../utils/utils.js';
>>>>>>> parent of a106e7f (first fix(work))
import './index.css'; // добавьте импорт главного файла стилей 


const api = new Api(apiConfig);
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
.then(([resUser, resCard]) => {
  userCurrentId = resUser._id;
  userInfo.setUserInfo(resUser);
  userInfo.setUserAvatar(resUser);
  cardsContainer.renderItems(resCard, userCurrentId)
})
.catch((err) => alert(err))



// Перечень всех валидаторов форм 
const formValidators = {}

// edit profile
const editProfileButton = document.querySelector(".profile__button-edit");

const userInfo = new UserInfo({ selectorUserName: ".profile__name", selectorUserDescription: ".profile__description" })

function updateProfile(evt) {
  userInfo.setUserInfo({ name: evt.name, description: evt.description })
  editProfilePopup.close();
}

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
  const card = new Card(item, '#card', (item) => showImagePopup.open(item));
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
