enchant();

window.onload = function(){

  var core = new Core(320,320)
  core.preload('chara1.png');
  core.fps = 15;
  core.onload = function(){

/////bearクラス作成/////////////////////////////////////////
    var Bear = Class.create(Sprite,{
      initialize: function(x,y,image){
        Sprite.call(this,32,32);
        this.x = x;
        this.y = y;
        this.image = image;
        core.rootScene.addChild(this);
      }
    });

/////bear4設定/////////////////////////////////////////
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

/////bears設定/////////////////////////////////////////
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

/////bear設定/////////////////////////////////////////
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

/*メモ*/

/*

core.rootScene.on('touchstart',function(e){
  var bear4 = new Bear(e.x,e.y,core.assets['chara1.png']);
  bear4.on('enterframe',function(){
    if (this.within(bear, 10)){
       core.rootScene.removeChild(this);
    }
  });
});
・シーンの中でタッチした部分にbear4を作成
・bear4の性質は直後に記入する必要がある(※core.rootScene.onの外側に書くと性質が反映されない)
・spriteの性質は，インスタンス化の直後に書く？
・bear4は，bearとbearsからは見えない．（core.rootScene.onの内側にいるせいだと考えられる）
・逆にbear4からbearとbearsは見える．
・同じ名前のbearsを複数作成した場合，bearやbear4から見えるのは最後に作成したbearsのみ．
・removeChildは見えなくなっているだけで，インスタンス自体は存在している可能性がある．
*/




