class List {
  constructor(id, text) {
    const _this = this;

    this.id = id;
    this.node = this.create(text);
    this.title = text;
    this.cardCreator = this.node.querySelector('.add-card');
    this.cards = {};

    // add card 관련
    this.onToggleCardCreator();
    this.cardCreator.querySelector('.card-add-button').addEventListener("click", function (e) {
      e.preventDefault();
      _this.createCard();
    }.bind(_this));

    // drag card to empty list evnet
    this.node.addEventListener("dragenter", this.onDragEnter);
  }

  create(text) {
    const parent = document.getElementsByClassName('content')[0];
    const list = document.createElement('div');
    list.id = this.id;
    list.classList.add('list-wrapper');

    list.innerHTML =
      '<div class="list-inner">' +
      '<div class="list-header">' + text + '</div>' +
      '<div class="list-body">' +
      '<ul class="list-cards"></ul>' +
      '<div class="add-card" ondragstart="return false"><form action="">' +
      '<a class="open-add-card" href="#"><span>+ Add another card</span></a>' +
      '<input class="card-name-input" type="text" name="name" placeholder="Enter card title" autocomplete="off" maxlength="512">' +
      '<div class="card-add-controls">' +
      '<input class="card-add-button" type="submit" value="Add card">' +
      '<a class="card-cancel-button" href="#">X</a>' +
      '</div>' +
      '</form></div>' +
      '</div>';

    parent.insertBefore(list, parent.firstChild);
    return list;
  }

  onToggleCardCreator() {
    const _this = this;
    const body = document.getElementsByTagName('body')[0];

    // 모달 오픈
    _this.cardCreator.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.add('active');
      this.getElementsByClassName('card-name-input')[0].focus();
    });

    // 모달 닫음
    _this.cardCreator.querySelector('.card-cancel-button').addEventListener("click", function (e) {
      e.stopPropagation();
      _this.cardCreator.classList.remove('active');
      _this.cardCreator.getElementsByClassName('card-name-input')[0].value = '';
    });

    // 모달 외 영역 클릭 시 모달 닫음
    body.addEventListener("click", function (e) {
      if (!e.target.classList.contains('add-card')) {
        e.stopPropagation();
        _this.cardCreator.classList.remove('active');
        _this.cardCreator.getElementsByClassName('card-name-input')[0].value = '';
      }
    });
  }

  createCard(_id, _val, sendMsg = true) {
    const _this = this;
    const input = _this.cardCreator.getElementsByClassName('card-name-input')[0];
    const id = _id ? _id : TrelloController.getCardId();
    const idx = Object.keys(_this.cards).length;
    const val = _val ? _val : input.value;

    if (!val) return false;

    input.value = '';
    _this.cards[id] = new Card(_this.node, id, val, idx);

    if (sendMsg) SocketController.sendMessage();
  }

  indexing() {
    const _this = this;
    const cards = _this.node.querySelector('.list-cards').children;
    for (let i = 0; i < cards.length; i++) {
      _this.cards[cards[i].id].index = i;
    }

  }

  onDragEnter(e) {
    e.preventDefault();

    // 카드가 하나도 없는 리스트에 카드를 추가할 경우
    if (e.target.classList.contains('list-body') && e.target.querySelectorAll('ul.list-cards > li').length === 0) {
      const dragCard = TrelloController.dragCard;
      const dragNode = TrelloController.lists[dragCard.closest('.list-wrapper').id].cards[dragCard.id];
      const nowListId = e.target.closest('.list-wrapper').id;

      // 1. 리스트에 카드 추가
      dragNode.node.remove();
      e.target.querySelector('ul.list-cards').appendChild(dragNode.node);

      // 2. 순서 변동사항 반영
      delete TrelloController.lists[dragNode.list.id].cards[dragNode.id];
      TrelloController.lists[nowListId].cards[dragNode.id] = dragNode;
      TrelloController.lists[dragNode.list.id].indexing();

      if (dragNode.list.id !== nowListId) {
        dragNode.list = TrelloController.lists[nowListId].node;
        TrelloController.lists[nowListId].indexing();
      }
    }
  }
} 