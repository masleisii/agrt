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
      this.x += +5;
      if (this.y % 10 < 5) 
        {this.frame = this.age % 3 + 5;}
      else 
        {this.frame = this.age % 3;}
      if (this.x > 320) {
        this.x = 0; 
        this.y = this.y + 25;
      }
    });
    
    core.rootScene.addChild(bear);

  }
  core.start();            

};

/*メモ*/

/*
・this.frame  bearにフレームが設定されている。デフォルトは0。0：立ち姿、1：小走り、2・・・。
・this.age　  spriteが動き始めてから何フレームたったか
・% 3　       3で割った余り
・if文書き方  if(){}else{}
*/




