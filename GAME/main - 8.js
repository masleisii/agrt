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

    var bear = new Sprite(32,32);
    bear.image = core.assets['chara1.png'];
    bear.x = 0;
    bear.y = 0;

    var bear2 = new Sprite(32,32);
    bear2.image = core.assets['chara1.png'];
    bear2.x = 80;
    bear2.y = 0;
    bear2.frame = 10;

    var bear3 = new Sprite(32,32);
    bear3.image = core.assets['chara1.png'];
    bear3.x = 80;
    bear3.y = 80;
    bear3.frame = 10;

    var start = new Sprite(420,420);
    start.image = core.assets['AGRL-logo.png'];
    start.x = -100;
    start.y = -100;

    var back = new Sprite(420,420);
    back.image = core.assets['AGRL-logo2.png'];
    back.x = -100;
    back.y = -100;

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
      bear.x = e.x;
      bear.y = e.y;
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

    core.rootScene.addChild(label);
    core.rootScene.addChild(bear);
    core.rootScene.addChild(bear2);
    core.rootScene.addChild(bear3);
    core.rootScene.addChild(start);
  }
  core.start();

};

/*メモ*/

/*
・var label = new Label();　　　　　　　　　　　　　ラベルを張る。注意：クラスの文字の1文字目は大文字にすること。
・label.text = (core.frame / core.fps).toFixed(2);　frameをfpsで割ると秒になる。toFixed(2)で小数点第2位まで表示になる。
*/




