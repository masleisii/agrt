enchant();


/*
core�@�@�@�@�@�@�@�A�v���P�[�V�����̃��C�����[�v, �V�[�����Ǘ�����N���X.
- rootScene       �Q�[���̃V�[���B
-- Sprite (bear)�@�L�����N�^�[�̕��i�B�����bear�����B�摜�\���@�\���������N���X. Entity ���p�����Ă���.
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

/*����*/

/*
core�@�@�@�@�@�A�v���P�[�V�����̃��C�����[�v, �V�[�����Ǘ�����N���X.
rootScene     �Q�[���̃V�[���B
Sprite (bear) �L�����N�^�[�̕��i�B�����bear�����B�摜�\���@�\���������N���X. Entity ���p�����Ă���.
var core = new Core(320,320)�@�@ �Q�[���p�̗̈��(320,320)�ō쐬
core.preload('chara1.png');�@�@�@core.start()����chara1.png�����[�h�����B
core.rootScene.addChild(bear);�@ �Q�[���̃V�[����bear��ǉ�

*/