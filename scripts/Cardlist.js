import {Card} from './Card'

export class Cardlist {
  constructor(container, array) {
    this.container = container;
    this.cardList = array;
    this.render();
  }

  addCard(name, link) {
    const { cardElement } = new Card(name, link);

    this.container.appendChild(cardElement);
  }

  render() {
    this.cardList.forEach(element => {
      this.addCard(element.name, element.link);
    });
  }
}