import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js"
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { apiConfig, validationSettings } from '../utils/utils.js';
import { Api } from "../components/Api.js"
import './index.css'; // добавьте импорт главного файла стилей 
import { PopupWithRemoval } from '../components/PopupWithRemoval.js';

const api = new Api(apiConfig);
let userId;

// Перечень всех валидаторов форм 
const formValidators = {}

// edit profile
const editProfileButton = document.querySelector(".profile__button-edit");

const userInfo = new UserInfo({
  selectorUserName: ".profile__name",
  selectorUserDescription: ".profile__description",
  selectorUserAvatar: ".profile__logo"
})

api.getUserInfo().then(info => {
  userInfo.setUserInfo({ name: info.name, description: info.about })
  userId = info._id;
})

//Редактирование профиля с загрузкой
const editProfilePopup = new PopupWithForm("#popup-edit-profile", { submitCallback: (data) => {
  editProfilePopup.renderPreloader(true, 'Загрузка...')
  api.setUserInfoApi({ name: data.name, about: data.description }).then((data) => {
    userInfo.setUserInfo({ name: data.name, description: data.about })
    editProfilePopup.close();
  })
  .catch((err) => alert(err))
  .finally(() => {
    editProfilePopup.renderPreloader(false);
  })
}
})

editProfileButton.addEventListener("click", () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo())
  formValidators['form-popup-profile'].clearValidationForm()
  editProfilePopup.open()
});



 //Функция создания Popup редактирования аватара
 const popupOpenAvatar = document.querySelector('.profile__avatar-edit');

//Функция открытия Popup аватара
popupOpenAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
  formValidators['form-avatar'].clearValidationForm();
})

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
  addPlacePopup.renderPreloader(true, 'Сохранение...')
  api.addNewCard(place).then(newPlace => {
    addNewPlace(newPlace)
  })
}

const addPlacePopup = new PopupWithForm("#popup-add-photo", { submitCallback: createCardAndAddInMarkup })


addButton.addEventListener("click", () => {
  formValidators['form-popup-photo'].clearValidationForm()
  addPlacePopup.open()
});



//Функция создания Popup подтверждения удаления 
const popupFormDelete = new PopupWithRemoval('.popup_type_delete', {
  submitCallback: (id, card) => {
    popupFormDelete.renderPreloader(true, 'Удаление...');
    api.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupFormDelete.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormDelete.renderPreloader(false);
    })
  }
})

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
