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

/*����*/

/*
�Eif (core.input.left)  this.x -= 5;�@�\���L�[�̍��������ƁD������-5����
�Ebear.on('touchstart',function(){})�@
�@�@-addEventListner��on�ő�p�\
    -touchstart�ŁCbear��touch�����ۂ̏������L�q�ł���
�@�@-�X�}�z�ł�touch�����̖��߂ő���\
�Ecore.rootScene.removeChild(this);�@rootScene����this(�������ł�bear)�������D
�Ecore.rootScene.on('touchstart',function(e){})
    -bear�̓����̈��touch�����ۂ̏���
�@�@-function(e) e�������ɂƂ邱�ƂŁCtouch�����ꏊ�̍��W����n�����Ƃ��o����D
*/




