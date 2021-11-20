//Implementación de la función tablero
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
  //Implementación de la función Pelota
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
        //Genera el movimiento de la pelota
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
        //Reacciona a la colisión con una barra
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
// Implementación de la función barracolision
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
        //Movimiento de la barra hacia abajo
      down: function () {
          if(this.y !== 250)
              this.y += this.speed;
      },
        //Movimiento de la barra hacia abajo
      up: function () {
          if(this.y !== 0)
            this.y -= this.speed;
      }
    };
  })();
  //Implementación de la función vistatablero
  (function vistatablero() {
    BoardView = function (canvas, board) {
      this.canvas = canvas;
      this.canvas.width = board.width;
      this.canvas.height = board.height;
      this.board = board;
      this.ctx = canvas.getContext("2d");
    };
  
    self.BoardView.prototype = {
        //Limpia la pantalla
      clean: function () {
        this.ctx.clearRect(0, 0, this.board.width, this.board.height);
      },
      draw: function () {
        for (let i = this.board.elements.length - 1; i >= 0; i--) {
          let el = this.board.elements[i];
          draw(this.ctx, el);
        }
      },
      //Recibe las funciones para poner el juego en funcionamiento
      play: function () {
          if(this.board.playing){
          this.clean();
          this.draw();
          this.check_collisions();
          this.board.ball.move();
          this.check_goal();
          }
      },
      //Valida dónde se está generando la colisión 
      check_collisions: function () {
          for (let i = this.board.bars.length - 1; i >= 0; i--) {
              let bar = this.board.bars[i];
              if(hit(bar,this.board.ball)){
                  this.board.ball.collision(bar);
              }
              if(hitBorder(this.board.ball)){
                  this.board.ball.collisionBorder();
              }
              
            }
      },
      //Función para el retorno de la puntuación de cada jugador
      check_goal: function puntos() {
         if (this.board.ball.x<0) {
          ball=new Ball(400,100,10,this.board);
          this.play();
          this.board.playing =! this.board.playing;
          document.getElementById("playerRight").innerHTML = scorePlayerR+1;
         }
         else if(this.board.ball.x>800){
          ball = new Ball(400,100,10,this.board);
          this.play();
          this.board.playing =! this.board.playing;
          document.getElementById("playerLeft").innerHTML = scorePlayerL+1;
         }
      }
    };
  
    //Función para validación de golpe en el borde superior e inferior
    function hitBorder(ball) {
      let hit = false;
      if(ball.y+ball.radius <= ball.height){
          hit = true;
      }
      if(ball.y+ball.radius>=400){
          hit = true;
      }
      return hit;
    }
  
    // Implementación de golpe con las barras de los jugadores
    function hit(a,b) {
        //Validación de colisión
        let hit = false;
        //Valida si a colisiona con b
        if(b.x + b.width >= a.x && b.x < a.x + a.width){
            //Validación de colisiones verticales
            if(b.y + b.height>=a.y && b.y <a.y+a.height ){
                hit = true;
            }
        }
        //Valida si a colisiona con b
        if(b.x <= a.x && b.x +b.width >= a.x +a.width){
            if(b.y <= a.y && b.y + b.height >= a.y + a.height){
                  hit = true;
            }
        }
        //Valida si b colisiona con a
        if(a.x <= b.x && a.x + a.width >= b.x + b.width){
            if(a.y <= b.y && a.y + a.height >= b.y +b.height){
                hit = true;
            }
        }
        return hit;
    }
  
    function draw(ctx, element) {
      switch (element.kind) {
      case "rectangle":
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
      case "circle":
          ctx.beginPath();
          ctx.arc(element.x,element.y,element.radius,0,7);
          ctx.fill();
          ctx.closePath();
          break;
      }
    }
  })();

  let scorePlayerL=0;
  let scorePlayerR=0;
  document.getElementById("playerLeft").innerHTML = scorePlayerL;
  document.getElementById("playerRight").innerHTML = scorePlayerR;

  let board = new Board(800, 400);
  let barLeft = new Bar(10, 100, 40, 150, board);
  let barRight = new Bar(750, 100, 40, 150, board);
  let canvas = document.getElementById("canvas");
  let board_view = new BoardView(canvas, board);
  let ball=new Ball(400,100,10,board);
  
  document.addEventListener("keydown", function (ev) {
      //Se Añade el EventListener para iedntificar qué tecla se presiona para generar el movimiento en up() y down()
    ev.preventDefault();
    if (ev.key === "ArrowDown") {
        //Movimiento de la barra del player1 hacia arriba
      ev.preventDefault();
      barRight.down();
    } else if (ev.key === "ArrowUp") {
        //Movimiento de la barra1 del player1 hacia abajo
      ev.preventDefault();
      barRight.up();
    }
    if (ev.key === "w") {
        //Movimiento de la barra del player2 hacia arriba
      ev.preventDefault();
      barLeft.up();
    } else if (ev.key === "s") {
        //Movimiento de la barra del player2 hacia abajo
      ev.preventDefault();
      barLeft.down();
    }
    if(ev.key===" "){
      ev.preventDefault();
       //Barra espaciadora
      board.playing=!board.playing;
    }
  });

  board_view.play();
  window.requestAnimationFrame(controller);
  
  function controller() {
      //Se implementa llamado de la función play(), y control del juego para que se ejecute cada vez que hay un movimiento
      board_view.play();
    window.requestAnimationFrame(controller);
  }