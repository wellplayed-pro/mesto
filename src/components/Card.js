import { PopupWithRemoval } from "./PopupWithRemoval"
class Card {
  constructor(card, templateSelector, handlers) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._id = card._id;
    this._isMine = card.isMine;
    this._isLiked = card.isLiked;

    this._templateSelector = document.querySelector(templateSelector).content.querySelector('.card');
    this._handleCardClick = handlers.onClick;
    this._handleDeleteClick = handlers.onDeleteClick;
    this._handleSetLike = handlers.onSetLike;
    this._handleDeleteLike = handlers.onDeleteLike;

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
    this._cardElementLike = this._cardElement.querySelector('.card__like');
    this._cardElementLikeCount = this._cardElement.querySelector('.card__like_count');
    this._cardElementLikeCount.textContent = this._likes.length

    const cardElementDelete = this._cardElement.querySelector('.card__delete');
    if (this._isMine) cardElementDelete.classList.add('visible')
    if (this._isLiked) this._cardElementLike.classList.add(this._cardLikeActiveClass)


    this._setEventListeners();

    return this._cardElement;
  };

  /**Лайкаем карточку */
  _toggleLike() {
    if (this._cardElementLike.classList.contains(this._cardLikeActiveClass)) {
      this._handleDeleteLike(this._id).then(() => {
        this._cardElementLike.classList.toggle(this._cardLikeActiveClass);
      })
    }
    else {
      this._handleSetLike(this._id).then(() => {
        this._cardElementLike.classList.toggle(this._cardLikeActiveClass);
      })
    }
  };

  /** Удаляем карточку */
  _deleteCard = (evt) => {

    const removePopup = new PopupWithRemoval(".popup_type_delete", {
      submitCallback: () => {
        this._handleDeleteClick(this._id).then(() => {

          evt.target.closest('.card').remove()
          this._cardElement = null;
          removePopup.close()
        })
      }
    })
    removePopup.open()
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