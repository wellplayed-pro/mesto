class Card {
  constructor(card, templateSelector,handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  };

  /**Получаем шаблон */
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  };

  /**Создаем карточку */
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.card__title');
    this._cardElementPhoto = this._cardElement.querySelector('.card__picture');
    this._cardElementLike = this._cardElement.querySelector('.card__like');
    this._cardElementDelete = this._cardElement.querySelector('.card__delete');

    this._cardElementTitle.textContent = this._name;
    this._cardElementPhoto.src = this._link;
    this._cardElementPhoto.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  };

  /**Лайкаем карточку */
  _likeCard() {
    this._cardElementLike.classList.toggle('card__like_active');
  };

  /** Удаляем карточку */
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };

  /**Слушатели событий */
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._likeCard());
    this._cardElementDelete.addEventListener('click', () => this._deleteCard());
    this._cardElementPhoto.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };