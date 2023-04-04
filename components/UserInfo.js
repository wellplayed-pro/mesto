class UserInfo {
  constructor({ selectorUserName, selectorUserDescription, selectorUserLogo}) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileDescription = document.querySelector(selectorUserDescription);
    this._profileLogo = document.querySelector(selectorUserAvatar);
  }

  /**Функция получения информации из профиля */
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  /**Функция добавления информации в профиль из формы */
  setUserInfo({name, description}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }

  /**Функция добавления ссылки на новую картинку аватара */
  setUserLogo( url ) {
    this._profileLogo.src = url.avatar
  }

};

export { UserInfo };