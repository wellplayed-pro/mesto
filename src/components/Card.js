class Card {
  constructor(card, templateSelector, handlers) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._userId = card.userId;
    this._isMine = card.owner._id === this._userId;
    this._templateSelector = document.querySelector(templateSelector).content.querySelector('.card');
    this._handleCardClick = handlers.onClick;
    this._handleDeleteClick = handlers.onDeleteClick;
    this._handleSetLikeStatus = handlers.onSetLikeStatus;

    this._cardLikeActiveClass = 'card__like_active';
  };

  /**Получаем шаблон */
  _getTemplate() {
    const cardElement = this._templateSelector.cloneNode(true);

    return cardElement;
  };

  /**Создаем карточку */
  generateCard() {
    this._cardElement = this._getTemplate();

    const cardElementTitle = this._cardElement.querySelector('.card__title');
    cardElementTitle.textContent = this._name;


    this._cardPicture = this._cardElement.querySelector(".card__picture");
    this._cardPicture.style.backgroundImage = `url(${this._link})`;

    const cardElementDelete = this._cardElement.querySelector('.card__delete');
    this._cardElementLike = this._cardElement.querySelector('.card__like');
    this._cardElementLikeCount = this._cardElement.querySelector('.card__like_count');

    if (this._isMine) cardElementDelete.classList.add('visible')
    this.setLikes(this._likes)


    this._setEventListeners();

    return this._cardElement;
  };

  setLikes(likes) {
    const isLiked = likes.some(like => like._id === this._userId);
    if (isLiked) this._cardElementLike.classList.add(this._cardLikeActiveClass)
    else this._cardElementLike.classList.remove(this._cardLikeActiveClass)

    this._cardElementLikeCount.textContent = likes.length
  }

  /**Слушатели событий */
  _setEventListeners() {

    const cardElementDelete = this._cardElement.querySelector('.card__delete');
    this._cardElementLike.addEventListener('click', () => this._handleSetLikeStatus(this._cardElementLike.classList.contains(this._cardLikeActiveClass)));
    cardElementDelete.addEventListener('click', () => this._handleDeleteClick(this._cardElement, this._id));

    this._cardPicture.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };