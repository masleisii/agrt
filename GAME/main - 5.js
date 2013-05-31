enchant();

/*
core　　　　　　　アプリケーションのメインループ, シーンを管理するクラス.
- rootScene       ゲームのシーン。
-- Sprite (bear)　キャラクターの部品。今回はbearを作る。画像表示機能を持ったクラス. Entity を継承している.
*/

window.onload = function(){

  var core = new Core(320,320)
  core.preload('chara1.png');
  core.fps = 15;
  core.onload = function(){

    var bear = new Sprite(32,32);
    bear.image = core.assets['chara1.png'];
    bear.x = 0;
    bear.y = 0;

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
    });

    bear.on('touchstart',function(){
      core.rootScene.removeChild(this);
    });

    core.rootScene.on('touchstart',function(e){
      bear.x = e.x;
      bear.y = e.y;
    });

    core.rootScene.addChild(bear);

  }
  core.start();            

};

/*メモ*/

/*
・if (core.input.left)  this.x -= 5;　十字キーの左を押すと．ｘ軸を-5動く
・bear.on('touchstart',function(){})　
　　-addEventListnerはonで代用可能
    -touchstartで，bearにtouchした際の処理を記述できる
　　-スマホでのtouchもこの命令で操作可能
・core.rootScene.removeChild(this);　rootSceneからthis(※ここではbear)を消す．
・core.rootScene.on('touchstart',function(e){})
    -bearの動く領域をtouchした際の処理
　　-function(e) eを引数にとることで，touchした場所の座標軸を渡すことが出来る．
*/




