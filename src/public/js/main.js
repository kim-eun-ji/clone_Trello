
const trelloController = {
  cardIdNum : 0,
  lists: null,
  listCreator: null,
  
  init: function (lists) { 
    this.lists = lists ? lists : [];
    this.listCreator = document.getElementsByClassName('add-list')[0];
    
    this.registEvent();
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
    });

    // 모달 닫음
    _this.listCreator.querySelector('.list-cancel-button').addEventListener("click", function (e) {
      e.stopPropagation();
      _this.listCreator.classList.remove('active');
    });

    // 모달 외 영역 클릭 시 모달 닫음
    body.addEventListener("click", function (e) {
      if (!e.target.classList.contains('add-list')) {
        e.stopPropagation();
        _this.listCreator.classList.remove('active');
      }
    });
  },

  createList: function () { 
    const _this = this;
    const input = _this.listCreator.getElementsByClassName('list-name-input')[0];
    const len = _this.lists.length;
    const val = input.value;

    input.value = '';
    _this.lists.push(new List('list' + len, val));
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