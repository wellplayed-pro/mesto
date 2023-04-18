export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button_act_exit');
  }

  /**открываем Popup */
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClosePopup)
  }

  /**закрываем Popup */
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClosePopup)
  }

  /**закрываем по ESC */
  _handleEscClosePopup = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  /**Закрываем Popup по  оверлею */
  _handleOverlayClosePopup = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  /**Слушаем */
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleOverlayClosePopup);
    this._buttonClose.addEventListener('click', () => this.close());
  }
};