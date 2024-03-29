enchant(); 
var Player = enchant.Class.create(enchant.Sprite, { //プレイヤー(自機)の定義
    initialize: function(x, y){
        enchant.Sprite.call(this, 32, 32); //自機をスプライトとして定義する
        this.image = game.assets['chara1.png']; //画像を読み込む
        this.x = x; this.y = y; this.frame = 10;//↓以下はマウスクリックで移動する処理
        game.rootScene.addEventListener('touchstart', function(e){ player.y = e.y; game.touched = true; });
        game.rootScene.addEventListener('touchend', function(e){ player.y = e.y; game.touched = false; });
        game.rootScene.addEventListener('touchmove', function(e){ player.y = e.y; });
        this.addEventListener('enterframe', function(){
            if(game.touched && game.frame % 3 == 0){ var s = new PlayerShoot(this.x, this.y); }
        });
        game.rootScene.addChild(this);
    }
});
var Enemy = enchant.Class.create(enchant.Sprite, {//敵キャラの定義
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
            }else if(this.time++ % 10 == 0){
                var s = new EnemyShoot(this.x, this.y); //10フレームに一回弾を撃つ
            }
        });
        game.rootScene.addChild(this);
    },
    remove: function(){
        game.rootScene.removeChild(this);
        delete enemies[this.key]; delete this;
    }
});
var Shoot = enchant.Class.create(enchant.Sprite, { //弾を定義
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
    remove: function(){ game.rootScene.removeChild(this); delete this; }
});
var PlayerShoot = enchant.Class.create(Shoot, { //プレイヤーの弾を定義
    initialize: function(x, y){
        Shoot.call(this, x, y, 0);
        this.addEventListener('enterframe', function(){
            for(var i in enemies){
                if(enemies[i].intersect(this)){ //敵に当たったら、敵を消してスコアを足す
                    this.remove(); enemies[i].remove(); game.score += 100;
                }
            }
        });
        this.rotation = 90;
    }
});
var EnemyShoot = enchant.Class.create(Shoot, { //敵の弾を定義
    initialize: function(x, y){
        Shoot.call(this, x, y, Math.PI);
        this.addEventListener('enterframe', function(){//プレイヤーに当たったら即ゲームオーバーさせる
            if(player.within(this, 8)){ game.end(game.score, "SCORE: " + game.score) }
        });
        this.rotation = 270;
    }
});
window.onload = function() {
    game = new Game(320, 320); //ゲームの初期化
    game.fps = 10; game.score = 0; game.touched = false; game.preload('chara1.png');
    game.onload = function() {
        player = new Player(0, 152);//プレイヤーを作成する
        enemies = [];
        game.rootScene.backgroundColor = 'black';
        game.rootScene.addEventListener('enterframe', function(){//↓ランダムなタイミングで敵を出現させる
            if(rand(1000) < game.frame / 20 * Math.sin(game.frame / 100) + game.frame / 20 + 50){
                var y = rand(320);//敵の出現位置はランダム
                var omega = y < 160 ? 1 : -1;
                var enemy = new Enemy(320, y, omega);
                enemy.key = game.frame; enemies[game.frame] = enemy;
            }
            //scoreLabel.score = game.score;
        });
        //scoreLabel = new ScoreLabel(8, 8);
        //game.rootScene.addChild(scoreLabel);
    }
    game.start();
}

function rand(n){
  return Math.floor(Math.random()* (n+1));
}