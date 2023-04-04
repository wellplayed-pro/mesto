import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__photo');
    this._nameCard = this._popup.querySelector('.popup__caption');
  }

  /**Открываем Popup с внесением данных */
  open(place) {
    super.open();
    this._imgCard.src = place.link;
    this._imgCard.alt = place.name;
    this._nameCard.textContent = place.name
  }

};

export { PopupWithImage };