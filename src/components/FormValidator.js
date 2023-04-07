class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  }

  /**Валидации формы */
  enableValidation() {
    this._addInputListners();
  };

  /**Добавить класс ошибки */
  _setInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  /**Убрать класс ошибки */
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  /**Проверить валидность поля */
  _handleFormInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._setInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**переключение кнопки сабмит */
  _toggleButton() {
    this._isFormValid = this._form.checkValidity();
    this._buttonSubmit.disabled = !this._isFormValid;
    this._buttonSubmit.classList.toggle(this._inactiveButtonClass, !this._isFormValid);
  }

  /**Слушатель всех инпутов */
  _addInputListners() {
    this._toggleButton();
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
        this._toggleButton();
      });
    })
  };

  /**Сброс валидации после закрытия формы */
  clearValidationForm() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}

export { FormValidator };