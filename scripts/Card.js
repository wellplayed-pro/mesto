class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  };

  /**Получаем шаблон */
  _getTemplate() {
    const cardElement = this._templateSelector.cloneNode(true);

    return cardElement;
  };

  /**Создаем карточку */
  createCard() {
    this._cardElement = this._getTemplate();

    const cardElementTitle = this._cardElement.querySelector('.card__title');
    cardElementTitle.textContent = this._name;


    this._cardPicture = this._cardElement.querySelector(".card__picture");
    this._cardPicture.style.backgroundImage = `url(${this._link})`;
    this._cardElementLike = this._cardElement.querySelector('.card__like');

    this._setEventListeners();

    return this._cardElement;
  };

  /**Лайкаем карточку */
  _likeCard() {
    this._cardElementLike.classList.toggle('card__like_active');
  };

  /** Удаляем карточку */
  _deleteCard(evt) {
    evt.target.closest('.card').remove()
    this._cardElement = null;
  };

  /**Слушатели событий */
  _setEventListeners() {

    const cardElementDelete = this._cardElement.querySelector('.card__delete');
    this._cardElementLike.addEventListener('click', () => this._likeCard());
    cardElementDelete.addEventListener('click', this._deleteCard);

    this._cardPicture.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };