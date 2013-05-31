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
    bear.x = 0
    bear.y = 0
    
    bear.addEventListener('enterframe',function(){
      this.x += +10;
      if (this.x > 320) this.x = 0;
      this.rotate(2);
      this.scale(1.01,1.01);
    });
    
    core.rootScene.addChild(bear);

  }
  core.start();            

};

/*メモ*/

/*
・core.star()を行うと、フレームがカウントアップされ始める
・新しいフレームに入った際に動作を指定することができる>>addEventListener('enterframe',function(){})
・23行目のthisはbearを指す
・this.x += +10;　横軸に10ずつ動かす（ここでは1フレームごとに10ずつ動く
・core.fps = 15;  coreに対してフレームがどのくらいの速度でカウントアップされるかを設定（ここでは1秒に15フレーム）
・if (this.x > 320) this.x = 0;  横軸が320を超えたら0に戻す
・this.rotate(2);  1フレームごとに2度ずつ回転させる
・this.scale(1.01,1.01); 1フレームごとに大きさを横-1.01倍、縦-1.01倍する
*/




