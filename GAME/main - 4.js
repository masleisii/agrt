enchant();


/*
core�@�@�@�@�@�@�@�A�v���P�[�V�����̃��C�����[�v, �V�[�����Ǘ�����N���X.
- rootScene       �Q�[���̃V�[���B
-- Sprite (bear)�@�L�����N�^�[�̕��i�B�����bear�����B�摜�\���@�\���������N���X. Entity ���p�����Ă���.
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

/*����*/

/*
�Ethis.frame  bear�Ƀt���[�����ݒ肳��Ă���B�f�t�H���g��0�B0�F�����p�A1�F������A2�E�E�E�B
�Ethis.age�@  sprite�������n�߂Ă��牽�t���[����������
�E% 3�@       3�Ŋ������]��
�Eif��������  if(){}else{}
*/




