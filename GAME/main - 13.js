enchant(); 

//�v���C���[�N���X���쐬////////////////////////////////////////
var Player = enchant.Class.create(enchant.Sprite, { //�v���C���[(���@)�̒�`
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

//�G�N���X���쐬//////////////////////////////////////////////////
var Enemy = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, omega){
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['chara1.png'];
        this.x = x; this.y = y; this.frame = 5; this.time = 0;
        this.omega = omega; this.direction = 0; this.moveSpeed = 3;
        this.move = function(){
            this.direction += Math.PI / 180 * this.omega;
            this.x -= this.moveSpeed * Math.cos(this.direction); //�O�p�֐��ł���瓮���Ȃ���U�����Ă���
            this.y += this.moveSpeed * Math.sin(this.direction)
        };
        this.addEventListener('enterframe', function(){ //�G�L�����̓�����ݒ肷��
            this.move();
            if(this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height){
                this.remove(); //��ʊO�ɏo�Ă��܂����玩������
            }else if(this.time++ % 15 == 0){
                var s = new EnemyShoot(this.x, this.y); //10�t���[���Ɉ��e������
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
//�Einitialize���\�b�h�i�R���X�g���N�^�j��remove���\�b�h�����N���X
//////////////////////////////////////////////////////////////

//�e�N���X���쐬//////////////////////////////////////////////
var Shoot = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, direction){
        enchant.Sprite.call(this, 32, 32);
        this.image = game.assets['chara1.png'];
        this.x = x; this.y = y; this.frame = 1; 
        this.direction = direction; this.moveSpeed = 10;
        this.addEventListener('enterframe', function(){ //�e�𖈃t���[��������
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

//�����̒e�N���X�쐬/////////////////////////////////////
var PlayerShoot = enchant.Class.create(Shoot, {
    initialize: function(x, y){
        Shoot.call(this, x, y, 0);
        this.addEventListener('enterframe', function(){
            for(var i in enemies){
                if(enemies[i].intersect(this)){
                    this.remove(); 
                    enemies[i].remove(); //�e������G�N���X��remove���\�b�h���Ăяo���D 
                    //score += 100;
                    gamescore.addpoint();
                }
            }
        });
        this.rotation = 90;
    }
});
//�Eshoot�N���X���p��
///////////////////////////////////////////////////////////////

//�G�̒e�N���X���쐬///////////////////////////////////////////
var EnemyShoot = enchant.Class.create(Shoot, { 
    initialize: function(x, y){
        Shoot.call(this, x, y, Math.PI);
        this.addEventListener('enterframe', function(){//�v���C���[�ɓ��������瑦�Q�[���I�[�o�[������
            if(player.within(this, 8)){
              game.rootScene.addChild(gameOverMessage);
              game.stop();
            }
        });
        this.rotation = 270;
    }
});
//�Eshoot�N���X���p��
//////////////////////////////////////////////////////////

/////gameOverMessage�ݒ�//////////////////////////////////
   var gameOverMessage = new Label();
   gameOverMessage.x = 50;
   gameOverMessage.y = 5;
   gameOverMessage.color = 'red';
   gameOverMessage.font = '30px "Arial"';
   gameOverMessage.text = 'GAME OVER!!!';
////////////////////////////////////////////////////////

    //var label = enchant.Class.create(Label,{
        //label.x = 250;
        //label.y = 5;
        //label.color = 'red';
        //label.font = '14px "Arial"';
        //label.text = '0';
        //var score = 0;
        //label.on('enterframe',function(){
        //label.text = score;
    //});

    var GameScore = enchant.Class.create(Label,{
        //var score = 0;
        initialize: function(x,y){
            enchant.Label.call(this);
            this.x = x;
            this.y = y;
            this.color = 'red';
            this.font = '14px "Arial"';
            this.text = 0;
            //this.text = '0';
            //var score = 0;
            this.on('enterframe',function(){
                this.text = 0;
            });
        },
        addpoint: function(){
            //score += 100;
            this.text += 100;
        }
    });

window.onload = function() {
    game = new Game(320, 320); //�Q�[���̏�����
    game.fps = 10; game.score = 0; game.touched = false; game.preload('chara1.png');
    game.keybind(90, "a");//Z�{�^��
    game.onload = function() {
        player = new Player(0, 152);//�v���C���[���쐬����
        enemies = [];
        gamescore = new GameScore(250,5)
        //var score = 0;
       game.rootScene.backgroundColor = 'black';
        game.rootScene.addEventListener('enterframe', function(){//�������_���ȃ^�C�~���O�œG���o��������
            if(rand(1000) < game.frame / 20 * Math.sin(game.frame / 100) + game.frame / 20 + 50){
                //var score = 0;
                var y = rand(320);//�G�̏o���ʒu�̓����_��
                var omega = y < 160 ? 1 : -1;
                var enemy = new Enemy(320, y, omega);
                enemy.key = game.frame; 
                enemies[game.frame] = enemy;
            }
            //scoreLabel.score = game.score;
        });
        //scoreLabel = new ScoreLabel(8, 8);
        game.rootScene.addChild(gamescore);
    }
    game.start();
}

function rand(n){
  return Math.floor(Math.random()* (n+1));
}