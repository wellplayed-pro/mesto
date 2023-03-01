const popups = document.querySelectorAll('.popup');
function closeAllPopups() {
  popups.forEach(closePopup)
}

popups.forEach(popup => {
  popup.addEventListener('click', () => closePopup(popup))

  popup.querySelector(".popup__container")?.addEventListener('click', (evt) => {
    evt.stopPropagation() // prevent close popup inside container
  })
})

function onEscKeyPressed(event) {
  if (event.key !== 'Escape') return
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

const closeButtons = document.querySelectorAll('.popup__button_act_exit');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// edit profile
const editProfileButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");
const editProfilePopup = document.querySelector("#popup-edit-profile");

const profileForm = document.forms["form-popup-profile"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");

function openProfilePopup() {
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

// show image popup
const showImagePopup = document.querySelector("#popup-show-photo");
const showImagePopupPhoto = showImagePopup.querySelector(".popup__photo");
const showImagePopupCaption = showImagePopup.querySelector(".popup__caption");
function showImagePopupWithPlace(place) {
  showImagePopupPhoto.src = place.link;
  showImagePopupPhoto.alt = place.name;
  showImagePopupCaption.textContent = place.name;
  openPopup(showImagePopup);
}

//  add place in template
const cardTemplate = document.querySelector("#card").content;
function createCard(place) {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".card__title").textContent = place.name;

  cardElement.querySelector(".card__delete").addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  const cardPicture = cardElement.querySelector(".card__picture");
  cardPicture.style.backgroundImage = `url(${place.link})`;
  cardPicture.addEventListener("click", () => {
    showImagePopupWithPlace(place)
  });

  return cardElement
}

const cardsList = document.querySelector(".elements");

function addPlaceInTemplate(element) {
  const cardElement = createCard(element);
  cardsList.prepend(cardElement);
}

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
  evt.target.reset();
  closePopup(addPlacePopup);
}

addButton.addEventListener("click", () => openPopup(addPlacePopup));
addPlaceForm.addEventListener("submit", addNewPlace);


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(addPlaceInTemplate);