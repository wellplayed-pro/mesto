const formValidation = {
  formSelector: '.form-popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_act_submit',
  inactiveButtonClass: 'popup__button_act_submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function clearInputError(input, config) {
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  input.classList.remove(config.inputErrorClass)
  errorElement.textContent = '';
}

function setInputError(input, errorMsg, config) {
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMsg;
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    form.addEventListener('reset', () => {
      form.querySelectorAll('.popup__input').forEach(input => clearInputError(input, config))
    })
    form.addEventListener('input', () => {
      toggleButton(form, config);
    });

    addInputListners(form, config);
    toggleButton(form, config);
  });
}

const handleFormInput = (evt, config) => {
  const input = evt.target;
  if (input.validity.valid) {
    clearInputError(input, config)
  } else {
    setInputError(input, input.validationMessage, config)
  }
}

const toggleButton = (form, config) => {
  const buttonSubmint = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmint.disabled = !isFormValid;
  buttonSubmint.classList.toggle('popup__button_act_submit_disabled', !isFormValid);
}

const addInputListners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config)
    })
  });
}

enableValidation(formValidation);