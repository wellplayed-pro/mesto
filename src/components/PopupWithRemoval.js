import Popup from "./Popup.js";

class PopupWithRemoval extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector('.popup__button_act_submit');
    this._defaultSubmitBtnText = this._buttonSubmit?.textContent;
  }

  // открытие Popup и получения данных о карточке 
  open(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  // отображение "загрузки"
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
    this._buttonSubmit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitCallback(this.card, this.id);
    })
  }
}

export { PopupWithRemoval };