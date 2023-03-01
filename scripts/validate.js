const formElement = document.querySelector('.form-popup');
const inputElement = formElement.querySelector('.popup__input');
const submitButtonSelector = ('.popup__button_act_submit');
const inactiveButtonClass = ('popup__button_act_exit');
const inputErrorClass = ('popup__input-error');
const errorClass = ('popup__error_visible');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error-visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-error');
  errorElement.classList.remove('popup__input-error-visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation () {
  const formList = Array.from(formElement.querySelectorAll('.popup'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function () {
      setEventListeners(formElement);
    });
     });
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 