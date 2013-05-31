enchant();

window.onload = function(){

  var core = new Core(320,320);
  var loop = 1;
  core.preload('chara1.png');
  core.fps = 15;
  core.keybind(90, "a");
  core.onload = function(){

/////bear�N���X�쐬/////////////////////////////////////////
    var Bear = Class.create(Sprite,{
      initialize: function(x,y,image){
        Sprite.call(this,32,32);
        this.x = x;
        this.y = y;
        this.image = image;
        this.frame = 10;
        core.rootScene.addChild(this);
      }
    });
////////////////////////////////////////////////////////

/////bears�N���X�쐬/////////////////////////////////////////
    var Bears = Class.create(Sprite,{
      initialize: function(x,y,image){
        Sprite.call(this,32,32);
        this.x = x;
        this.y = y;
        this.image = image;
        core.rootScene.addChild(this);
        this.frame = 5;
        this.tl.moveBy(-20, 50, 30).moveBy(-20, -50, 30).loop();
      }
    });
////////////////////////////////////////////////////////

/////bulletBear�N���X�쐬/////////////////////////////////////////
    var BulletBear = Class.create(Sprite,{
      initialize: function(x,y,image){
        Sprite.call(this,32,32);
        this.x = x;
        this.y = y;
        this.image = image;
        core.rootScene.addChild(this);
        this.frame = 1;
        this.rotation = 90;
      }
    });
////////////////////////////////////////////////////////

/////gameOverScene�ݒ�//////////////////////////////////
   var gameOverScene = new Scene();
   gameOverScene.backgroundColor = 'black';
////////////////////////////////////////////////////////

/////gameOverMessage�ݒ�////////////////////////////////
   var gameOverMessage = new Label();
   gameOverMessage.x = 50;
   gameOverMessage.y = 5;
   gameOverMessage.color = 'red';
   gameOverMessage.font = '30px "Arial"';
   gameOverMessage.text = 'GAME OVER!!!';
////////////////////////////////////////////////////////

/////bear�ݒ�/////////////////////////////////////////
    var bear = new Bear(0,0,core.assets['chara1.png']);
    
    bear.on('enterframe',function(){
      if (core.input.left)  this.x -= 5;
      if (core.input.right) this.x += 5;
      if (core.input.up)    this.y -= 5;
      if (core.input.down)  this.y += 5;
    });
////////////////////////////////////////////////////////

/////bears�ݒ�/////////////////////////////////////////
    var bearss = []; //bears�����邽�߂̔z��
    for (var i = 0; i < 27;){
      bears = new Bears(230,i*10,core.assets['chara1.png']);
      //bears.key = i;//����͕s�v
      bearss[i] = bears;//�z��̓���̕�����bears�����Ă���
         bearss[i].on('enterframe',function(){
        //if (this.within(bear, 10)) {
          //core.rootScene.removeChild(this);
        //}
        //if (this.age > 30){
          //this.x -= 1;
        //}
        
        if (this.x < 1){
          //core.pushScene(gameOverScene);
          core.rootScene.addChild(gameOverMessage);
          core.stop();
        }
        
    });
      i = i + loop;
    }
////////////////////////////////////////////////////////

/////bulletBear�ݒ�/////////////////////////////////////////
   core.rootScene.on('enterframe',function(){
    if (core.input.a){
      var bulletBear = new BulletBear(bear.x+15,bear.y,core.assets['chara1.png']);
      bulletBear.on('enterframe',function(){
        //for (var i = 0; i < 270;){//for������delete����sprite����т����Ȃ��̂ł�낵���Ȃ��D
        for (var j in bearss){//��ʏ�ɑ��݂���bear���R���N�V�����Ƃ��Ď擾(�Y�������K�������H)
          if (this.within(bearss[j], 10)) {
            ////this.parentNode.removeChild(bears[i]);
            core.rootScene.removeChild(bearss[j]);
            delete bearss[j];
            core.rootScene.removeChild(this);
            delete this;
            
          }
          //i = i + loop;
        }

        if (this.x > 320){
           core.rootScene.removeChild(this);
        }
        this.x += +10;
      });
    }
  });
////////////////////////////////////////////////////////

  }

  core.start();

};

function rand(n){
  return Math.floor(Math.random()* (n+1));
}

//����///////////////////////////

/*
------------------------------------------------
�Ez�{�^���������ƁCbear�̈ʒu�����bulletBear���쐬
------------------------------------------------
�@this.parentNode.removeChild(bears[i]);
�Acore.rootScene.removeChild(bears[i]);
��L�̓�́C�ꌩ�������������C�@�́Cbears���߂Â�������ƁCremoveChild�̍ۂɃG���[��������D
�����̓����ɏ�����ꍇ�ɃG���[���N����H
���Ȃ݂ɁC�A�����ł�sprite�͏����Ȃ��i�����Ȃ��Ȃ邾���j
���S�ɏ����ɂ́Cdelete bears[i]���K�v�D
------------------------------------------------
delete bears[i];������ƒ�~����G���[�ɂ���
���b�Z�[�W�FUncaught TypeError: Cannot read property '_dirty' of undefined 

bulletBear.on('enterframe',function(){})�F�̒��ɂ����āC
�ȉ���for�����񂳂��D
 for (var i = 0; i < 270;){
          if (this.within(bears[i], 10)) {
            //this.parentNode.removeChild(bears[i]);
            core.rootScene.removeChild(bears[i]);
            delete bears[i];
            core.rootScene.removeChild(this);
            delete this;
            
          }
          i = i + loop;
        }
���̂Ƃ��C�e����������邽�тɁCfor����i��0����200�����ǂ邪�C
delete bears[i];���s�����ƂŁC����bears[i]�͏����Ă��܂��D
���̂Ƃ��C���Ȃ��͂���bears[i]���Ăяo�����Ƃ��ăG���[�������Ă��܂��D
*/




