enchant();

/*
core　　　　　　　アプリケーションのメインループ, シーンを管理するクラス.
- rootScene       ゲームのシーン。
-- Sprite (bear)　キャラクターの部品。今回はbearを作る。画像表示機能を持ったクラス. Entity を継承している.
*/

window.onload = function(){

  var core = new Core(320,320)
  core.preload('chara1.png');
  core.preload('AGRL-logo.png');
  core.preload('AGRL-logo2.png');
  core.fps = 15;
  core.keybind(90, "a");
  core.onload = function(){

    var Bear = Class.create(Sprite,{
      initialize: function(x,y,image){
        Sprite.call(this,32,32);
        this.x = x;
        this.y = y;
        this.image = image;
        core.rootScene.addChild(this);
      }
      
    });

    var Back = Class.create(Sprite,{
      initialize: function(image){
        Sprite.call(this,420,420);
        this.x = -100;
        this.y = -100;
        this.image = image;
        //core.rootScene.addChild(this);
      }
    });

    var bear = new Bear(0,0,core.assets['chara1.png']);
    var bear2 = new Bear(50,50,core.assets['chara1.png']);
    var bear3 = new Bear(100,100,core.assets['chara1.png']);
    var start = new Back(core.assets['AGRL-logo.png']);
    var back = new Back(core.assets['AGRL-logo2.png']);
/*
    var start = new Sprite(420,420);
    start.image = core.assets['AGRL-logo.png'];
    start.x = -100;
    start.y = -100;

    var back = new Sprite(420,420);
    back.image = core.assets['AGRL-logo2.png'];
    back.x = -100;
    back.y = -100;
*/
    var label2 = new Label();
    label2.x = 50;
    label2.y = 5;
    label2.color = 'red';
    label2.font = '30px "Arial"';
    label2.text = 'GAME OVER!!!';


    start.on('enterframe',function(){
      if (core.input.a) core.rootScene.removeChild(this);
    });

    bear.addEventListener('enterframe',function(){
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

      if (this.within(bear2, 10)){
         core.rootScene.removeChild(bear2);
      }

      if (this.within(bear3, 10)){
         core.rootScene.removeChild(this);
         core.rootScene.addChild(back);
         core.rootScene.addChild(label2);
      }

    });

    bear.on('touchstart',function(){
      core.rootScene.removeChild(this);
    });

    core.rootScene.on('touchstart',function(e){
      //bear.x = e.x;
      //bear.y = e.y;
      var bear4 = new Bear(e.x,e.y,core.assets['chara1.png']);
      bear4.on('enterframe',function(){
        if (this.within(bear, 10) || this.x > 320){
           core.rootScene.removeChild(this);
        }
        this.x += +10;
      });
    });

   

    var label = new Label();
    label.x = 250;
    label.y = 5;
    label.color = 'red';
    label.font = '14px "Arial"';
    label.text = '0';
    label.on('enterframe',function(){
      label.text = (core.frame / core.fps).toFixed(2);
    });

    core.rootScene.addChild(start);

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
*/




