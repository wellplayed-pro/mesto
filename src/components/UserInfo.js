class UserInfo {
  constructor({ selectorUserName, selectorUserDescription, selectorUserAvatar }) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileDescription = document.querySelector(selectorUserDescription);
    this._profileAvatar = document.querySelector(selectorUserAvatar);
  }

  // Получение информации из профиля */
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  // Добавление информации в профиль из формы
  setUserInfo({ name, description }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }

// Добавление ссылки на аватар
setUserAvatar(url) {
  this._profileAvatar.src = url.avatar;
}

};

export { UserInfo };