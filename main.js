(function tablero() {
    self.Board = function (width, height) {
      this.width = width;
      this.height = height;
      this.playing = true;
      this.game_over = false;
      this.bars = [];
      this.ball = null;
    };
  
    self.Board.prototype = {
      get elements() {
        let elements = this.bars.map(function (bar) {
            return bar;
        });
        elements.push(this.ball);
        return elements;
      },
    };
  })();