let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button_act_edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonExit = document.querySelector('.popup__button_act_exit');
let formEl = document.querySelector('.popup__container');
let nameInput = formEl.querySelector('.popup__input_name');
let jobInput = formEl.querySelector('.popup__input_job');

function popupOpen() {
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

buttonEdit.addEventListener ('click', popupOpen);
buttonExit.addEventListener ('click', popupClose);
formEl.addEventListener ('submit', handleFormSubmit);