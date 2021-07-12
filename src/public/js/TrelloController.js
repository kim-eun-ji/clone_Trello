
const TrelloController = {
  cardIdNum: 0,
  lists: null,
  listCreator: null,
  dragCard: null,

  init: function () {
    this.lists = {};
    this.listCreator = document.getElementsByClassName('add-list')[0];

    this.registEvent();
  },

  render: function (lists) {
    const _this = this;
    const data = lists.data;

    // 기존 list들 모두 삭제
    _this.removeLists();

    // 서버에서 받은 list를 bind
    _this.lists = lists.data;

    for (let listId in data) {
      const listNode = data[listId];
      const cardArr = Object.entries(listNode.cards);

      // list 생성
      _this.createList(listNode.id, listNode.title, false);

      // list.cards 각 index 기준 오름차순 정렬
      cardArr.sort((a, b) => a[1]['index'] - b[1]['index']);

      // card 생성
      for (let i = 0; i < cardArr.length; i++) {
        _this.lists[listNode.id].createCard(cardArr[i][0], cardArr[i][1]['title'], false);
        _this.cardIdNum++
      }
    }
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

  createList: function (_id, _val, sendMsg = true) {
    const _this = this;
    const input = _this.listCreator.getElementsByClassName('list-name-input')[0];
    const id = _id ? _id : 'list' + Object.keys(_this.lists).length;
    const val = _val ? _val : input.value;

    if (!val) return false;

    input.value = '';
    _this.lists[id] = new List(id, val);

    if (sendMsg) SocketController.sendMessage();
  },

  // 카드는 리스트간 이동이 가능하므로 단순히 length로 체크하지 않는다.
  getCardId: function () {
    const _this = this;
    const id = 'card' + this.cardIdNum++;

    return id;
  },

  removeLists: function () {
    const _this = this;
    for (let listId in _this.lists) {
      _this.lists[listId].node.remove();
    }
  }
}
