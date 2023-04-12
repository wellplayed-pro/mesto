class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    //this._templateSelector = document.querySelector(templateSelector).content.querySelector('.card');
    this._dataLikes = data.likes;
    this.idCard = data._id;
    this.cardData = data;
    this._idUserCard = data.owner._id;
    this._likesCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._putLike = handleCardLike;
    this._removeLike = handleCardDeleteLike;
    this._userId = userId;


  };

  /**Получаем шаблон */
  _getTemplate() {
    const cardElement = this._templateSelector.cloneNode(true);

    return cardElement;
  };

  /**Создаем карточку */
  generateCard() {
    this._cardElement = this._getTemplate();

    this.cardElementTitle = this._cardElement.querySelector('.card__title');
    this.cardElementTitle.textContent = this._name;
    this._cardPicture = this._cardElement.querySelector(".card__picture");
    this._cardPicture.style.backgroundImage = `url(${this._link})`;
    this._cardElementLike = this._cardElement.querySelector('.card__like');
    this._cardElementDelete = this.cardElement.querySelector('.card__delete');
    this._cardElementLikesCount = this.cardElement.querySelector('.card__span');
    this.renderCardLike(this.cardData);


    //Проверка отображения корзины на карточке 
    if (this._idUserCard !== this._userId) {
      this._cardElementDelete.remove();
    }


    this._setEventListeners();

    return this._cardElement;
  };

/** Функция проверки наличия лайка на карточке */
likedCard() {
  return this._dataLikes.some(like => like._id === this._userId)
};

/**Функция изменения установки и снятия лайка */
toggleLike() {
  if (this.likedCard()) {
    this._removeLike(this.idCard);
  } else {
    this._putLike(this.idCard);
  }
}

/**Функция общего отображения лайков и их колличества  */
renderCardLike(card) {
    this._dataLikes = card.likes;
  if(this._dataLikes.length === 0) {
    this._cardElementLikesCount.textContent = '0';
  } else {
    this._cardElementLikesCount.textContent = this._dataLikes.length
  }
  if (this.likedCard()) {
    this._cardElementLike.classList.add('card__like_active');
  } else {
    this._cardElementLike.classList.remove('card__like_active');
  }
}




  /**Лайкаем карточку
  _toggleLike() {
    this._cardElementLike.classList.toggle('card__like_active');
  };
 */
  
  /** Удаляем карточку */
  _deleteCard = (evt) => {
    evt.target.closest('.card').remove()
    this._cardElement = null;
  };

  /**Слушатели событий */
  _setEventListeners() {

    const cardElementDelete = this._cardElement.querySelector('.card__delete');
    this._cardElementLike.addEventListener('click', () => this._toggleLike());
    cardElementDelete.addEventListener('click', this._deleteCard);

    this._cardPicture.addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
  };
};

export { Card };