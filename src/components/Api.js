class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers['authorization'];
  }

  //Проверка на валидность ответа 
_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

  //Запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      },
    })
    .then(res => this._checkResponse(res))
  }

  //Добавление новой карточки на сервер 
addNewCard(data) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  })
  .then(res => this._checkResponse(res))
};

//Получение данных пользователя с сервера
getUserInfoApi() {
  return fetch(`${this._url}/users/me`, {
    headers: {
      authorization: this._authorization
    },
  })
  .then(res => this._checkResponse(res))
}

// Передачи данных пользователя с сервера 
setUserInfoApi(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  })
  .then(res => this._checkResponse(res))
}

//Передача на сервер нового аватара 
setUserAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  })
  .then(res => this._checkResponse(res))
}

//Удаление карточки с сервера 
deleteCard(cardId) {
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(res => this._checkResponse(res))
}

// Отправка лайка на сервер 
putCardLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this._headers,
  })
  .then(res => this._checkResponse(res))
}

// удаления лайка с сервера
deleteCardLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then(res => this._checkResponse(res))
}

}

export { Api };