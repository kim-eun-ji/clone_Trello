const SocketController = {
  socket: null,

  init: function (url) {
    this.socket = io(url);
    this.registEvent();
  },
  registEvent: function () {
    this.receiveMessage();
  },
  sendMessage: function () {
    this.socket.emit("send-lists", { data: TrelloController.lists });
  },
  receiveMessage: function () {
    this.socket.on('get-lists', (lists) => {
      if (lists) {
        TrelloController.render(lists);
      }
    })
  }

}
