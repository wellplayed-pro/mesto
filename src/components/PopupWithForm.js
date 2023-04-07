import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._formSubmit = this._popup.querySelector('.form-popup');
    this._inputList = Array.from(this._formSubmit.querySelectorAll('.popup__input'));
    this._buttonSubmit = this._formSubmit.querySelector('.popup__button_act_submit');
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    })
  }

  /**Получаем значения input */
  _getInputValues() {
    this._inputsValues = {};
    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  /**передаем форме input переданные данные*/
  setInputValues = (data) => {
    this._inputList.forEach((input, i) => {
      input.value = Object.values(data)[i];
    });
  }

  /**Закрываем и чистим */
  close() {
    this._formSubmit.reset();
    super.close();
  }

  /**Слушаем */
  setEventListeners(listner) {
    this._formSubmit.addEventListener('submit', (evt) => {
      listner(evt)
    })
  }
};

export { PopupWithForm };