class UserInfo {
  constructor({ selectorUserName, selectorUserDescription }) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileDescription = document.querySelector(selectorUserDescription);
  }

  /**Функция получения информации из профиля */
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  /**Функция добавления информации в профиль из формы */
  setUserInfo({ name, description }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }

};

export { UserInfo };