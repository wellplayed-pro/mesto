class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  /**Отображение контента */
  renderItems(items, user) {
    items.forEach(item => {
      this._renderer(item, user);
    });
  }

  /**Добавление контента */
  addItem(element) {
    this._container.append(element);
  }

  /**Место куда добавлять контент */
  prependItem(element) {
    this._container.prepend(element);
  }
}

export { Section };