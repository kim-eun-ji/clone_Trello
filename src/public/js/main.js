
const trelloController = {
  cardIdNum : 0,
  lists: null,
  listCreator: null,
  dragCard: null,

  init: function (lists) { 
    this.lists = lists ? lists : {};
    this.listCreator = document.getElementsByClassName('add-list')[0];
    
    // this.render();
    this.registEvent();
  },
  
  render: function () { 
    // 1. this.lists for문 node 붙이고
    // 2. 해당 list.cards 돌면서 node 붙이기
  },

  registEvent: function () { 
    const _this = this;

    // add list 관련
    _this.onToggleListCreator();
    _this.listCreator.querySelector('.list-add-button').addEventListener("click", function (e) { 
      e.preventDefault();
      _this.createList();
    }.bind(_this));
  },

  onToggleListCreator: function () { 
    const _this = this;
    const body = document.getElementsByTagName('body')[0];

    // 모달 오픈
    _this.listCreator.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.add('active');
      this.getElementsByClassName('list-name-input')[0].focus();
    });

    // 모달 닫음
    _this.listCreator.querySelector('.list-cancel-button').addEventListener("click", function (e) {
      e.stopPropagation();
      _this.listCreator.classList.remove('active');
      _this.listCreator.getElementsByClassName('list-name-input')[0].value = '';
    });

    // 모달 외 영역 클릭 시 모달 닫음
    body.addEventListener("click", function (e) {
      if (!e.target.classList.contains('add-list')) {
        e.stopPropagation();
        _this.listCreator.classList.remove('active');
        _this.listCreator.getElementsByClassName('list-name-input')[0].value = '';
      }
    });
  },

  createList: function () { 
    const _this = this;
    const input = _this.listCreator.getElementsByClassName('list-name-input')[0];
    const id = 'list' + Object.keys(_this.lists).length;
    const val = input.value;
    
    if (!val) return false;

    input.value = '';
    _this.lists[id] = new List(id, val);
  },

  // 카드는 리스트간 이동이 가능하므로 단순히 length로 체크하지 않는다.
  getCardId: function () { 
    const _this = this;
    const id = 'card' + this.cardIdNum++;

    return id;
  },
}

window.onload = function () {
  trelloController.init();
}