enchant();

window.onload = function(){

  var core = new Core(320,320)
  core.preload('chara1.png');
  core.fps = 15;
  core.onload = function(){

/////bear�N���X�쐬/////////////////////////////////////////
    var Bear = Class.create(Sprite,{
      initialize: function(x,y,image){
        Sprite.call(this,32,32);
        this.x = x;
        this.y = y;
        this.image = image;
        core.rootScene.addChild(this);
      }
    });

/////bear4�ݒ�/////////////////////////////////////////
    core.rootScene.on('touchstart',function(e){
      var bear4 = new Bear(e.x,e.y,core.assets['chara1.png']);
      bear4.on('enterframe',function(){
        this.frame = 10;
        if (this.within(bear, 10)) {
           core.rootScene.removeChild(this);
           core.rootScene.removeChild(bear);
        }
        for (var i = 0; i < 300;){
          if (this.within(bears[i], 10)) {
            this.parentNode.removeChild(bears[i]);
            //core.rootScene.removeChild(bears[i]);
            core.rootScene.removeChild(this);
          }
          i = i + 100;
        }

        if (this.x > 320){
           core.rootScene.removeChild(this);
        }
        this.x += +10;
      });
    });

/////bears�ݒ�/////////////////////////////////////////
    var bears = [];
    for (var i = 0; i < 300;){
        bears[i] = new Bear(230,i,core.assets['chara1.png']);
        bears[i].on('enterframe',function(){
          if (this.within(bear, 10)) {
            core.rootScene.removeChild(this);
          }
          this.frame = 5;
        });
      i = i + 100;
    }

/////bear�ݒ�/////////////////////////////////////////
    var bear = new Bear(0,0,core.assets['chara1.png']);
    
    bear.on('enterframe',function(){
      if (core.input.left) this.x -= 5;
      if (core.input.right) this.x += 5;
      if (core.input.up) this.y -= 5;
      if (core.input.down) this.y += 5;

      if (this.y < 100) {
        this.frame = this.x % 3 + 5;
      }
      else {
        this.frame = this.x % 3;
      }

      //if (this.within(bear4, 10)){
        //   core.rootScene.removeChild(bear4);
      //}

    });

  }

  core.start();

};

/*����*/

/*

core.rootScene.on('touchstart',function(e){
  var bear4 = new Bear(e.x,e.y,core.assets['chara1.png']);
  bear4.on('enterframe',function(){
    if (this.within(bear, 10)){
       core.rootScene.removeChild(this);
    }
  });
});
�E�V�[���̒��Ń^�b�`����������bear4���쐬
�Ebear4�̐����͒���ɋL������K�v������(��core.rootScene.on�̊O���ɏ����Ɛ��������f����Ȃ�)
�Esprite�̐����́C�C���X�^���X���̒���ɏ����H
�Ebear4�́Cbear��bears����͌����Ȃ��D�icore.rootScene.on�̓����ɂ��邹�����ƍl������j
�E�t��bear4����bear��bears�͌�����D
�E�������O��bears�𕡐��쐬�����ꍇ�Cbear��bear4���猩����͍̂Ō�ɍ쐬����bears�̂݁D
�EremoveChild�͌����Ȃ��Ȃ��Ă��邾���ŁC�C���X�^���X���̂͑��݂��Ă���\��������D
*/




