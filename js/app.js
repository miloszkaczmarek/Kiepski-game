document.addEventListener("DOMContentLoaded", function(){

    var Furry=require('./furry.js');
    var Coin=require('./coin.js');

    function Game(){
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        var self = this;

        this.index = function(x,y) {
            return x + (y * 10);
        }

        this.showFurry = function(){
            this.hideVisibleFurry();
            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        }
        this.showCoin = function(){
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
        }

        this.startGame = function () {
            this.idSetInterval = setInterval(function(){
                self.moveFurry(); }, 250)

        }

        this.moveFurry = function(){
            if(this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if ( this.furry.direction === "left" ){
                this.furry.x = this.furry.x - 1;
            }else if ( this.furry.direction === "up" ){
                this.furry.y = this.furry.y + 1;
            }else if ( this.furry.direction === "down" ){
                this.furry.y = this.furry.y - 1;
            }
            this.gameOver();
            this.showFurry();
            this.checkCoinCollision();

        }

        this.hideVisibleFurry = function(){
            var test = document.querySelector('.furry');
            if(test != null){
                test.classList.remove('furry')
            }
        }

        this.arrows = function(event){
            switch (event.which) {

            case 37:
            this.furry.direction = 'left';
            break;

            case 38:
            this.furry.direction = 'down';
            break;

            case 39:
            this.furry.direction = 'right';
            break;

            case 40:
            this.furry.direction = 'up';
            break;


            }
        }

        this.checkCoinCollision = function(){

            if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
                var score = document.querySelector("#score div strong");
                var fotka = document.querySelector(".furry");

                document.querySelector(".coin").classList.remove('coin');
                this.score++;
                score.innerHTML = this.score;

                this.coin = new Coin();
                this.showCoin();

            }

        }


        this.gameOver = function(){
            if(this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9){
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry();
                var invisible = document.querySelector(".invisible");
                var result = document.querySelector(".invisible h2");
                result.innerHTML = 'Twój wynik to: ' + this.score + ' MOCNYCH FULLI';
                invisible.style.display = "block";
                return true;
            } else {
                return false;
            }

        }

        document.addEventListener('keydown', function(event){
            self.arrows(event);
        });


    }

    var furry = new Game();
    furry.startGame();
    furry.showCoin();
    furry.showFurry();

});

module.exports = Game;

