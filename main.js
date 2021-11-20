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

  (function pelota() {
    self.Ball=function(x,y,radius,board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.speed_y = 0;
        this.speed_x = 5;
        this.board.ball=this;
        this.kind = "circle"
        this.direccion = 1;
        this.speed = 5;
        this.bounce_angle = 0;
        this.max_bounce_angle=Math.PI/12;
    }
    self.Ball.prototype={
        move: function(){
            this.x+=(this.speed_x * this.direccion );
            this.y+=(this.speed_y);
        },
        collision: function (bar) {
            var relative_intersect_y = (bar.y + (bar.height/2)) - this.y;
            var normalized_intersect_y = relative_intersect_y / (bar.height/2);
            this.bounce_angle=normalized_intersect_y * this.max_bounce_angle;
            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if(this.x>(this.board.width/2)) this.direccion=-1;
            else this.direccion=1;
        },
        collisionBorder: function () {
            if(this.y<=100){
            this.speed_y = this.speed*Math.sin(this.bounce_angle)
            this.speed_x = this.speed}
            else{
                this.speed_y = -this.speed*(Math.random()*(0.5-0.1)+0.1);
                this.speed_x = this.speed}
            
        },
        get width(){
            return this.radius*2;
        },
        get height(){
            return this.radius*2;
        }
    }

})();

(function barrascolision() {
    self.Bar = function (x, y, width, height, board) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.board = board;
      this.board.bars.push(this);
      this.kind = "rectangle";
      this.speed = 10;
    };
    self.Bar.prototype = {
      down: function () {
          if(this.y !== 250)
              this.y += this.speed;
      },
      up: function () {
          if(this.y !== 0)
            this.y -= this.speed;
      }
    };
  })();