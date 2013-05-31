enchant();


/*
core　　　　　　　アプリケーションのメインループ, シーンを管理するクラス.
- rootScene       ゲームのシーン。
-- Sprite (bear)　キャラクターの部品。今回はbearを作る。画像表示機能を持ったクラス. Entity を継承している.
*/


window.onload = function(){

  var core = new Core(320,320)
  core.preload('chara1.png');
  core.onload = function(){
    
    var bear = new Sprite(32,32);
    bear.image = core.assets['chara1.png'];
    bear.x = 10
    bear.y = 10
    
    core.rootScene.addChild(bear);


  }
  core.start();

};

/*メモ*/

/*
core　　　　　アプリケーションのメインループ, シーンを管理するクラス.
rootScene     ゲームのシーン。
Sprite (bear) キャラクターの部品。今回はbearを作る。画像表示機能を持ったクラス. Entity を継承している.
var core = new Core(320,320)　　 ゲーム用の領域を(320,320)で作成
core.preload('chara1.png');　　　core.start()時にchara1.pngがロードされる。
core.rootScene.addChild(bear);　 ゲームのシーンにbearを追加

*/