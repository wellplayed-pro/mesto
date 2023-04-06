class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  };

  /**Отображение контента */
  renderItems() {
    this._items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  /**Добавление контента */
  addItem(element) {
    this._container.append(element);
  }

}

export { Section };