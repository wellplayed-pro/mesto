class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  /**Отображение контента */
  renderItems(items) {
    items.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  /**Добавление контента */
  addItem(element) {
    this._container.prepend(element);
  }

}

export { Section };