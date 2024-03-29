import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form-popup');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._buttonSubmit = this._form.querySelector('.popup__button_act_submit');
    this._defaultSubmitBtnText = this._buttonSubmit?.textContent;
  }

  //Получаем значения input 
  _getInputValues() {
    this._inputsValues = {};
    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  //передаем форме input переданные данные
  setInputValues = (data) => {
    this._inputList.forEach((input) => {
      input.value = data[input.name]
    });
  }

  //Закрываем и чистим 
  close() {
    this._form.reset();
    super.close();
  }

  //Функция отображения Preloader 
  renderPreloader(loading, displayText) {
    if (!this._buttonSubmit) return;
    if (loading) {
      this._buttonSubmit.textContent = displayText;
    } else {
      this._buttonSubmit.textContent = this._defaultSubmitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    })
  }

};

export { PopupWithForm };