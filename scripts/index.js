let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonExit = document.querySelector('.popup__button_act_exit');
let formEl = document.querySelector('.form-popup');
let nameInput = formEl.querySelector('.popup__input_type_name');
let jobInput = formEl.querySelector('.popup__input_type_job');


function popupOpenProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}


function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();;
  profileDescription.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  popupClose();
}

buttonEdit.addEventListener('click', popupOpenProfile);
buttonExit.addEventListener('click', popupClose);
formEl.addEventListener('submit', handleFormSubmit);




const cardsList = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupImage = document.querySelector('#popup-show-photo').content;
const imageLink = document.querySelector('.popup__photo');
const imageCaption = document.querySelector('.popup__caption');

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__picture').style.backgroundImage = `url(${element.link})`;
  cardElement.querySelector('.card__title').textContent = element.name;

  cardElement.querySelector(".card__delete").addEventListener('click', (evt) => { evt.target.closest('.card').remove(); });

  cardElement.querySelector(".card__like").addEventListener('click', (evt) => {   evt.target.classList.toggle('card__like_active');});

  cardElement.querySelector('.card__picture').addEventListener('click', (evt) => {
    evt.popupImage.classList.add('popup_opened');
    imageCaption.textContent = element.name;
    imageLink.src = element.link;
    ;});
  


  cardsList.append(cardElement);
});

