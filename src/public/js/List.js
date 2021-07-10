class List {
  constructor(id, text) {
    const _this = this;

    this.id = id;
    this.node = this.create(text);
    this.cardCreator = this.node.querySelector('.add-card');
    this.cards = {};

    // add card 관련
    this.onToggleCardCreator();
    this.cardCreator.querySelector('.card-add-button').addEventListener("click", function (e) { 
      e.preventDefault();
      _this.createCard();
    }.bind(_this));
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
      '<div class="add-card"><form action="">' +
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
    });

    // 모달 닫음
    _this.cardCreator.querySelector('.card-cancel-button').addEventListener("click", function (e) {
      e.stopPropagation();
      _this.cardCreator.classList.remove('active');
    });

    // 모달 외 영역 클릭 시 모달 닫음
    body.addEventListener("click", function (e) {
      if (!e.target.classList.contains('add-card')) {
        e.stopPropagation();
        _this.cardCreator.classList.remove('active');
      }
    });
  }

  createCard() { 
    const _this = this;
    const input = _this.cardCreator.getElementsByClassName('card-name-input')[0];
    const id = trelloController.getCardId();
    const val = input.value;

    input.value = '';
    _this.cards[id] = new Card(_this.node, id, val);
  }

}