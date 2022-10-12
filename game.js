window.addEventListener('load', function () {
    //canvas setup                                                  1680px
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 650;

    class Player {
        constructor(game, x, playerNameRocket, playerNameRocketX, playerNameAvatar, playerNameAvatarY, playerBet, playerBetY, playerWallet, playerImage, playerImageY) {
            this.game = game;
            this.width = 70;
            this.height = 120;
            this.image = document.getElementById('player_img');
            this.x = x;
            this.y = canvas.height - this.height;
            this.speed = 0;

            this.playerNameRocket = playerNameRocket;
            this.playerNameRocketX = playerNameRocketX;
            this.playerNameRocketY = 590;

            this.playerNameAvatar = playerNameAvatar;
            this.playerNameAvatarX = 590;
            this.playerNameAvatarY = playerNameAvatarY;

            this.playerBet = playerBet;
            this.playerBetX = 588;
            this.playerBetY = playerBetY;

            this.playerWallet = playerWallet;

            this.playerImage = playerImage;
            this.playerImageX = 565;
            this.playerImageY = playerImageY;

        }

        update() {
            this.y -= this.speed;
            this.playerNameRocketY -= this.speed;
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.playerImage, this.playerImageX, this.playerImageY, 90, 90);

            ctx.fillStyle = 'white';
            ctx.font = '15px Cambria';
            ctx.fillText(this.playerNameRocket, this.playerNameRocketX, this.playerNameRocketY);
            ctx.fillText(this.playerNameAvatar, this.playerNameAvatarX, this.playerNameAvatarY);
            ctx.fillText(this.playerBet, this.playerBetX, this.playerBetY);
        }

        update_speed() {
            this.speed = (Math.random() - 0.09);
        }

        stop_players() {
            this.speed = 0;
        }


    }


    class Background {
        constructor(game) {
            this.game = game;
            this.image = document.getElementById('layer')
            this.width = canvas.width; //500
            this.height = 1768;
            this.x = 0;
            this.y = canvas.height - this.height;
            this.speedModifier = 0;
        }

        update() {
            this.y -= this.speedModifier;
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y);

        }

        update_speed() {
            this.speedModifier = -1.2;
        }

        stop_bg() {
            this.speedModifier = 0;
        }
    }


    class Fire {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.size = 60;
            this.image = document.getElementById('fire');
        }

        update(speed) {
            this.y -= speed;
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
    }


    class Game {
        constructor() {
            this.width = canvas.width;
            this.height = canvas.height;

            this.player1 = new Player(this, 100, 'Liam', 180, 'Liam',
                210, 0.3321, 230, 20,
                document.getElementById('player1_img_avatar'), 100);
            this.player2 = new Player(this, 320, 'Olivia', 400, 'Olivia',
                410, 0.2412, 430, 30,
                document.getElementById('player2_img_avatar'), 300);

            this.background = new Background(this);

            this.gamePrize = this.player1.playerBet + this.player2.playerBet;
            this.gameFinishPoint = 85;

            this.fire1 = new Fire(this, 105, 615);
            this.fire2 = new Fire(this, 325, 615);
        }

        update() {

            setInterval(bg_timer, 15500)

            if (bg_time !== 21) {
                this.background.update();

                if (this.player1.speed > this.player2.speed) {
                    this.background.update_speed(this.player1.speed);
                } else {
                    this.background.update_speed(this.player2.speed);
                }

            } else {
                this.background.stop_bg()
            }

            if (this.player1.y >= this.gameFinishPoint || this.player2.y >= this.gameFinishPoint) {
                this.player1.update();
                this.fire1.update(this.player1.speed);
                this.player1.update_speed();
                this.player2.update();
                this.fire2.update(this.player2.speed);
                this.player2.update_speed();

            } else {
                this.player1.stop_players();
                this.player2.stop_players();
            }
        }

        draw() {
            this.background.draw();
            if (start_game === true) {
                this.fire1.draw();
            }
            this.player1.draw();

            if (start_game === true) {
                this.fire2.draw();
            }
            this.player2.draw();


            if ((this.player1.y < this.gameFinishPoint || this.player2.y < this.gameFinishPoint) && this.player2.y > this.player1.y) {
                ctx.fillStyle = '#f5e617';
                ctx.fillRect(140, 200, 350, 200)

                ctx.fillStyle = 'black';
                ctx.font = '30px Cambria';
                ctx.fillText(this.player1.playerNameAvatar + ' won ' + this.gamePrize + '!', 200, 300);


            } else if ((this.player1.y < this.gameFinishPoint || this.player2.y < this.gameFinishPoint) && this.player1.y > this.player2.y) {
                ctx.fillStyle = '#f5e617';
                ctx.fillRect(140, 200, 350, 200)

                ctx.fillStyle = 'black';
                ctx.font = '30px Cambria';
                ctx.fillText(this.player2.playerNameAvatar + ' won ' + this.gamePrize + '!', 200, 300);
            }
        }
    }

    const game = new Game();


    function animate() {
        ctx.clearRect(0, 0, game.width, game.height);
        if (start_game === true) {
            game.update();
        }
        game.draw()
        requestAnimationFrame(animate)
    }

    function bg_timer() {
        bg_time = 21;
        return bg_time;
    }

    animate();

    let bg_time = 0;
});
