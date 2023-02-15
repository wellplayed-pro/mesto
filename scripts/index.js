function openPopup(targetPopup) {
  targetPopup.classList.add("popup_opened");
}

function closePopup(targetPopup) {
  targetPopup.classList.remove("popup_opened");
}

function addCloseOnClickListner(targetPopup) {
  targetPopup.querySelector(".popup__button_act_exit").addEventListener("click", () => closePopup(targetPopup));
}

// edit profile
const buttonEdit = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");
const editProfilePopup = document.querySelector("#popup-edit-profile");
addCloseOnClickListner(editProfilePopup);

const formEl = document.querySelector(".form-popup-profile");
const nameInput = formEl.querySelector(".popup__input_type_name");
const jobInput = formEl.querySelector(".popup__input_type_job");

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
}
buttonEdit.addEventListener("click", openProfilePopup);

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

formEl.addEventListener("submit", updateProfile);

//  add place in template
const cardTemplate = document.querySelector("#card").content;
const cardsList = document.querySelector(".elements");
function addPlaceInTemplate(element) {

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__picture").style.backgroundImage = `url(${element.link})`;
  cardElement.querySelector(".card__title").textContent = element.name;

  cardElement.querySelector(".card__delete").addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
    });

  cardElement.querySelector(".card__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_active");
  });

  cardElement.querySelector(".card__picture").addEventListener("click", () => {
    showImagePopup.querySelector(".popup__photo").src = element.link;
    showImagePopup.querySelector(".popup__caption").textContent = element.name;
    openPopup(showImagePopup);
  });

  cardsList.prepend(cardElement);
}

// add new place
const addButton = document.querySelector(".profile__button-add");
const addPlaceForm = document.querySelector(".form-popup-photo");
const addPlacePopup = document.querySelector("#popup-add-photo")
addCloseOnClickListner(addPlacePopup);

const inputTitle = addPlaceForm.querySelector(".popup__input_type_title");
const inputLink = addPlaceForm.querySelector(".popup__input_type_link");

function addNewPlace(evt) {
  evt.preventDefault();
  addPlaceInTemplate({
    link: inputLink.value,
    name: inputTitle.value
  })
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

const showImagePopup = document.querySelector("#popup-show-photo");
addCloseOnClickListner(showImagePopup);


initialCards.forEach(function (element) {
  addPlaceInTemplate(element);
});