class Card {
  constructor(list, id, text, idx) {
    this.list = list;
    this.id = id;
    this.node = this.create(text);
    this.index = idx;
      
    // drag event bind
    this.node.addEventListener("dragstart", this.onDragStart);
    this.node.addEventListener("dragover", this.onDragOver);
    this.node.addEventListener("dragenter", this.onDragEnter);
    this.node.addEventListener("drop", this.onDrop);
    this.node.addEventListener("dragend", this.onDragEnd);
  }

  create(text) {
    let newCard = document.createElement('li');
    newCard.id = this.id;
    newCard.innerText = text;
    newCard.draggable = true;
    
    this.list.getElementsByClassName('list-cards')[0].appendChild(newCard);

    return newCard;
  }

  onDragStart(e) {
    trelloController.dragCard = e.target;
    e.target.style.backgroundColor = 'gray';
  }

  onDragOver(e) { 
    // drop 이벤트 실행을 위해 기본 수행 동작 막음
    e.preventDefault();
  }

  onDragEnd(e) {
    trelloController.dragCard = null;
    e.target.style.backgroundColor = '';
  }

  onDragEnter(e) { 
    const nowCard = e.target;
    const nowNode = trelloController.lists[nowCard.closest('.list-wrapper').id].cards[nowCard.id];
    const dragCard = trelloController.dragCard;
    const dragNode = trelloController.lists[dragCard.closest('.list-wrapper').id].cards[dragCard.id];

    // 기본 액션을 막음 (링크 열기같은 것들)
    e.preventDefault();

    if (nowNode.id !== dragNode.id) {
      // 1. 현재 드래그중인 카드 삭제 -> 드래그 오버중인 카드뒤에 넣음
      dragNode.node.remove();
      if (nowNode.index === 0) {
        nowNode.list.querySelector('ul.list-cards').insertBefore(dragNode.node, nowNode.node);
      } else {
        nowNode.list.querySelector('ul.list-cards').insertBefore(dragNode.node, nowNode.node.nextSibling);
      }

      // 2. 순서 변동사항 반영
      delete trelloController.lists[dragNode.list.id].cards[dragNode.id];
      trelloController.lists[nowNode.list.id].cards[dragNode.id] = dragNode;
      trelloController.lists[dragNode.list.id].indexing();

      if (dragNode.list.id !== nowNode.list.id) {
        dragNode.list = nowNode.list;
        trelloController.lists[nowNode.list.id].indexing();   
      }
    }

  }

  onDrop(e) { 
    e.target.style.backgroundColor = '';
  }



}