enchant(); 

//プレイヤークラスを作成////////////////////////////////////////
var Player = enchant.Class.create(enchant.Sprite, { //プレイヤー(自機)の定義
    initialize: function(x, y){
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['chara1.png'];
        this.x = x; this.y = y; this.frame = 10;
        this.addEventListener('enterframe', function(){
            if (game.input.a && game.frame % 3 == 0) { var s = new PlayerShoot(this.x, this.y); }
            if (game.input.left)  this.x -= 5;
            if (game.input.right) this.x += 5;
            if (game.input.up)    this.y -= 5;
            if (game.input.down)  this.y += 5;
        });
        game.rootScene.addChild(this);
    }
});
////////////////////////////////////////////////////////////////

//敵クラスを作成//////////////////////////////////////////////////
var Enemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, omega){
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['chara1.png'];
        this.x = x; this.y = y; this.frame = 5; this.time = 0;
        this.omega = omega; this.direction = 0; this.moveSpeed = 3;
        this.move = function(){
            this.direction += Math.PI / 180 * this.omega;
            this.x -= this.moveSpeed * Math.cos(this.direction); //三角関数でゆらゆら動きながら攻撃してくる
            this.y += this.moveSpeed * Math.sin(this.direction)
        };
        this.addEventListener('enterframe', function(){ //敵キャラの動きを設定する
            this.move();
            if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height){
                this.remove(); //画面外に出てしまったら自爆する
            }else if(this.time++ % 15 == 0){
                var s = new EnemyShoot(this.x, this.y); //10フレームに一回弾を撃つ
            }
        });
        game.rootScene.addChild(this);
    },
    remove: function(){
                game.rootScene.removeChild(this);
                delete enemies[this.key]; 
                //delete this;
    }
});
//・initializeメソッド（コンストラクタ）とremoveメソッドを持つクラス
//////////////////////////////////////////////////////////////

//弾クラスを作成//////////////////////////////////////////////
var Shoot = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, direction){
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['chara1.png'];
        this.x = x; this.y = y; this.frame = 1; 
        this.direction = direction; this.moveSpeed = 10;
        this.addEventListener('enterframe', function(){ //弾を毎フレーム動かす
            this.x += this.moveSpeed * Math.cos(this.direction);
            this.y += this.moveSpeed * Math.sin(this.direction);
            if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height){
                this.remove();
            }
        });
        game.rootScene.addChild(this);
    },
    remove: function(){ 
                game.rootScene.removeChild(this); 
                delete this; 
            }
});
///////////////////////////////////////////////////////////////

//自分の弾クラス作成/////////////////////////////////////
var PlayerShoot = enchant.Class.create(Shoot, {
    initialize: function(x, y){
        Shoot.call(this, x, y, 0);
        this.addEventListener('enterframe', function(){
            for(var i in enemies){
                if(enemies[i].intersect(this)){
                    this.remove(); 
                    enemies[i].remove(); //弾側から敵クラスのremoveメソッドを呼び出す． 
                    score += 100;
                }
            }
        });
        this.rotation = 90;
    }
});
//・shootクラスを継承
///////////////////////////////////////////////////////////////

//敵の弾クラスを作成///////////////////////////////////////////
var EnemyShoot = enchant.Class.create(Shoot, { 
    initialize: function(x, y){
        Shoot.call(this, x, y, Math.PI);
        this.addEventListener('enterframe', function(){//プレイヤーに当たったら即ゲームオーバーさせる
            if(player.within(this, 10)){
              game.rootScene.removeChild(this); 
              delete this;
              player.frame = 13;
              game.rootScene.addChild(gameOverMessage);
              game.stop();
            }
        });
        this.rotation = 270;
    }
});
//・shootクラスを継承
//////////////////////////////////////////////////////////

/////GameMessageクラス作成//////////////////////////////////
    var GameMessage = enchant.Class.create(Label,{
        //var score = 0;
        initialize: function(x,y){
            enchant.Label.call(this);
            this.x = x;
            this.y = y;
            this.color = 'red';
            this.font = '30px "Arial"';
        }
    });
//////////////////////////////////////////////////////////

/////gameOverMessage設定//////////////////////////////////
   var gameOverMessage = new GameMessage(50,5);
   gameOverMessage.text = 'GAME OVER!!!';
////////////////////////////////////////////////////////

/////gameOverMessage設定//////////////////////////////////
   var gameClear = new GameMessage(50,5);
   gameClear.text = 'GAME CLEAR!!!';
////////////////////////////////////////////////////////

//gameScore設定////////////////////////////////////////////
    var gameScore = new GameMessage(280,5);
    gameScore.font = '14px "Arial"';
    var score = 0;
    gameScore.on('enterframe',function(){
        gameScore.text = score;
        if(score > 200){
            for(var i in enemies){
                //game.rootScene.removeChild(enemies[i]);
                //delete enemies[i];
                enemies[i].frame = 8 
            }
            game.rootScene.backgroundColor = 'white';
            game.rootScene.addChild(gameClear);
            game.stop();
        }
    });
///////////////////////////////////////////////////////

window.onload = function() {
    game = new Game(320, 320); //ゲームの初期化
    game.fps = 10;
    game.score = 0;
    game.touched = false;
    game.preload('chara1.png');
    game.keybind(90, "a");//Zボタン
    game.onload = function() {
        player = new Player(0, 152);//プレイヤーを作成する
        enemies = [];
        //var score = 0;
       game.rootScene.backgroundColor = 'black';
       game.rootScene.addEventListener('enterframe', function(){//↓ランダムなタイミングで敵を出現させる
            if(rand(1000) < game.frame / 20 * Math.sin(game.frame / 100) + game.frame / 20 + 50){
                var score = 0;
                var y = rand(320);//敵の出現位置はランダム
                var omega = y < 160 ? 1 : -1;
                var enemy = new Enemy(320, y, omega);
                enemy.key = game.frame; 
                enemies[game.frame] = enemy;
            }
            //scoreLabel.score = game.score;
        });
        //scoreLabel = new ScoreLabel(8, 8);
        game.rootScene.addChild(gameScore);
    }
    game.start();
}

function rand(n){
  return Math.floor(Math.random()* (n+1));
}