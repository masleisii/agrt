enchant();

window.onload = function(){

  var core = new Core(320,320);
  var loop = 1;
  core.preload('chara1.png');
  core.fps = 15;
  core.keybind(90, "a");
  core.onload = function(){

/////bearクラス作成/////////////////////////////////////////
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

/////bearsクラス作成/////////////////////////////////////////
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

/////bulletBearクラス作成/////////////////////////////////////////
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

/////gameOverScene設定//////////////////////////////////
   var gameOverScene = new Scene();
   gameOverScene.backgroundColor = 'black';
////////////////////////////////////////////////////////

/////gameOverMessage設定////////////////////////////////
   var gameOverMessage = new Label();
   gameOverMessage.x = 50;
   gameOverMessage.y = 5;
   gameOverMessage.color = 'red';
   gameOverMessage.font = '30px "Arial"';
   gameOverMessage.text = 'GAME OVER!!!';
////////////////////////////////////////////////////////

/////bear設定/////////////////////////////////////////
    var bear = new Bear(0,0,core.assets['chara1.png']);
    
    bear.on('enterframe',function(){
      if (core.input.left)  this.x -= 5;
      if (core.input.right) this.x += 5;
      if (core.input.up)    this.y -= 5;
      if (core.input.down)  this.y += 5;
    });
////////////////////////////////////////////////////////

/////bears設定/////////////////////////////////////////
    var bearss = []; //bearsを入れるための配列
    for (var i = 0; i < 27;){
      bears = new Bears(230,i*10,core.assets['chara1.png']);
      //bears.key = i;//今回は不要
      bearss[i] = bears;//配列の特定の部分にbearsを入れていく
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

/////bulletBear設定/////////////////////////////////////////
   core.rootScene.on('enterframe',function(){
    if (core.input.a){
      var bulletBear = new BulletBear(bear.x+15,bear.y,core.assets['chara1.png']);
      bulletBear.on('enterframe',function(){
        //for (var i = 0; i < 270;){//for文だとdeleteしたspriteをよびだせないのでよろしくない．
        for (var j in bearss){//画面上に存在するbearをコレクションとして取得(添え字が習得される？)
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

//メモ///////////////////////////

/*
------------------------------------------------
・zボタンを押すと，bearの位置を基準にbulletBearを作成
------------------------------------------------
①this.parentNode.removeChild(bears[i]);
②core.rootScene.removeChild(bears[i]);
上記の二つは，一見同じ動きだが，①は，bearsを近づけすぎると，removeChildの際にエラーがおきる．
複数体同時に消える場合にエラーが起きる？
ちなみに，②だけではspriteは消えない（見えなくなるだけ）
完全に消すには，delete bears[i]が必要．
------------------------------------------------
delete bears[i];を入れると停止するエラーについて
メッセージ：Uncaught TypeError: Cannot read property '_dirty' of undefined 

bulletBear.on('enterframe',function(){})：の中において，
以下のfor文が回される．
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
このとき，弾が生成されるたびに，for文のiは0から200をたどるが，
delete bears[i];を行うことで，特定bears[i]は消えてしまう．
そのとき，いないはずのbears[i]を呼び出そうとしてエラーがおきてしまう．
*/




