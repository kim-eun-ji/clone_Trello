class Card {
  constructor(list, id, text) {
    this.list = list;
    this.id = id;
    this.node = this.create(text);

  }

  create(text) {
    let newCard = document.createElement('li');
    newCard.innerText = text;
    newCard.draggable = true;
    
    this.list.getElementsByClassName('list-cards')[0].appendChild(newCard);

    return newCard;
  }

}