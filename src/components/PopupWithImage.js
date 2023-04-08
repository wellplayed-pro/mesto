import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__photo');
    this._nameCard = this._popup.querySelector('.popup__caption');
    this.setEventListeners()
  }

  /**Открываем Popup с внесением данных */
  open(place) {
    this._imgCard.src = place.link;
    this._imgCard.alt = place.name;
    this._nameCard.textContent = place.name
    super.open();
  }

};

export { PopupWithImage };