const ListController = {
  lists: null,
  addBox: null,
  closeBtn: null,

  init: function (lists) {
    this.lists = lists;
    this.addBox = document.getElementsByClassName('add-list')[0];
    this.closeBtn = document.getElementsByClassName('list-cancel-button')[0];

    this.registEvent();
  },
  registEvent: function () {
    const _this = this;
    const body = document.getElementsByTagName('body')[0];

    // 모달 오픈
    _this.addBox.addEventListener("click", function (e) {
      e.stopPropagation();
      _this.openModal();
    }.bind(_this));

    // 모달 닫음
    _this.closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      _this.closeModal();
    }.bind(_this));

    // 모달 외 영역 클릭 시 모달 닫음
    body.addEventListener("click", function (e) {
      if (!e.target.classList.contains('add-list')) {
        e.stopPropagation();
        _this.closeModal();
      }
    }.bind(_this));

  },
  render: function () {

  },
  add: function () {

  },
  openModal: function () {
    this.addBox.classList.add('active');
  },
  closeModal: function () {
    this.addBox.classList.remove('active');
  }

}

const cardController = {

}

window.onload = function () {
  ListController.init([]);
}