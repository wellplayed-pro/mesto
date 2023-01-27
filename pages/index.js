let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button_act_edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let buttonExit = document.querySelector('.popup__button_act_exit');
let formEl = document.querySelector('.popup__container');
let nameInput = formEl.querySelector('.popup__input_name');
let jobInput = formEl.querySelector('.popup__input_job');

function popupOpen() {
  popup.classList.add('popup__opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}


function popupClose() { 
  popup.classList.remove('popup__opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  console.log(jobInput.value);
  profileDescription.textContent = `${jobInput.value}`;
  console.log(jobInput.value);
  console.log(profileDescription.textContent);
  profileName.textContent = `${nameInput.value}`;
  console.log(nameInput.value);
  console.log(profileName.textContent);
  popupClose();
} 

buttonEdit.addEventListener ('click', popupOpen);
buttonExit.addEventListener ('click', popupClose);
formEl.addEventListener ('submit', handleFormSubmit);